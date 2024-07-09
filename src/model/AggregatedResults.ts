import { OpmetResult } from './OpmetResult';

/**
 * Opmet Aggregated results for UI rendering
 */
export interface AggregatedResults {
    [station: string]: OpmetResult[];
}
