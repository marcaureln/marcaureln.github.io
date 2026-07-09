// Shared list query: published posts, newest first, list fields only.
// Callers chain .limit(n) / .all() as needed.
export function queryPublishedPosts() {
  return queryCollection("posts").where("draft", "<>", true).order("date", "DESC").select("path", "title", "date");
}
