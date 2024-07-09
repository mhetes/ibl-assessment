import { OpmetReportType } from "./OpmetReportType";

export interface OpmetResult {
    /**
     * List of identifiers of queries that produced this entry
     */
    refs?: string[];
    /**
     * Type of query from which the entry is originating (e.g. TAF_LONGTAF)
     */
    queryType: OpmetReportType;
    /**
     * Type of the report (e.g. MSG_LONGTAF)
     */
    reportType: string;
    /**
     *  Identifier of the report. Usually WMO/ICAO code for station or composite of AAZZZZ where AA is country code and ZZZZ is FIR/UIR or ATS.
     */
    stationId: string;
    /**
     * Report revision. Can be either COR or AMD.
     */
    revision?: 'COR' | 'AMD';
    /**
     * Place-ID for report station. If Place-ID is provided, stationId contains station identifier.
     */
    placeId?: string;
    /**
     * Text representation of report. For METAR/SPECI/TAF the prefixes METAR/TAF/COR/AMD are stripped, so the text starts with ICAO code of the station. Only exception is SPEC B/SPEC M where only COR is stripped.
     */
    text: string;
    /**
     * HTML representation of text with colour coding
     */
    textHTML?: string;
    /**
     * Reception time of report.
     */
    receptionTime?: string;
    /**
     *  Validity type of observation or issue time of report.
     */
    reportTime: string;
    /**
     * Start of validity range.
     */
    validFrom?: string;
    /**
     * End of validity range.
     */
    validEnd?: string;
}
