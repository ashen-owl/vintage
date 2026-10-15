export function withBase(path: string): string {
  const basePath = import.meta.env.BASE_URL.replace(/\/+$/, "");
  const relativePath = path.replace(/^\/+/, "");
  return `${basePath}/${relativePath}`;
}
