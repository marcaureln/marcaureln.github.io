import { join } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { site } from "./app/utils/site";
import { getGitHistory } from "./scripts/git-history";
import rehypeMermaid from "./scripts/rehype-mermaid";
import { themeScript } from "./scripts/theme";

export default defineNuxtConfig({
  compatibilityDate: "2026-07-09",
  modules: ["@nuxt/content", "@nuxt/eslint", "@nuxt/icon", "@nuxtjs/sitemap"],
  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  site: { url: site.url, name: site.title },
  icon: {
    mode: "svg",
    serverBundle: { collections: ["lucide"] },
    clientBundle: { scan: false },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      script: [{ innerHTML: themeScript }],
      link: [
        { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
        { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "preload", as: "font", type: "font/woff2", href: "/fonts/GeistVariable.woff2", crossorigin: "" },
        { rel: "preload", as: "font", type: "font/woff2", href: "/fonts/DepartureMono-Regular.woff2", crossorigin: "" },
      ],
    },
  },

  content: {
    build: {
      markdown: {
        rehypePlugins: { "rehype-mermaid-svg": { instance: rehypeMermaid } },
        highlight: { theme: { default: "min-light", dark: "min-dark" } },
      },
    },
  },

  hooks: {
    "content:file:afterParse"(ctx) {
      const { file, content } = ctx;
      const id = String(file.id);
      if (!id.endsWith(".md")) return;
      const rel = join("content", id.split("/").slice(1).join("/"));
      const history = getGitHistory(rel);
      if (history) Object.assign(content, history);
    },
  },

  routeRules: { "/**": { prerender: true, noScripts: true } },
  experimental: { payloadExtraction: false },
});
