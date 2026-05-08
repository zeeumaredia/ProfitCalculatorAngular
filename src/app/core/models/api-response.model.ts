/**
 * Generic wrapper for all API responses from the DACHSER backend.
 * Every endpoint returns a consistent envelope with a human-readable
 * message and a typed data payload.
 *
 * @template T The type of the data payload.
 */
export interface ApiResponse<T> {
  /** Human-readable status message returned by the server. */
  message: string;

  /** The actual response payload. */
  data: T;
}
