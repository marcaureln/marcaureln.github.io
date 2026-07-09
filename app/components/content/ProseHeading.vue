<script setup lang="ts">
defineProps<{ tag: "h2" | "h3" | "h4"; id?: string }>();
</script>

<template>
  <component :is="tag" :id="id">
    <a v-if="id && id !== 'footnote-label'" :href="`#${id}`" class="heading-hash" aria-label="Copy link to section">
      #
    </a>
    <slot />
  </component>
</template>
