<script setup lang="ts">
const NuxtLink = resolveComponent("NuxtLink");

const { data } = await useAsyncData("home", async () => {
  const [home, posts] = await Promise.all([queryCollection("home").first(), queryPublishedPosts().limit(5).all()]);
  return { home, posts };
});

const intro = computed(() => data.value?.home?.intro ?? "");
const socials = computed(() => data.value?.home?.socials ?? []);
const projects = computed(() => data.value?.home?.projects ?? []);
const work = computed(() => data.value?.home?.work ?? []);
const posts = computed(() => data.value?.posts ?? []);
</script>

<template>
  <div>
    <section>
      <h1 class="text-lg font-medium">Alex N'Guessan</h1>
      <p class="mt-4 leading-relaxed text-fg/90">{{ intro }}</p>
      <p class="mt-4 flex gap-6 meta-label">
        <NuxtLink
          v-for="social in socials"
          :key="social.name"
          :to="social.href"
          :target="social.href.startsWith('http') ? '_blank' : undefined"
          class="hover:text-fg"
        >
          {{ social.name }}
        </NuxtLink>
      </p>
    </section>

    <section class="mt-16">
      <h2 class="section-label">Projects</h2>
      <p class="mt-1 text-sm text-muted">Stuff I'm working on.</p>
      <ul class="mt-3 space-y-4">
        <li v-for="project in projects" :key="project.name">
          <NuxtLink v-if="project.href" :to="project.href" target="_blank" class="link-sweep">
            {{ project.name }}
          </NuxtLink>
          <span v-else class="link-sweep">{{ project.name }}</span>
          <span class="ml-4 text-muted">{{ project.description }}</span>
        </li>
      </ul>
    </section>

    <section class="mt-16">
      <h2 class="section-label">Work</h2>
      <p class="mt-1 text-sm text-muted">Some companies I've worked with.</p>
      <ul class="mt-6 flex flex-wrap items-center gap-x-8 gap-y-5">
        <li v-for="company in work" :key="company.name" class="flex">
          <component
            :is="company.href ? NuxtLink : 'span'"
            :to="company.href"
            :target="company.href ? '_blank' : undefined"
            :title="company.name"
            class="flex items-center"
          >
            <img
              v-if="company.logo"
              :src="company.logo"
              :alt="company.name"
              :class="company.tall ? 'h-8' : 'h-6'"
              class="w-auto max-w-32 object-contain opacity-75 grayscale contrast-110 mix-blend-multiply transition duration-150 hover:opacity-100 hover:grayscale-0 dark:invert dark:mix-blend-screen dark:hover:grayscale dark:hover:contrast-125"
              loading="lazy"
              decoding="async"
            />
            <span v-else class="meta-label">{{ company.name }}</span>
          </component>
        </li>
      </ul>
    </section>

    <section class="mt-16">
      <h2 class="section-label">Posts</h2>
      <div class="mt-4">
        <PostList :posts="posts ?? []" />
      </div>
      <p class="mt-6 font-pixel text-xs tracking-wide">
        <NuxtLink to="/posts" class="text-muted hover:text-fg">all posts →</NuxtLink>
      </p>
    </section>
  </div>
</template>
