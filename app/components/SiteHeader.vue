<template>
  <header class="flex items-baseline justify-between pt-10">
    <NuxtLink to="/" class="font-pixel text-sm tracking-wide hover:text-muted">an.</NuxtLink>
    <nav class="flex items-center gap-5 meta-label">
      <NuxtLink to="/posts" class="hover:text-fg">posts</NuxtLink>
      <ThemeToggle />
    </nav>
  </header>
</template>
