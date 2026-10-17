# "Postgres is All You Need"

## Velocidad de Startup, Escalabilidad de Enterprise: El poder de Angular + Supabase

> **Hook:** "11 cosas sobre Supabase que probablemente no conoces. La #11 te va a sorprender."

---

## Estructura general de los slides

| # | Título | Mensaje clave |
|---|--------|---------------|
| 1 | CRUD sin backend | Un solo SDK reemplaza Express/FastAPI |
| 2 | Row Level Security | Autorización en la base de datos, no en el app |
| 3 | Declarative Schemas | Declaras el estado, no las migraciones |
| 4 | Auth integrada | Login completo en 2 líneas |
| 5 | File Storage | Upload/download sin S3 ni bucket config |
| 6 | Edge Functions | Serverless en Deno/Hono, invocables desde Angular |
| 7 | Scheduling & Jobs | Cron + HTTP desde Postgres, sin Celery ni BullMQ |
| 8 | Realtime | Broadcast, Presence y Postgres Changes |
| 9 | AI & Vectors | Semantic search con pgvector, sin Pinecone |
| 10 | Supabase Queues | Pull-based FIFO sin RabbitMQ |
| 11 | Self-Hosting | Tu propia infra, compliance total |

---

## Setup — Supabase en Angular

**Mensaje:** "Un `@Injectable` con tipado completo. Inyectas y listo."

### Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│  Angular App                                            │
│                                                         │
│  ┌───────────────────┐     ┌────────────────────────┐  │
│  │  APP_ENVIRONMENT  │────▶│  SupabaseService       │  │
│  │  (tokens/env)     │     │  (providedIn: 'root')  │  │
│  └───────────────────┘     └───────────┬────────────┘  │
│                                       │                │
│  ┌───────────────────┐     ┌──────────▼────────────┐  │
│  │  SUPABASE_CREATE  │────▶│  SupabaseClient<DB>   │  │
│  │  _CLIENT (token)  │     │  (tipado con Database)│  │
│  └───────────────────┘     └────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Tokens

```typescript
// tokens/app-environment.ts
export const APP_ENVIRONMENT = new InjectionToken<AppEnvironment>('APP_ENVIRONMENT');

// tokens/supabase.ts
export const SUPABASE_CREATE_CLIENT = new InjectionToken<SupabaseCreateClient>(
  'SUPABASE_CREATE_CLIENT',
  { factory: () => createClient }
);
```

### Servicio

```typescript
@Injectable({ providedIn: 'root' })
export class SupabaseService {
  readonly client: SupabaseClient<Database>;

  constructor() {
    const env = inject(APP_ENVIRONMENT);
    const create = inject(SUPABASE_CREATE_CLIENT);

    this.client = create<Database>(env.supabaseUrl, env.supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });

    // Sincroniza el JWT con Realtime (canales privados)
    void this.syncRealtimeAuth();

    this.client.auth.onAuthStateChange((_event, session) => {
      void this.client.realtime.setAuth(session?.access_token ?? null);
    });
  }

  async getSession(): Promise<Session | null> {
    const { data: { session } } = await this.client.auth.getSession();
    return session;
  }

  async getAccessToken(): Promise<string | null> {
    return (await this.getSession())?.access_token ?? null;
  }

  /** Push el JWT a Realtime para que canales privados pasen autorización. */
  async syncRealtimeAuth(): Promise<boolean> {
    const token = await this.getAccessToken();
    if (!token) return false;
    await this.client.realtime.setAuth(token);
    return true;
  }
}
```

### Uso en cualquier componente/servicio

```typescript
@Injectable({ providedIn: 'root' })
export class KnowledgeBaseService {
  private supabase = inject(SupabaseService).client;

  async create(orgId: string, name: string) {
    return this.supabase
      .from('knowledge_base')
      .insert({ organization_id: orgId, name, status: 'pending' })
      .select()
      .single();
  }
}
```

### Testing (unit)

```typescript
// Enjecta un mock de createClient — no necesitas mockear @supabase/supabase-js
it('should create client', () => {
  const mockCreate = vi.fn().mockReturnValue(mockClient);
  const service = TestBed.runInInjectionContext(() =>
    new SupabaseService()
  );
  // ...
});
```

**Puntos a destacar:**
- `SupabaseClient<Database>` → autocompletado total desde el schema generado
- `InjectionToken` para `createClient` → mockable en tests sin stubear el SDK
- `inject()` funcional (no constructor injection) → compatible con Angular 19+
- Realtime auth sync automático: cada cambio de sesión actualiza el token del WS
- Un solo `providedIn: 'root'` = singleton en toda la app

---

## Slide 1 — CRUD sin backend

**Mensaje:** "No necesitas escribir un solo endpoint. Supabase te da CRUD completo sobre Postgres."

### Ejemplo (Angular + Supabase SDK)

```typescript
// CREATE
const { data: base, error } = await this.supabase
  .from('knowledge_base')
  .insert({
    organization_id: orgId,
    type: 'file' as const,
    name: displayName,
    status: 'pending' as const,
  })
  .select()
  .single();

// READ
const { data: items } = await this.supabase
  .from('knowledge_base')
  .select('*')
  .eq('organization_id', orgId)
  .order('created_at', { ascending: false })
  .limit(20);

// UPDATE
const { data: updated } = await this.supabase
  .from('knowledge_base')
  .update({ status: 'active' })
  .eq('id', base.id)
  .select()
  .single();

// DELETE
await this.supabase
  .from('knowledge_base')
  .delete()
  .eq('id', base.id);
```

**Puntos a destacar:**
- Filtros, joins, order, limit — todo en el cliente
- Tipado con `supabase gen types typescript`
- Cero Express, cero FastAPI, cero Swagger

---

## Slide 2 — Row Level Security (RLS)

**Mensaje:** "La seguridad no vive en tu app. Vive en la base de datos."

### Concepto

RLS = una `WHERE` clause que Postgres inyecta automáticamente en cada query.

```sql
-- Política: solo el dueño puede ver sus propios records
create policy "Individuals can view their own todos"
  on todos for select
  to authenticated
  using ( (select auth.uid()) = user_id );
```

Esto se traduce en:

```sql
select * from todos
where auth.uid() = todos.user_id;  -- ← inyectado por RLS
```

### Grants + Policies (dos capas)

| Capa | Qué decide |
|------|-----------|
| **GRANT** | Si el rol puede operar sobre la tabla |
| **POLICY** | Qué filas aplica la operación |

| Rol | Grants por defecto | Qué debe mantener |
|-----|-------------------|------------------|
| `anon` | select, insert, update, delete | Solo lo que un visitante debe leer |
| `authenticated` | select, insert, update, delete | Solo lo que la app expone |
| `service_role` | full access | **Server-side only** — bypass RLS |

**Puntos a destacar:**
- Defense in depth: protege incluso si un tool de terceros accede directo
- Combina con Supabase Auth → seguridad end-to-end browser → DB
- Se escribe en SQL, no en middleware JS

---

## Slide 3 — Declarative Database Schemas

**Mensaje:** "Declaras el estado que quieres. Supabase genera las migraciones."

### Flujo

```
schema/
├── tables/
│   ├── organizations.sql
│   ├── knowledge_base.sql
│   └── users.sql
└── functions/
    └── get_org_stats.sql
```

```bash
# Genera migraciones desde los archivos declarativos
supabase db schema declarative sync
```

### Diferencia clave

| Imperativo (tradicional) | Declarativo (Supabase) |
|--------------------------|----------------------|
| "Agrega columna X a tabla Y" | "La tabla Y tiene columna X" |
| Info dispersa en N migraciones | Un archivo = una fuente de verdad |
| Orden importa | Orden no importa |

**Puntos a destacar:**
- Edita los `.sql` declarativos, nunca el DB directo
- `supabase db schema declarative sync` compara contra migration history
- Ideal para equipos: el schema es code-reviewable

### Validación de datos: ¿dónde vive sin API?

**El problema:** Sin una capa de API, la validación no puede quedar en el frontend (cualquiera lo bypass). ¿Dónde va?

**La respuesta:** En el schema. Postgres *es* la capa de validación.

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations (id)
    ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES organizations (id)
    ON DELETE CASCADE NOT NULL,
  role message_role NOT NULL,
  type message_type NOT NULL,
  sender_profile_id UUID REFERENCES profiles (id)
    ON DELETE SET NULL,
  sender_customer_id UUID REFERENCES customers (id)
    ON DELETE SET NULL,
  content TEXT,
  event_type message_event_type,
  payload JSONB DEFAULT '{}'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  delivery_status message_delivery_status,
  delivery_attempts INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Regla de negocio: el sender debe coherir con el role
  CONSTRAINT sender_matches_role CHECK (
    (role = 'agent'    AND sender_profile_id IS NOT NULL AND sender_customer_id IS NULL)
    OR (role = 'customer' AND sender_customer_id IS NOT NULL AND sender_profile_id IS NULL)
    OR (role IN ('bot', 'system') AND sender_profile_id IS NULL AND sender_customer_id IS NULL)
  ),

  -- event_type solo para mensajes de sistema
  CONSTRAINT event_type_only_system CHECK (event_type IS NULL OR role = 'system'),

  -- Los eventos de sistema no llevan content libre
  CONSTRAINT system_event_content_null CHECK (event_type IS NULL OR content IS NULL)
);
```

### Qué valida el schema (vs. qué validaría una API)

| Regla | Donde vive | Ejemplo |
|-------|-----------|---------|
| Tipos y nullabilidad | `NOT NULL`, tipos | `role message_role NOT NULL` |
| Relaciones | `REFERENCES` + `ON DELETE` | `conversation_id → conversations(id) CASCADE` |
| Valores permitidos | `ENUM` / `CHECK` | `role message_role` (enum) |
| Reglas de negocio | `CHECK` constraints | `sender_matches_role` |
| Invariantes cruzadas | `CHECK` multi-columna | `event_type_only_system` |
| Defaults | `DEFAULT` | `payload JSONB DEFAULT '{}'` |

**Puntos a destacar:**
- El frontend *puede* validar para UX, pero la **autoridad** es la DB
- Un `CHECK` constraint es tan difícil de bypass como una API — porque **es** la capa de confianza
- Reglas de negocio legibles en SQL → cualquier dev (o LLM) entiende el contrato
- Si alguien inserta un `role = 'agent'` sin `sender_profile_id` → Postgres rechaza. Punto.
- Esto reemplaza a Zod/Joi/DTOs en la API: la validación *es* el schema

### Triggers: lógica de negocio compleja en la DB

**El problema:** Una API no solo valida — también ejecuta lógica de negocio (notificar, calcular, disparar side-effects). Sin API, ¿dónde va esa lógica?

**La respuesta:** Triggers. Se ejecutan *dentro* de la transacción, atómicos, imposibles de bypass.

```sql
-- Push notify al agente asignado cuando un cliente envía mensaje
-- en una conversación activa con humano.
CREATE OR REPLACE FUNCTION util.notify_customer_message()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_assigned_agent_id UUID;
  v_status conversation_status;
  v_customer_name TEXT;
  v_preview TEXT;
BEGIN
  -- 1. Resolver contexto: ¿quién está asignado? ¿la conv está activa?
  SELECT
    c.assigned_agent_id,
    c.status,
    COALESCE(NULLIF(btrim(cust.name), ''), NULLIF(btrim(cust.phone), ''), 'Cliente')
  INTO v_assigned_agent_id, v_status, v_customer_name
  FROM conversations AS c
  JOIN customers AS cust ON cust.id = c.customer_id
  WHERE c.id = NEW.conversation_id
    AND c.organization_id = NEW.organization_id
    AND cust.organization_id = NEW.organization_id;

  -- 2. Early exit: sin agente asignado → no notificar
  IF v_assigned_agent_id IS NULL THEN
    RETURN NEW;
  END IF;

  -- 3. Solo en conversaciones con humano activo
  IF v_status NOT IN ('WAITING_HUMAN', 'HUMAN_ACTIVE') THEN
    RETURN NEW;
  END IF;

  -- 4. El agente debe ser miembro de la organización
  IF NOT EXISTS (
    SELECT 1 FROM organization_members AS om
    WHERE om.organization_id = NEW.organization_id
      AND om.profile_id = v_assigned_agent_id
  ) THEN
    RETURN NEW;
  END IF;

  -- 5. Construir preview según tipo de mensaje
  IF NEW.type = 'text' THEN
    v_preview := left(btrim(COALESCE(NEW.content, '')), 120);
    IF v_preview = '' THEN
      v_preview := 'Nuevo mensaje';
    END IF;
  ELSE
    v_preview := CASE NEW.type
      WHEN 'image'    THEN 'Imagen'
      WHEN 'audio'    THEN 'Audio'
      WHEN 'video'    THEN 'Video'
      WHEN 'document' THEN 'Documento'
      WHEN 'location' THEN 'Ubicación'
      WHEN 'contact'  THEN 'Contacto'
      WHEN 'sticker'  THEN 'Sticker'
      ELSE 'Nuevo mensaje'
    END;
  END IF;

  -- 6. Disparar side-effect: push notification vía API interna
  PERFORM util.invoke_api(
    '/push/customer-message',
    jsonb_build_object(
      'conversationId',    NEW.conversation_id,
      'organizationId',    NEW.organization_id,
      'assigneeProfileId', v_assigned_agent_id,
      'messageId',         NEW.id,
      'customerName',      left(COALESCE(v_customer_name, 'Cliente'), 200),
      'preview',           v_preview,
      'messageType',       NEW.type::text
    )
  );

  RETURN NEW;
END;
$$;

-- Activar el trigger
CREATE TRIGGER trg_notify_customer_message
  AFTER INSERT ON messages
  FOR EACH ROW
  WHEN (NEW.role = 'customer')
  EXECUTE FUNCTION util.notify_customer_message();
```

### Por qué triggers > middleware de API

| Aspecto | Middleware de API | Trigger en Postgres |
|---------|-------------------|-------------------|
| Atomicidad | Separado de la transacción | **Dentro** de la transacción |
| Bypass | Si alguien escribe directo a la DB | Imposible — siempre se ejecuta |
| Concurrency | Race conditions entre workers | Lock a nivel de fila |
| Testing | Mocks de HTTP | `SELECT` directo, transaccional |
| Versionado | En el repo de la app | En el schema (declarativo) |
| Side-effects | HTTP calls ad-hoc | `PERFORM util.invoke_api(...)` |

### Patrones que cubren los triggers

```
INSERT → notificar, audit log, dispatch job
UPDATE → recalcular campos, cascade lógica, webhooks
DELETE → cleanup, soft-delete, archive
BEFORE  → mutar datos (defaults, normalización)
AFTER   → side-effects (notificar, invocar API, enqueue)
```

**Puntos a destacar:**
- `SECURITY DEFINER` → el trigger corre con permisos del owner, no del caller
- `WHEN (NEW.role = 'customer')` → el trigger solo dispara cuando aplica (cero overhead)
- `util.invoke_api()` → side-effects HTTP desde la DB, atómicos con el INSERT
- Early exits (`IF ... RETURN NEW`) → legible, sin anidar
- Todo esto vive en el schema → code-reviewable, versionado, testable con `SELECT`
- **No es "SQL es malo para lógica compleja"** — es que la lógica *pertenece* al dato

---

## Slide 4 — Auth integrada

**Mensaje:** "Login, registro, refresh tokens, email verification — todo incluido."

### Ejemplo (Angular)

```typescript
// Login
const { data, error } = await this.supabase.auth.signInWithPassword({
  email, password
});

// Registro
await this.supabase.auth.signUp({
  email, password,
  options: { emailRedirectTo: window.location.origin }
});

// Estado reactivo
this.supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') this.user.set(session.user);
  if (event === 'SIGNED_OUT') this.user.set(null);
});

// Logout
await this.supabase.auth.signOut();
```

**Puntos a destacar:**
- OAuth (Google, GitHub, Discord, etc.) con una línea extra
- Magic links, phone OTP, SAML SSO
- Sessions y refresh tokens gestionados automáticamente
- Se integra con RLS vía `auth.uid()`

---

## Slide 5 — File Storage

**Mensaje:** "Upload, download, signed URLs — sin configurar S3."

### Ejemplo

```typescript
// Upload
const { data, error } = await this.supabase.storage
  .from('avatars')
  .upload(`users/${userId}/avatar.png`, file, {
    upsert: true,
    contentType: file.type,
  });

// Download
const { data: blob } = await this.supabase.storage
  .from('avatars')
  .download(`users/${userId}/avatar.png`);

// URL pública (si el bucket es público)
const { data } = this.supabase.storage
  .from('avatars')
  .getPublicUrl(`users/${userId}/avatar.png`);
```

**Puntos a destacar:**
- Buckets con políticas de acceso (público / privado)
- Signed URLs para acceso temporal a archivos privados
- Integrado con RLS: puedes restringir por `auth.uid()`
- Sin SDK de AWS, sin IAM, sin buckets

---

## Slide 6 — Edge Functions

**Mensaje:** "Serverless functions en Deno o Hono. Las llamas como una API."

### Ejemplo (Deno)

```typescript
import { withSupabase } from 'npm:@supabase/server@^1'

export default {
  fetch: withSupabase({ auth: 'user' }, async (req, ctx) => {
    const { name } = await req.json()
    return Response.json({ message: `Hello ${name}!` })
  }),
}
```

### Ejemplo (Hono)

```typescript
import { Hono } from 'jsr:@hono/hono@^4'

const app = new Hono()

app.post('/hello-world', async (c) => {
  const { name } = await c.req.json()
  return c.json({ message: `Hello ${name}!` })
})

export default { fetch: app.fetch }
```

### Invocación desde Angular

```typescript
const { data, error } = await this.supabase.functions.invoke('hello-world', {
  body: { name: 'Nicolas' }
})
```

**Puntos a destacar:**
- Deploy con `supabase functions deploy`
- Acceden a Supabase Auth, DB, Storage desde la función
- Cold start < 100ms (Deno)
- Alternativa a Vercel Functions / Cloudflare Workers

---

## Slide 7 — Scheduling & Jobs

**Mensaje:** "Cron jobs + HTTP calls desde Postgres. Sin Celery, sin BullMQ, sin worker."

### Ejemplo (pg_cron + pg_net)

```sql
select cron.schedule(
  'invoke-function-every-minute',
  '* * * * *',  -- every minute
  $$
  select net.http_post(
    url := (select decrypted_secret from vault.decrypted_secrets
            where name = 'project_url') || '/functions/v1/function-name',
    headers := jsonb_build_object(
      'Content-type', 'application/json',
      'apikey', (select decrypted_secret from vault.decrypted_secrets
                 where name = 'publishable_key')
    ),
    body := concat('{"time": "', now(), '"}')::jsonb
  ) as request_id;
  $$
);
```

### Casos de uso

- Webhooks periódicos (sync con terceros)
- Inventario / limpieza de datos
- Trigger de Edge Functions sin un servidor de cron
- Reportes automáticos

**Puntos a destacar:**
- Todo corre dentro de Postgres → atómico, transaccional
- `pg_cron` + `pg_net` = scheduler + HTTP client en la DB
- Sin infra extra: no necesitas un worker dedicado

---

## Slide 8 — Realtime

**Mensaje:** "Broadcast, Presence y cambios de BD en tiempo real. Sin WebSockets propios."

### Ejemplo (Broadcast)

```typescript
const channel = this.supabase.channel('test-channel')

channel
  .on('broadcast', { event: 'shout' }, (payload) => {
    console.log(payload)
  })
  .subscribe()

// Enviar
this.supabase.channel('test-channel')
  .send({ type: 'broadcast', event: 'shout', payload: { text: '¡Hola!' } })
```

### Ejemplo (Postgres Changes)

```typescript
this.supabase
  .channel('db-changes')
  .on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'messages' },
    (payload) => {
      this.messages.add(payload.new)
    }
  )
  .subscribe()
```

### Las 3 modalidades

| Modalidad | Uso típico |
|-----------|-----------|
| **Broadcast** | Chat, cursor tracking, game events |
| **Presence** | "Quién está online", co-editors |
| **Postgres Changes** | Sync de datos, live dashboards |

**Puntos a destacar:**
- Distribuido globalmente (multi-region)
- Se integra con RLS: solo recibe lo que el usuario puede ver
- Reemplaza a Socket.IO en la mayoría de casos

---

## Slide 9 — AI & Vectors

**Mensaje:** "Semantic search, hybrid search, embeddings — todo en Postgres con pgvector."

### Ejemplo

```sql
-- Tabla con embeddings
create table documents (
  id uuid primary key,
  content text,
  embedding vector(1536)  -- OpenAI dimension
);

-- Semantic search: "encuentra docs parecidos a este texto"
select * from documents
order by embedding <=> $1  -- cosine distance
limit 5;

-- Hybrid: semantic + keyword (tsvector)
select * from documents
order by (embedding <=> $1) + (1 - similarity(to_tsvector('english', content), $2))
limit 5;
```

### Desde Angular

```typescript
const { data } = await this.supabase.rpc('semantic_search', {
  query_embedding: embeddingArray,
  top_k: 5
})
```

**Puntos a destacar:**
- `pgvector` = extensión nativa de Postgres
- Sin Pinecone, Weaviate, Qdrant
- Combina con RLS: el usuario solo ve embeddings que le pertenecen
- Ideal para RAG pipelines

---

## Slide 10 — Supabase Queues

**Mensaje:** "Message queue pull-based. Sin RabbitMQ, sin Redis, sin infra extra."

### Concepto

```
Producer → [Supabase Queue] → Consumer (pull)
              FIFO, no priority
```

### Ejemplo

```sql
-- Crear cola
create queue email_notifications;

-- Encolar mensaje
insert into queue.email_notifications (payload)
values ('{"to": "user@example.com", "subject": "Bienvenido"}');

-- Consumir (pull)
select * from queue.consume('email_notifications', max_items := 10);
```

### Desde Edge Function

```typescript
import { createClient } from 'npm:@supabase/supabase-js@^2'

const supabase = createClient(url, key)
const { data: messages } = await supabase.rpc('consume_queue', {
  queue_name: 'email_notifications',
  max_items: 10
})
```

**Puntos a destacar:**
- Pull-based: el consumer decide cuándo procesar
- FIFO sin priority levels
- Storage + delivery en una sola extensión
- Ideal para: emails, notificaciones, procesamiento async

---

## Slide 11 — Self-Hosting 🎯 (la sorpresa)

**Mensaje:** "Todo lo anterior… en TU servidor. Sin lock-in."

### Por qué importa

| Escenario | Self-hosting resuelve |
|-----------|----------------------|
| Compliance (GDPR, HIPAA, sector público) | Datos en tu infra |
| Air-gapped environments | Sin dependencia de internet |
| Cost control (high volume) | Sin per-seat / per-request billing |
| Custom patches | Control total del stack |

### Stack completo que se self-hostea

```
┌─────────────────────────────────────────────┐
│  Postgres (con RLS, pgvector, pg_cron)      │
│  Supabase Auth (GoTrue)                     │
│  Storage (S3-compatible)                    │
│  Edge Functions (Deno runtime)              │
│  Realtime (WebSocket)                       │
│  Queues                                     │
│  Studio (dashboard)                         │
└─────────────────────────────────────────────┘
```

### Deploy

```bash
# Docker Compose (local / VPS)
git clone https://github.com/supabase/supabase
cd docker
docker compose up -d

# O Kubernetes
helm install supabase supabase/supabase
```

**Puntos a destacar:**
- Mismo SDK, mismas APIs — cero cambio de código
- Migrar entre managed ↔ self-hosted es transparente
- "Postgres is all you need" → literalmente, es Postgres + extensiones
- El cierre refuerza el título: no es un SaaS mágico, es Postgres bien empaquetado

---

## Notas de presentación

- **Tono:** técnico pero conversacional. "Mira, esto es lo que haces en 5 líneas vs. 200 líneas de Express."
- **Ritmo:** slides 1-6 rápidos (demo visual), slides 7-11 con más explicación (son los menos conocidos).
- **Cierre:** volver al título. "Postgres is all you need" no es marketing — es que cada feature es una extensión de Postgres.
- **CTA sugerido:** "Si tu stack actual tiene Express + Redis + S3 + Socket.IO + Pinecone… pregunta: ¿realmente necesito 5 servicios?"
