<script setup lang="ts">
const { data } = await useAsyncData("homelab-scopes", () => queryCollection("scopes").first());
const scopes = computed(() => data.value?.scopes ?? []);

// The collection schema shapes the data but does not fail the build on a bad
// row, and a half-written entry renders as "Name: ." on a page Google's
// reviewers read. Prerender errors do fail the build, so check here.
const broken = scopes.value.filter((scope) => !scope.name?.trim() || !scope.use?.trim());
if (!scopes.value.length || broken.length) {
  throw createError({
    statusCode: 500,
    statusMessage: broken.length
      ? `content/homelab/scopes.yml: entry needs both name and use: ${JSON.stringify(broken)}`
      : "content/homelab/scopes.yml: no scopes listed",
    fatal: true,
  });
}
</script>

<template>
  <ul>
    <li v-for="scope in scopes" :key="scope.name">
      <strong>{{ scope.name }}</strong>: {{ scope.use }}.
    </li>
  </ul>
</template>
