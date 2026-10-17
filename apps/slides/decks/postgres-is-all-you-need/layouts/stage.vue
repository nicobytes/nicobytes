<script setup lang="ts">
// `ctx` (frontmatter) names where a code snippet runs; shown in the top-right corner
defineProps<{ ctx?: 'angular' | 'sql' | 'terminal' | 'hono' | 'drizzle' | 'django' }>()
</script>

<template>
  <div class="stage">
    <div v-if="ctx" class="ctx">
      <logos-angular-icon v-if="ctx === 'angular'" />
      <logos-postgresql v-else-if="ctx === 'sql'" />
      <logos-hono v-else-if="ctx === 'hono'" />
      <carbon-terminal v-else-if="ctx === 'terminal'" />
      <logos-drizzle-orm-icon v-else-if="ctx === 'drizzle'" />
      <logos-django-icon v-else-if="ctx === 'django'" />
      <span v-if="ctx === 'angular'">Angular</span>
      <span v-else-if="ctx === 'sql'">PostgreSQL</span>
      <span v-else-if="ctx === 'hono'">Hono</span>
      <span v-else-if="ctx === 'terminal'">Terminal</span>
      <span v-else-if="ctx === 'drizzle'">Drizzle</span>
      <span v-else-if="ctx === 'django'">Django</span>
    </div>
    <slot />
  </div>
</template>
