/**
 * Represents a single income entry associated with a shipment.
 * Maps directly to the backend {@code IncomeDTO}.
 */
export interface Income {
  /** Database identifier — absent when creating a new entry. */
  id?: number;

  /** Income amount (must be zero or greater). */
  amount: number;
}
