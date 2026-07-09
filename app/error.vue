<script setup lang="ts">
defineProps<{ error: { statusCode: number } }>();
useSeoMeta({ title: "Not found" });
</script>

<template>
  <div class="mx-auto flex min-h-screen w-full max-w-xl flex-col px-6">
    <SiteHeader />
    <main class="flex flex-1 flex-col justify-center pb-24">
      <p class="meta-label">{{ error.statusCode }}</p>
      <h1 class="mt-2 text-lg font-medium">
        {{ error.statusCode === 404 ? "There's nothing here." : "Something went wrong." }}
      </h1>
      <p class="mt-4">
        <NuxtLink to="/" class="hover:text-muted">← back home</NuxtLink>
      </p>
    </main>
    <SiteFooter />
  </div>
</template>
