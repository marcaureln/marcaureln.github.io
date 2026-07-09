<script setup lang="ts">
defineProps<{
  posts: { path: string; title: string; date: string }[];
}>();
</script>

<template>
  <ul class="space-y-3">
    <li v-for="post in posts" :key="post.path" class="flex items-baseline gap-4">
      <time :datetime="post.date" class="w-[12ch] shrink-0 font-pixel text-xs text-muted">
        {{ formatDate(post.date) }}
      </time>
      <NuxtLink :to="post.path" class="link-sweep">
        {{ post.title }}
      </NuxtLink>
    </li>
  </ul>
</template>
