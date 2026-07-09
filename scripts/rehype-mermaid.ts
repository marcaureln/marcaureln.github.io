import { renderMermaidSVG } from "beautiful-mermaid";
import type { Element, Root } from "hast";
import { fromHtml } from "hast-util-from-html";
import { toText } from "hast-util-to-text";
import { find, svg as svgSchema } from "property-information";
import { visit } from "unist-util-visit";

// Nuxt Content serializes hast property names verbatim, so camelCase names like
// strokeWidth must be mapped back to real SVG attribute names or the browser ignores them.
function restoreSvgAttributes(tree: Root) {
  visit(tree, "element", (el: Element) => {
    if (!el.properties) return;
    el.properties = Object.fromEntries(
      Object.entries(el.properties).map(([key, value]) => [find(svgSchema, key).attribute, value]),
    );
  });
}

export default function rehypeMermaid() {
  return (tree: Root) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName !== "pre" || !parent || typeof index !== "number") return;
      const code = node.children.find((c): c is Element => c.type === "element" && c.tagName === "code");
      const className = Array.isArray(code?.properties.className) ? code.properties.className : [];
      const lang =
        node.properties.language ??
        className
          .find((c) => String(c).startsWith("language-"))
          ?.toString()
          .slice("language-".length);
      if (lang !== "mermaid") return;
      try {
        const source = typeof node.properties.code === "string" ? node.properties.code : toText(code ?? node);
        const svg = renderMermaidSVG(source, {
          bg: "var(--color-bg)",
          fg: "var(--color-fg)",
          accent: "var(--color-accent)",
          font: "Geist Variable",
          transparent: true,
        });
        const figure = fromHtml(`<figure class="mermaid">${svg}</figure>`, { fragment: true });
        restoreSvgAttributes(figure);
        parent.children[index] = figure.children[0] as Element;
      } catch (error) {
        // unsupported diagram type, leave the plain code block and never fail the build
        console.warn("[rehype-mermaid] falling back to code block:", (error as Error).message);
      }
    });
  };
}
