---
theme: default
title: Postgres is All You Need
info: |
  12 funciones de Supabase, demostradas con Angular.
canvasWidth: 1280
fonts:
  sans: 'Bricolage Grotesque'
  mono: 'Martian Mono'
  # Loaded in index.html with their variable width axes
  provider: none
transition: fade-out
layout: stage
class: t-title cover
---

<h1>Postgres is<br/>All You Need</h1>

---
layout: stage
class: t-profile
---

<img class="avatar" src="/profile.jpg" alt="Nicolas Molina" />
<h1>Senior Software Engineer<span class="caret" aria-hidden="true"></span></h1>
<p>Soy Nicolas Molina (@nicobytes), Senior Software Engineer y profesor en Platzi, con más de 13 años de experiencia en desarrollo y gestión de tecnología. Reconocido por Google como <span class="hl">Angular Developer Expert</span> y por Microsoft como <span class="hl">Most Valuable Professional</span>.</p>

---
layout: stage
class: t-para
---

<p>12 funciones de Supabase, demostradas con Angular.</p>

---
layout: stage
class: t-logo
---

<img src="/supbase-logos/supabase-logo-wordmark--dark.svg" alt="Supabase" />

---
layout: stage
class: t-logo angular
---

<img src="/angular-logos/PNG%20files/lockup_angular_gradient.png" alt="Angular" />

---
layout: stage
class: t-para
---

<p><span class="premise">12 cosas sobre Supabase que probablemente no conoces.</span> <span class="promise">La #12 te va a sorprender.</span></p>

---
layout: stage
class: t-title
---

<h1>Angular +<br/>Supabase</h1>

---
layout: stage
class: t-para
---

<p><span class="premise">Un cliente tipado, una sola instancia para toda la app.</span> Inyectas y listo.</p>

---
layout: stage
class: t-code
ctx: terminal
---

```bash
npm install @supabase/supabase-js
```

---
layout: stage
class: t-code
ctx: angular
---

```ts
@Service()
export class SupabaseService {
  readonly client = createClient<Database>(
    url, key
  );
}
```

---
layout: stage
class: t-title
---

<h1><span class="n">01</span>CRUD</h1>

---
layout: stage
class: t-para
---

<p><span class="premise">No necesitas escribir un solo endpoint.</span> Supabase te da CRUD completo sobre Postgres.</p>

---
layout: stage
class: t-code
ctx: angular
---

```ts
const { data } = await this.supabase
  .from('todos')
  .select('*')
  .order('created_at', { ascending: false });
```

---
layout: stage
class: t-code
ctx: angular
---

```ts
const { data } = await this.supabase
  .from('todos')
  .insert({ title: 'Postgres' })
  .select()
  .single();
```

---
layout: stage
class: t-code
ctx: angular
---

```ts
const { data } = await this.supabase
  .from('todos')
  .update({ done: true })
  .eq('id', id)
  .select()
  .single();
```

---
layout: stage
class: t-code
ctx: angular
---

```ts
await this.supabase
  .from('todos')
  .delete()
  .eq('id', id);
```

---
layout: stage
class: t-title
---

<h1><span class="n">02</span>Row Level Security</h1>

---
layout: stage
class: t-para
---

<p><span class="premise">La seguridad no vive en tu app.</span> Vive en la base de datos.</p>

---
layout: stage
class: t-code
ctx: sql
---

```sql
create policy "own todos"
  on todos for select
  to authenticated
  using ((select auth.uid()) = user_id);
```

---
layout: stage
class: t-title
---

<h1><span class="n">03</span>Declarative Schemas</h1>

---
layout: stage
class: t-para
---

<p><span class="premise">Declaras cómo es tu schema, sin ORM.</span> Supabase genera las migraciones.</p>

---
layout: stage
class: t-code
ctx: sql
---

```sql
-- supabase/schemas/todos.sql
create table todos (
  id uuid primary key,
  user_id uuid references auth.users,
  title text not null,
  done boolean default false
);
```

---
layout: stage
class: t-code
ctx: terminal
---

```bash
supabase db schema declarative sync -f todos
# → supabase/migrations/20261017120000_todos.sql
```

---
layout: stage
class: t-code
ctx: drizzle
---

```ts
// drizzle/schema.ts
export const todos = pgTable('todos', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id),
  title: text('title').notNull(),
  done: boolean('done').default(false),
})
```

---
layout: stage
class: t-code
ctx: django
---

```python
# todos/models.py
class Todo(models.Model):
    id = models.UUIDField(primary_key=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE,
    )
    title = models.TextField()
    done = models.BooleanField(default=False)
```

---
layout: stage
class: t-title
---

<h1><span class="n">04</span>Data Validation</h1>

---
layout: stage
class: t-para
---

<p><span class="premise">Sin API, ¿dónde validas?</span> En el schema. Postgres rechaza lo que no cumple.</p>

---
layout: stage
class: t-code
ctx: sql
---

```sql
alter table messages
  add constraint sender_matches_role check (
    role <> 'agent'
    or sender_profile_id is not null
  );
```

---
layout: stage
class: t-title
---

<h1><span class="n">05</span>Auth</h1>

---
layout: stage
class: t-para
---

<p><span class="premise">Login, registro, refresh tokens, email verification.</span> Todo incluido.</p>

---
layout: stage
class: t-code
ctx: angular
---

```ts
await this.supabase.auth
  .signInWithPassword({ email, password });

this.supabase.auth.onAuthStateChange((_, s) => {
  this.user.set(s?.user ?? null);
});
```

---
layout: stage
class: t-title
---

<h1><span class="n">06</span>File Storage</h1>

---
layout: stage
class: t-para
---

<p><span class="premise">Upload, download, signed URLs.</span> Sin configurar S3.</p>

---
layout: stage
class: t-code
ctx: angular
---

```ts
await this.supabase.storage
  .from('avatars')
  .upload(path, file);

const { data } = await this.supabase.storage
  .from('avatars')
  .download(path);
```

---
layout: stage
class: t-title
---

<h1><span class="n">07</span>Edge Functions</h1>

---
layout: stage
class: t-para
---

<p><span class="premise">Serverless functions en Deno o Hono.</span> Las llamas como una API.</p>

---
layout: stage
class: t-code
ctx: hono
---

```ts
import { Hono } from 'jsr:@hono/hono@^4';

const app = new Hono();
app.post('/hello-world', async (c) => {
  const { name } = await c.req.json();
  return c.json({ message: `Hola ${name}` });
});

export default { fetch: app.fetch };
```

---
layout: stage
class: t-code
ctx: angular
---

```ts
await this.supabase.functions
  .invoke('hello-world', {
    body: { name: 'Nicolas' },
  });
```

---
layout: stage
class: t-title
---

<h1><span class="n">08</span>Scheduling</h1>

---
layout: stage
class: t-para
---

<p><span class="premise">Cron jobs + HTTP calls desde Postgres.</span> Sin Celery, sin BullMQ, sin worker.</p>

---
layout: stage
class: t-code
ctx: sql
---

```sql
create extension pg_cron;
create extension pg_net;

select cron.schedule('ping', '* * * * *',
  $$ select net.http_post('.../hello') $$
);
```

---
layout: stage
class: t-title
---

<h1><span class="n">09</span>Realtime</h1>

---
layout: stage
class: t-para
---

<p><span class="premise">Broadcast, Presence y cambios de BD en tiempo real.</span> Sin WebSockets propios.</p>

---
layout: stage
class: t-code
ctx: angular
---

```ts
this.supabase
  .channel('messages')
  .on('postgres_changes',
    { event: 'INSERT', table: 'messages' },
    add)
  .subscribe();
```

---
layout: stage
class: t-title
---

<h1><span class="n">10</span>AI &amp; Vectors</h1>

---
layout: stage
class: t-para
---

<p><span class="premise">Semantic search, embeddings y búsqueda híbrida.</span> Todo en Postgres con pgvector.</p>

---
layout: stage
class: t-code
ctx: sql
---

```sql
create extension vector; -- pgvector

select * from documents
order by embedding <=> $1
limit 5;
```

---
layout: stage
class: t-title
---

<h1><span class="n">11</span>Queues</h1>

---
layout: stage
class: t-para
---

<p><span class="premise">Message queue pull-based.</span> Sin RabbitMQ, sin Redis, sin infra extra.</p>

---
layout: stage
class: t-code
ctx: sql
---

```sql
create extension pgmq;

select pgmq.create('emails');
select pgmq.send('emails', '{"to": "ana"}');
select * from pgmq.read('emails', 30, 10);
```

---
layout: stage
class: t-title
---

<h1><span class="n red">12</span>Self-Hosting</h1>

---
layout: stage
class: t-para
---

<p><span class="premise">Todo lo anterior, en tu propia infraestructura.</span> Sin lock-in.</p>

---
layout: stage
class: t-code
ctx: terminal
---

```bash
git clone https://github.com/supabase/supabase
cd supabase/docker
docker compose up -d
```

---
layout: stage
class: t-para
---

<p><span class="premise">Si tu stack actual tiene Express + Redis + S3 + Socket.IO + Pinecone…</span> ¿realmente necesito 5 servicios?</p>

---
layout: stage
class: t-end
---

<h1>Postgres is<br/>all you need</h1>
