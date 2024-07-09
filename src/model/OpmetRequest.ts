import { OpmetReportType } from "./OpmetReportType";
import { OpmetTimeMode } from "./OpmetTimeMode";

/**
 * Opmet Request
 */
export interface OpmetRequest {
    /**
     * Identifier of query. Used to match results to queries from which they are originating.
     */
    id?: string;
    /**
     * Whether to colorize TAF/METAR reports. By default enabled, however may be disabled to improve
     */
    colorize?: boolean;
    /**
     * List of OPMET data types to be queried. The following OPMET data types are available:
     * SYNOP: SYNOP reports.
     * METAR: METAR reports.
     * SPECI: SPECI reports.
     * METAR_SPECI: METAR/SPECI reports, SPECI overrides METAR.
     * TAF: TAF (FC) reports.
     * LONGTAF: TAF (FT) reports.
     * RAFOR: RAFOR reports.
     * TAF_LONGTAF: TAF/LONGTAF reports.
     * TAF_LONGTAF_RAFOR: TAF/LONGTAF/RAFOR reports.
     * SIGMET: SIGMET (WS) reports.
     * SIGMET_VA: Volcanic Ash SIGMET (WV) reports.
     * SIGMET_TC: Tropical Cyclone SIGMET (WC) reports.
     * SIGMET_ALL: All SIGMETs (WS/WV/WC).
     * AIRMET: AIRMET (WA) reports.
     * GAMET: GAMET (FA) reports.
     * VAA: Volcanic Ash Advisory (FV) reports (Available only for VAA centres).
     * TCA: Tropical Cyclone Advisory (FK) reports (Available only for FCA centres).
     * AIREP_SPECIAL: Airep Special (available only for FIR/country).
     * TROPICAL_CYCLONE_WARNING: Tropical Cyclone Warning (WT).
     * AD_WRNG: Aerodrome Warning.
     * WS_WRNG: Wind Shear Warning
     */
    reportTypes: OpmetReportType[];
    /**
     * List of place catalogue identifiers.
     */
    places?: string[];
    /**
     * List of either WMO or ICAO station identifiers. Please make sure you are passing correct type of identifier for query or both.
     */
    stations?: string[];
    /**
     * List of FIR identifiers.
     */
    firs?: string[];
    /**
     * List of country identifiers.
     */
    countries?: string[];
    /**
     * Time specification for query. By default using "current". See the following table for options.
     * current: Current data that should be operationally used.
     * valid: Valid data at the moment. For observations using
     * default: validity period, TAF or warnings must be valid at specified point in time (timeReference). If timeReference is not specified, query is performed for current time.
     * reception-time: Historical reconstruction of "current data" for given point in time (timeReference). Only reports that were available at the specified time are queried.
     * validity-or-issue-time: Historical reconstruction of "current data" for given point in time (timeReference). Only reports which validity or issue time are prior the specified time are queried. range-reception-time Query reports received within time range. The query works only if there is no significant difference between validity/issue time and reception time.
     * range-validity-or-issue-time: Query reports with validity or issue time within time range.
     * range-reception-time-relevant-validity: Query reports received within time range. Furthermore validity period end must be behind start time. The query works only if there is no significant difference between validity/issue time and reception time.
     * range-validity-or-issue-time-relevant-validity: Query reports with validity or issue time within time range. Furthermore validity period end must be behind start time.
     * range-validity-intersects: Query reports which validity range intersects with specified time window.
     */
    timeMode?: OpmetTimeMode;
    /**
     *  Time reference for valid, reception-time and validity-or-issue-time mode. Value must be formated as ISO 8601 (e.g. 2013-05-15T00:00Z).
     */
    timeReference?: string;
    /**
     * Start of time window for range queries. Value must be formated as ISO 8601 (e.g. 2013-05-15T00:00Z).
     */
    timeRangeStart?: string;
    /**
     *  End of time window for range queries. Value must be formated as ISO 8601 (e.g. 2013-05-15T00:00Z).
     */
    timeRangeEnd?: string;
    /**
     * Aggregation style to be used when collecting reports within specified time period. Meaningful only for time range queries.
     */
    aggregationStyle?: string;
}
