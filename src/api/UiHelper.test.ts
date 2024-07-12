import { EFragmentType } from '../model/EFragmentType';
import { formatDate, parseReportFragmets } from './UiHelper';

describe('Text UIHelper', () => {
    it('tests formatDate', () => {
        const res = formatDate('2024-07-12T15:52:50.650Z');
        expect(res).toEqual('12. 7. 2024 17:52:50');
    });

    it('tests parseReportFragmets', () => {
        const text = 'OPLA 121525Z 32006KT 4000 FU SCT040 BKN100 25/22 Q0997 TEMPO\r\r\n' + 
                     '    15015G30KT 1500 TSRA FEW030CB RMK QFE972 A29.45=';
        const expected = [
            { type: EFragmentType.normal, text: 'OPLA 121525Z 32006KT 4000 FU ' },
            { type: EFragmentType.red, text: 'SCT040' },
            { type: EFragmentType.normal, text: ' ' },
            { type: EFragmentType.red, text: 'BKN100' },
            { type: EFragmentType.normal, text: ' 25/22 Q0997 TEMPO' },
            { type: EFragmentType.line, text: '' },
            { type: EFragmentType.normal, text: ' \u00A0 \u00A015015G30KT 1500 TSRA ' },
            { type: EFragmentType.blue, text: 'FEW030CB' },
            { type: EFragmentType.normal, text: ' RMK QFE972 A29.45=' },
        ];
        const res = parseReportFragmets(text);
        expect(res).toEqual(expected);
    });
});