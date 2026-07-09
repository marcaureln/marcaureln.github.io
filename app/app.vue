<script setup lang="ts">
useHead({
  titleTemplate: (title) => (title ? `${title} · ${site.title}` : site.title),
});
useSeoMeta({
  description: site.description,
  ogSiteName: site.title,
});
</script>

<template>
  <div class="mx-auto flex min-h-screen w-full max-w-xl flex-col px-6">
    <SiteHeader />
    <main class="flex-1 pt-16 pb-24">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
