<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => queryCollection("homelab").path(route.path).first());
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
}

// Google's OAuth reviewers must reach these pages, so they stay public and
// only carry a noindex tag. A robots.txt Disallow would hide the tag from the
// crawler and leave the URL indexable.
useSeoMeta({
  title: page.value.title,
  description: page.value.description,
  robots: "noindex, nofollow",
});
</script>

<template>
  <article v-if="page">
    <NuxtLink v-if="route.path !== '/homelab'" to="/homelab" class="meta-label hover:text-fg">
      ← Alex's Homelab
    </NuxtLink>

    <header :class="route.path === '/homelab' ? '' : 'mt-8'">
      <h1 class="text-lg font-medium">{{ page.title }}</h1>
      <p v-if="page.updatedAt" class="mt-2 meta-label">
        updated
        <time :datetime="page.updatedAt">{{ formatDate(page.updatedAt) }}</time>
      </p>
    </header>

    <ContentRenderer :value="page" class="prose mt-8 max-w-none" />
  </article>
</template>
