<script setup lang="ts">
useSeoMeta({ title: "Posts", description: "Thoughts and writing." });

const { data: posts } = await useAsyncData("all-posts", () => queryPublishedPosts().all());

const byYear = computed(() => {
  const groups = new Map<string, NonNullable<typeof posts.value>>();
  for (const post of posts.value ?? []) {
    const year = post.date.slice(0, 4);
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(post);
  }
  return [...groups.entries()];
});
</script>

<template>
  <div>
    <h1 class="text-lg font-medium">Posts</h1>
    <section v-for="[year, yearPosts] in byYear" :key="year" class="mt-10">
      <h2 class="section-label">{{ year }}</h2>
      <div class="mt-4">
        <PostList :posts="yearPosts" />
      </div>
    </section>
  </div>
</template>
