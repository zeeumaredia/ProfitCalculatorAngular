/**
 * Represents the result of a profit calculation for a specific shipment.
 * Maps directly to the backend {@code ProfitDTO} (extends {@code BaseDTO}).
 *
 * Formula: {@code profitOrLoss = totalIncome - totalCosts}
 * where {@code totalCosts = SUM(cost.amount + cost.additionalCost)}.
 */
export interface ProfitCalculation {
  /** Shipment primary key — sourced from {@code BaseDTO.id} on the backend. */
  id: number;

  /** Human-readable shipment reference code (e.g. "SHP-2026-001"). */
  shipmentRef: string;

  /**
   * Date the shipment took place.
   * Serialised as an ISO-8601 date string (YYYY-MM-DD).
   */
  shipmentDate: string;

  /** Sum of all income amounts for the shipment. */
  totalIncome: number;

  /** Sum of all cost amounts (base + additional) for the shipment. */
  totalCosts: number;

  /**
   * Net profit or loss.
   * Positive → profitable shipment; negative → loss-making shipment.
   */
  profitOrLoss: number;

  /**
   * Timestamp when this calculation was performed.
   * Serialised as an ISO-8601 date-time string.
   */
  calculatedAt: string;
}
