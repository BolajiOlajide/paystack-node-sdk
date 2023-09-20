export const createQueryForURL = <T extends Record<string, unknown>>(url: string, args: T): string => {
  const keys = Object.keys(args);
  if (keys.length === 0) {
    return url;
  }

  const queryString = keys.map((key) => `${key}=${args[key as keyof typeof args]}`).join('&');
  return `${url}?${queryString}`;
};
