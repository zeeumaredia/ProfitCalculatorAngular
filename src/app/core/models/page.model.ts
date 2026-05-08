/**
 * Represents a single page of results from a paginated Spring Data endpoint.
 *
 * @template T The type of items contained in this page.
 */
export interface Page<T> {
  /** Items on the current page. */
  content: T[];

  /** Total number of items across all pages. */
  totalElements: number;

  /** Total number of pages available. */
  totalPages: number;

  /** Number of items requested per page. */
  size: number;

  /** Zero-based index of the current page. */
  number: number;

  /** Whether this is the first page. */
  first: boolean;

  /** Whether this is the last page. */
  last: boolean;
}
