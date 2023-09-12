/**
 * Trims trailing slashes from a string.
 *
 * @param s - The string to trim trailing slashes from.
 * @returns The string with trailing slashes removed.
 */
export const trimTrailingSlash = (s: string): string => s.replace(/\/+$/, '');

/**
 * Trims leading slashes from a string.
 *
 * @param s - The string to trim leading slashes from.
 * @returns The string with leading slashes removed.
 */
export const trimLeadingSlash = (s: string): string => s.replace(/^\/+/, '');
