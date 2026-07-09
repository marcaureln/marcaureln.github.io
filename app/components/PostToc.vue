<script setup lang="ts">
interface TocLink {
  id: string;
  text: string;
  depth: number;
  children?: TocLink[];
}

defineProps<{ links: TocLink[] }>();

const linkClass = "text-muted hover:text-fg data-active:text-fg";
</script>

<template>
  <nav data-toc aria-label="Table of contents" class="font-pixel text-xs tracking-wide">
    <p class="section-label">Contents</p>
    <ul class="mt-4 space-y-2.5">
      <li v-for="link in links" :key="link.id">
        <a :href="`#${link.id}`" :class="linkClass">{{ link.text }}</a>
        <ul v-if="link.children?.length" class="mt-2.5 ml-4 space-y-2.5">
          <li v-for="child in link.children" :key="child.id">
            <a :href="`#${child.id}`" :class="linkClass">{{ child.text }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
