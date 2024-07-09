import fetch from 'jest-fetch-mock';
import { OpmetService } from './OpmetService';

fetch.enableMocks();

describe('OpmetService tests', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('calls opmet service', async () => {
        const expected = {
            "error": null,
            "id": "01948c0a-e52a-4566-8348-a9e23b63f7f0",
            "result": [
                {
                    "placeId": "icao:LZIB",
                    "queryType": "METAR",
                    "receptionTime": "2024-07-09T20:06:00.766Z",
                    "refs": [
                        "01948c0a-e52a-4566-8348-a9e23b63f7f0"
                    ],
                    "reportTime": "2024-07-09T20:00:00Z",
                    "reportType": "MSG_METAR",
                    "stationId": "LZIB",
                    "text": "LZIB 092000Z 03004KT CAVOK 27/21 Q1017 NOSIG=",
                    "textHTML": "LZIB 092000Z 03004KT <font color=\"blue\">CAVOK</font> 27/21 Q1017 NOSIG="
                },
                {
                    "placeId": "icao:LZKZ",
                    "queryType": "METAR",
                    "receptionTime": "2024-07-09T20:06:00.766Z",
                    "refs": [
                        "01948c0a-e52a-4566-8348-a9e23b63f7f0"
                    ],
                    "reportTime": "2024-07-09T20:00:00Z",
                    "reportType": "MSG_METAR",
                    "stationId": "LZKZ",
                    "text": "LZKZ 092000Z 36007KT CAVOK 26/20 Q1018 NOSIG=",
                    "textHTML": "LZKZ 092000Z 36007KT <font color=\"blue\">CAVOK</font> 26/20 Q1018 NOSIG="
                },
                {
                    "placeId": "icao:LZPP",
                    "queryType": "METAR",
                    "receptionTime": "2024-07-09T20:08:00.569Z",
                    "refs": [
                        "01948c0a-e52a-4566-8348-a9e23b63f7f0"
                    ],
                    "reportTime": "2024-07-09T20:00:00Z",
                    "reportType": "MSG_METAR",
                    "stationId": "LZPP",
                    "text": "LZPP 092000Z 01003KT 340V040 CAVOK 25/21 Q1017=",
                    "textHTML": "LZPP 092000Z 01003KT 340V040 <font color=\"blue\">CAVOK</font> 25/21 Q1017="
                },
                {
                    "placeId": "icao:LZTT",
                    "queryType": "METAR",
                    "receptionTime": "2024-07-09T20:06:00.766Z",
                    "refs": [
                        "01948c0a-e52a-4566-8348-a9e23b63f7f0"
                    ],
                    "reportTime": "2024-07-09T20:00:00Z",
                    "reportType": "MSG_METAR",
                    "stationId": "LZTT",
                    "text": "LZTT 092000Z 28002KT 9999 FEW030 20/19 Q1022=",
                    "textHTML": "LZTT 092000Z 28002KT <font color=\"blue\">9999</font> FEW030 20/19 Q1022="
                },
                {
                    "placeId": "icao:LZZI",
                    "queryType": "METAR",
                    "receptionTime": "2024-07-09T20:08:00.569Z",
                    "refs": [
                        "01948c0a-e52a-4566-8348-a9e23b63f7f0"
                    ],
                    "reportTime": "2024-07-09T20:00:00Z",
                    "reportType": "MSG_METAR",
                    "stationId": "LZZI",
                    "text": "LZZI 092000Z 14003KT CAVOK 23/21 Q1019=",
                    "textHTML": "LZZI 092000Z 14003KT <font color=\"blue\">CAVOK</font> 23/21 Q1019="
                }
            ]
        };
        fetch.mockResponseOnce(JSON.stringify(expected));
        const actual = await OpmetService.query({
            id: '01948c0a-e52a-4566-8348-a9e23b63f7f0',
            reportTypes: ['METAR'],
            countries: ['SQ'],
        });
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual('https://ogcie.iblsoft.com/ria/opmetquery');
    });
});