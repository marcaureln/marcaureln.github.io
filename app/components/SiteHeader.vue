<template>
  <header class="flex items-baseline justify-between pt-10">
    <NuxtLink to="/" class="font-pixel text-sm tracking-wide hover:text-muted">an.</NuxtLink>
    <nav class="flex items-center gap-5 meta-label">
      <NuxtLink
        to="https://getvia.io/d/l628zacw"
        target="_blank"
        title="CV in French, served by Via"
        class="via-link flex items-center gap-1.5 hover:text-fg"
      >
        cv (fr)
        <ViaMark class="size-3" />
      </NuxtLink>
      <NuxtLink to="/posts" class="hover:text-fg">posts</NuxtLink>
      <ThemeToggle />
    </nav>
  </header>
</template>
