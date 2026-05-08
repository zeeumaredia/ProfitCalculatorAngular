import { Cost } from './cost.model';
import { Income } from './income.model';

/**
 * Represents a logistics shipment with its associated incomes and costs.
 * Maps directly to the backend {@code ShipmentDTO}.
 */
export interface Shipment {
  /** Database identifier — absent when creating a new shipment. */
  id?: number;

  /** Unique business reference code (e.g. "SHP-2026-001"). */
  shipmentRef: string;

  /** Optional human-readable description of the shipment. */
  description?: string;

  /**
   * Date the shipment took place.
   * Serialised as an ISO-8601 date string (YYYY-MM-DD).
   */
  shipmentDate: string;

  /** List of income entries for this shipment. */
  incomes: Income[];

  /** List of cost entries for this shipment. */
  costs: Cost[];

  /**
   * Persisted profit or loss for this shipment.
   * Computed as totalIncome − totalCosts (including additionalCost).
   * Null until first calculated; updated on every create/update/calculate.
   */
  profitLoss?: number;
}
