import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: "page",
      source: "posts/**/*.md",
      schema: z.object({
        date: z.string(),
        tags: z.array(z.string()).default([]),
        coverImage: z.object({ src: z.string(), alt: z.string() }).optional(),
        draft: z.boolean().default(false),
        // Populated at build time by the content:file:afterParse hook (nuxt.config.ts).
        // Fields must be declared here or the hook's values are silently dropped.
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
        changelog: z.array(z.object({ hash: z.string(), date: z.string(), message: z.string() })).default([]),
      }),
    }),
    home: defineCollection({
      type: "data",
      source: "home.yml",
      schema: z.object({
        intro: z.string(),
        socials: z.array(z.object({ name: z.string(), href: z.string() })),
        projects: z.array(z.object({ name: z.string(), description: z.string(), href: z.string().optional() })),
        work: z.array(
          z.object({
            name: z.string(),
            href: z.string().optional(),
            logo: z.string().optional(),
            // square-ish marks read smaller than wordmarks at equal height
            tall: z.boolean().optional(),
          }),
        ),
      }),
    }),
  },
});
