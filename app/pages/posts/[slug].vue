<script setup lang="ts">
const route = useRoute();
const { data: post } = await useAsyncData(route.path, () => queryCollection("posts").path(route.path).first());
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Post not found", fatal: true });
}

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
  ogType: "article",
  articlePublishedTime: post.value.date,
  articleModifiedTime: post.value.updatedAt,
});

// GFM's generated "Footnotes" heading is not a real section title
const toc = computed(() => (post.value?.body?.toc?.links ?? []).filter((link) => link.id !== "footnote-label"));

// ToC scroll-spy + copy handlers (heading hash, code blocks); each part
// early-returns when its target is absent on the page
useHead({
  script: [
    {
      tagPosition: "bodyClose",
      innerHTML: `(function () {
	var toc = document.querySelector("[data-toc]"); if (!toc) return;
	var map = {};
	toc.querySelectorAll('a[href^="#"]').forEach(function (a) { map[decodeURIComponent(a.hash).slice(1)] = a; });
	var headings = Array.prototype.filter.call(document.querySelectorAll("article h2[id], article h3[id]"), function (h) { return map[h.id]; });
	if (!headings.length) return;
	var active;
	function update() {
		var current = headings[0];
		for (var i = 0; i < headings.length; i++) {
			if (headings[i].getBoundingClientRect().top <= 120) current = headings[i];
		}
		var link = map[current.id];
		if (link !== active) {
			if (active) active.removeAttribute("data-active");
			link.setAttribute("data-active", "");
			active = link;
		}
	}
	addEventListener("scroll", update, { passive: true });
	update();
})();
(function () {
	function flash(el) {
		var prev = document.querySelector("article [data-copied]");
		if (prev) prev.removeAttribute("data-copied");
		el.setAttribute("data-copied", "");
		setTimeout(function () { el.removeAttribute("data-copied"); }, 1200);
	}
	document.addEventListener("click", function (e) {
		if (!e.target.closest) return;
		var hash = e.target.closest("article .heading-hash");
		if (hash) {
			try { navigator.clipboard.writeText(location.origin + location.pathname + hash.hash); } catch (err) { return; }
			flash(hash);
			return;
		}
		var button = e.target.closest("article [data-copy-code]");
		if (button) {
			var pre = button.closest(".code-block").querySelector("pre");
			if (!pre) return;
			try { navigator.clipboard.writeText(pre.innerText); } catch (err) { return; }
			flash(button);
		}
	});
})();`,
    },
  ],
});
</script>

<template>
  <article v-if="post">
    <aside v-if="toc.length" class="fixed top-44 left-[calc(50%+20rem)] hidden w-48 xl:block">
      <PostToc :links="toc" />
    </aside>

    <NuxtLink to="/posts" class="meta-label hover:text-fg">← posts</NuxtLink>

    <header class="mt-8">
      <h1 class="text-lg font-medium">{{ post.title }}</h1>
      <p class="mt-2 meta-label">
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
        <template v-if="post.updatedAt && post.updatedAt.slice(0, 10) > post.date">
          <span class="mx-2">·</span>
          <span>
            updated
            <time :datetime="post.updatedAt">{{ formatDate(post.updatedAt) }}</time>
          </span>
        </template>
      </p>
    </header>

    <img v-if="post.coverImage" :src="post.coverImage.src" :alt="post.coverImage.alt" class="mt-8 rounded-sm" />

    <ContentRenderer :value="post" class="prose mt-8 max-w-none" />

    <PostHistory :changelog="post.changelog" />
  </article>
</template>
