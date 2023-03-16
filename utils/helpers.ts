export function generateUrlSlug(url: string) {
  if (!url) return "";
  return url.toLowerCase().split(" ").join("-");
}
