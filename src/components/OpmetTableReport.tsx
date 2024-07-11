import React from 'react';
import type { OpmetResult } from '../model/OpmetResult';

type OpmetTableReportProps = {
    report: OpmetResult;
};

const formatDate = (date: string): string => {
    return `${date.substring(8, 10)}.${date.substring(5, 7)}.${date.substring(0, 4)} ${date.substring(11, 19)}`;
};

const getReportHtml = (text: string, textHTML?: string): string => {
    const html = textHTML ?? text;
    return html.replace(/\r/g, '').replace(/\n{2,}/g, '\n').replace(/\n/g, '<br/>').replace(/(<br\/>){2,}/g, '<br/>').replace(/ {2,}/g, ' &nbsp;&nbsp;&nbsp;');
};

export const OpmetTableReport = ({...props}: React.PropsWithoutRef<OpmetTableReportProps>): JSX.Element => {
    return (
        <tr>
            <td>{props.report.reportType}</td>
            <td>{formatDate(props.report.reportTime)}</td>
            <td dangerouslySetInnerHTML={{__html: getReportHtml(props.report.text, props.report.textHTML)}} />
        </tr>
    )
};
