/**
 * Union type of all valid cost type identifiers as defined in the backend
 * {@code cost_type} reference table.
 *
 * These values are static reference data seeded at startup; there is no
 * dedicated REST endpoint to fetch them, so they are maintained here as a
 * typed constant (see {@link COST_TYPES}).
 */
export type CostTypeName = 'FUEL' | 'CUSTOMS' | 'LABOR' | 'TOLL' | 'STORAGE';

/**
 * Display labels for each {@link CostTypeName}, used to populate dropdowns
 * and result tables in the UI.
 */
export const COST_TYPES: { value: CostTypeName; label: string }[] = [
  { value: 'FUEL',    label: 'Fuel'    },
  { value: 'CUSTOMS', label: 'Customs' },
  { value: 'LABOR',   label: 'Labor'   },
  { value: 'TOLL',    label: 'Toll'    },
  { value: 'STORAGE', label: 'Storage' },
];

/**
 * Represents a single cost entry associated with a shipment.
 * Maps directly to the backend {@code CostDTO}.
 */
export interface Cost {
  /** Database identifier — absent when creating a new entry. */
  id?: number;

  /** Base cost amount (must be zero or greater). */
  amount: number;

  /** Optional surcharge on top of the base amount (defaults to 0). Must be zero or greater. */
  additionalCost: number;

  /**
   * Cost category — must match a value in the backend {@code cost_type} table.
   * See {@link CostTypeName} for valid values.
   */
  costTypeName: CostTypeName;
}
