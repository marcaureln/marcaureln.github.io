<script setup lang="ts">
import type { ChangelogEntry } from "~~/scripts/git-history";

defineProps<{
  changelog: ChangelogEntry[];
}>();
</script>

<template>
  <section v-if="changelog.length > 1" class="mt-16 border-t border-border pt-6">
    <h2 class="section-label">History</h2>
    <ol class="mt-4 space-y-2 font-pixel text-xs text-muted">
      <li v-for="entry in changelog" :key="entry.hash" class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <time :datetime="entry.date" class="shrink-0">{{ formatDate(entry.date) }}</time>
        <NuxtLink :to="`${site.repo}/commit/${entry.hash}`" target="_blank" class="shrink-0 hover:text-fg">
          {{ entry.hash }}
        </NuxtLink>
        <span class="text-fg/70">{{ entry.message }}</span>
      </li>
    </ol>
  </section>
</template>
