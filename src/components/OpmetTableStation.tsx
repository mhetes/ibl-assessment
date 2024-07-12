import React from 'react';
import { OpmetTableReport } from './OpmetTableReport';
import type { OpmetResult } from '../model/OpmetResult';

type OpmetTableStationProps = {
    station: string;
    reports: OpmetResult[];
};

export const OpmetTableStation = ({...props}: React.PropsWithoutRef<OpmetTableStationProps>): JSX.Element => {
    return (
        <>
            <thead>
                <tr>
                    <th colSpan={3}>{props.station}</th>
                </tr>
            </thead>
            <tbody>
                { props.reports.map((report, i) =>
                    <OpmetTableReport key={'opmet_' + props.station + report.reportType + i} report={report} /> )
                }
            </tbody>
        </>
    )
};
