const formatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function formatDate(iso: string): string {
  return formatter.format(new Date(iso));
}
