import * as Opmet from './OpmetService';
import type { OpmetRequest } from '../model/OpmetRequest';
import type { OpmetResult } from '../model/OpmetResult';
import { OpmetHelper } from './OpmetHelper';

const fallbackUuid = 'a7b5e3a9-b28b-4dbb-85b4-c76aaf4c81ad';

jest.mock('uuid', () => { return { v4: () => fallbackUuid }; });

describe('OpmetHelper tests', () => {
    let opmetQuerySpy: jest.SpyInstance<Promise<OpmetResult[]>, [OpmetRequest]>;
    let queryResponse: OpmetResult[];

    beforeEach(() => {
        opmetQuerySpy = jest.spyOn(Opmet.OpmetService, 'query');
        opmetQuerySpy.mockImplementation(() => Promise.resolve(queryResponse));
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('query with station', async () => {
        queryResponse = [
            {
                "placeId": "icao:LKPR",
                "queryType": "METAR",
                "receptionTime": "2024-07-09T18:35:30.435Z",
                "refs": [fallbackUuid],
                "reportTime": "2024-07-09T18:30:00Z",
                "reportType": "MSG_METAR",
                "stationId": "LKPR",
                "text": "LKPR 091830Z 10006KT CAVOK 28/18 Q1017 NOSIG=",
                "textHTML": "LKPR 091830Z 10006KT <font color=\"blue\">CAVOK</font> 28/18 Q1017 NOSIG="
            }
        ];
        const res = await OpmetHelper.query(['METAR'], ['LKPR']);
        expect(res).toEqual({ LKPR: queryResponse });
        expect(opmetQuerySpy).lastCalledWith({
            id: fallbackUuid,
            reportTypes: ['METAR'],
            stations: ['LKPR'],
        });
    });

    it('query with country', async () => {
        queryResponse = [
            {
                "placeId": "icao:LZIB",
                "queryType": "METAR",
                "receptionTime": "2024-07-09T19:06:00.181Z",
                "refs": [fallbackUuid],
                "reportTime": "2024-07-09T19:00:00Z",
                "reportType": "MSG_METAR",
                "stationId": "LZIB",
                "text": "LZIB 091900Z 01005KT CAVOK 28/21 Q1016 NOSIG=",
                "textHTML": "LZIB 091900Z 01005KT <font color=\"blue\">CAVOK</font> 28/21 Q1016 NOSIG="
            },
            {
                "placeId": "icao:LZKZ",
                "queryType": "METAR",
                "receptionTime": "2024-07-09T19:06:00.181Z",
                "refs": [fallbackUuid],
                "reportTime": "2024-07-09T19:00:00Z",
                "reportType": "MSG_METAR",
                "stationId": "LZKZ",
                "text": "LZKZ 091900Z 36006KT CAVOK 26/19 Q1018 NOSIG=",
                "textHTML": "LZKZ 091900Z 36006KT <font color=\"blue\">CAVOK</font> 26/19 Q1018 NOSIG="
            },
        ];
        const res = await OpmetHelper.query(['METAR'], undefined, ['SQ']);
        expect(res).toEqual({ LZIB: [queryResponse[0]], LZKZ: [queryResponse[1]] });
        expect(opmetQuerySpy).lastCalledWith({
            id: fallbackUuid,
            reportTypes: ['METAR'],
            countries: ['SQ'],
        });
    });

    it('query with station and country', async () => {
        queryResponse = [
            {
                "placeId": "icao:LZIB",
                "queryType": "METAR",
                "receptionTime": "2024-07-09T19:06:00.181Z",
                "refs": [
                    "xxx"
                ],
                "reportTime": "2024-07-09T19:00:00Z",
                "reportType": "MSG_METAR",
                "stationId": "LZIB",
                "text": "LZIB 091900Z 01005KT CAVOK 28/21 Q1016 NOSIG=",
                "textHTML": "LZIB 091900Z 01005KT <font color=\"blue\">CAVOK</font> 28/21 Q1016 NOSIG="
            },
            {
                "placeId": "icao:LZKZ",
                "queryType": "METAR",
                "receptionTime": "2024-07-09T19:06:00.181Z",
                "refs": [
                    "xxx"
                ],
                "reportTime": "2024-07-09T19:00:00Z",
                "reportType": "MSG_METAR",
                "stationId": "LZKZ",
                "text": "LZKZ 091900Z 36006KT CAVOK 26/19 Q1018 NOSIG=",
                "textHTML": "LZKZ 091900Z 36006KT <font color=\"blue\">CAVOK</font> 26/19 Q1018 NOSIG="
            },
            {
                "placeId": "icao:LKPR",
                "queryType": "METAR",
                "receptionTime": "2024-07-09T18:35:30.435Z",
                "refs": [fallbackUuid],
                "reportTime": "2024-07-09T18:30:00Z",
                "reportType": "MSG_METAR",
                "stationId": "LKPR",
                "text": "LKPR 091830Z 10006KT CAVOK 28/18 Q1017 NOSIG=",
                "textHTML": "LKPR 091830Z 10006KT <font color=\"blue\">CAVOK</font> 28/18 Q1017 NOSIG="
            }
        ];
        const res = await OpmetHelper.query(['METAR'], ['LKPR'], ['SQ']);
        expect(res).toEqual({ LZIB: [queryResponse[0]], LZKZ: [queryResponse[1]], LKPR: [queryResponse[2]] });
        expect(opmetQuerySpy).lastCalledWith({
            id: fallbackUuid,
            reportTypes: ['METAR'],
            stations: ['LKPR'],
            countries: ['SQ'],
        });
    });

    it('query with station and specified id', async () => {
        const myUuid = 'b300153e-e39b-40ab-b895-d09b680f5fa8';
        queryResponse = [
            {
                "placeId": "icao:LKPR",
                "queryType": "METAR",
                "receptionTime": "2024-07-09T18:35:30.435Z",
                "refs": [myUuid],
                "reportTime": "2024-07-09T18:30:00Z",
                "reportType": "MSG_METAR",
                "stationId": "LKPR",
                "text": "LKPR 091830Z 10006KT CAVOK 28/18 Q1017 NOSIG=",
                "textHTML": "LKPR 091830Z 10006KT <font color=\"blue\">CAVOK</font> 28/18 Q1017 NOSIG="
            }
        ];
        const res = await OpmetHelper.query(['METAR'], ['LKPR'], undefined, myUuid);
        expect(res).toEqual({ LKPR: queryResponse });
        expect(opmetQuerySpy).lastCalledWith({
            id: myUuid,
            reportTypes: ['METAR'],
            stations: ['LKPR'],
        });
    });
});