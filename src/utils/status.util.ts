/**
 * Checks if a status code represents a non-error response.
 *
 * @param statusCode - The HTTP status code to check.
 * @returns True if the status code is >= 100 and < 400, false otherwise.
 */
export const isNonErrorResponse = (statusCode: number): boolean => {
  return statusCode >= 100 && statusCode < 400;
};
