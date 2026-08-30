<script setup lang="ts">
useSeoMeta({
  title: "Hermes OAuth",
  robots: "noindex, nofollow",
});

const code = ref("");
const error = ref("");
const ready = ref(false);
const copied = ref(false);

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  code.value = params.get("code") ?? "";
  // Google sends ?error=access_denied and no code when consent is refused.
  error.value = params.get("error") ?? "";
  ready.value = true;
});

const heading = computed(() => {
  if (!ready.value) return "Authorization";
  return code.value ? "Authorization complete" : "Authorization failed";
});

const status = computed(() => {
  if (!ready.value) return "Reading the code from the URL.";
  if (code.value) return "Copy this code and paste it into Hermes.";
  return error.value
    ? "Google refused the request. Start the flow again."
    : "Open this page from the Google consent screen, not directly.";
});

const value = computed(() => {
  if (!ready.value) return "reading...";
  return code.value || error.value || "no code in this URL";
});

function copy() {
  try {
    navigator.clipboard.writeText(code.value);
  } catch {
    return;
  }
  copied.value = true;
  setTimeout(() => (copied.value = false), 1200);
}
</script>

<template>
  <div>
    <h1 class="text-lg font-medium">{{ heading }}</h1>
    <p class="mt-2 meta-label">{{ status }}</p>

    <div class="code-block mt-8 overflow-hidden rounded-md border border-border bg-surface">
      <div
        class="flex items-center justify-between border-b border-border px-4 py-2 font-pixel text-xs tracking-widest text-muted"
      >
        <span>authorization code</span>
        <button
          v-if="code"
          data-copy-code
          :data-copied="copied ? '' : undefined"
          aria-label="Copy code"
          class="cursor-pointer hover:text-fg"
          @click="copy"
        />
      </div>
      <pre class="px-4 py-3 font-pixel text-sm break-all whitespace-pre-wrap">{{ value }}</pre>
    </div>
  </div>
</template>
