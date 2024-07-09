import { v4 } from 'uuid';
import { OpmetService } from './OpmetService';
import type { OpmetReportType } from '../model/OpmetReportType';
import type { OpmetRequest } from '../model/OpmetRequest';
import type { AggregatedResults } from '../model/AggregatedResults';

/**
 * Query Opmet Service and returns Aggregated response for UI
 * @param reports List of Opmet reports
 * @param stations List of Airports
 * @param countries List of Countries
 * @param forceId Force specific ID to request
 * @returns Aggregated Opmet Response
 */
const query = async (
    reports: OpmetReportType[],
    stations?: string[],
    countries?: string[],
    forceId?: string
): Promise<AggregatedResults> => {
    // Create OpmetRequest from params
    const req: OpmetRequest = {
        id: forceId ?? v4(),
        reportTypes: reports,
        stations,
        countries,
    };
    // Get OpmetResults
    const res = await OpmetService.query(req);
    // Create Aggregated Result
    const agg: AggregatedResults = {};
    res.forEach((r) => {
        if (!agg[r.stationId])
            agg[r.stationId] = [];
        agg[r.stationId].push(r);
    });
    return agg;
};

/**
 * Opmet Service Helper for UI
 */
export const OpmetHelper = {
    query,
}
