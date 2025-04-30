export const resolveUrl = (base: string, relative: string): string => {
  const baseUrl = new URL(base, window.location.origin);
  const resolvedUrl = new URL(relative, baseUrl);
  const pathname = resolvedUrl.pathname.replace(/\/$/, "");

  return pathname;
};
