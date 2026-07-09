<script setup lang="ts">
defineProps<{
  code?: string;
  language?: string | null;
  filename?: string | null;
  class?: string | null;
}>();
</script>

<template>
  <div class="code-block my-7 overflow-hidden rounded-md border border-border bg-surface">
    <div
      class="flex items-center justify-between border-b border-border px-4 py-2 font-pixel text-xs tracking-widest text-muted"
    >
      <span>{{ filename ?? language ?? "text" }}</span>
      <button data-copy-code aria-label="Copy code" class="cursor-pointer hover:text-fg" />
    </div>
    <pre :class="$props.class"><slot /></pre>
  </div>
</template>
