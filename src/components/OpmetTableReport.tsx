import React from 'react';
import { v4 } from 'uuid';
import { formatDate, parseReportFragmets } from '../api/UiHelper';
import type { OpmetResult } from '../model/OpmetResult';
import { EFragmentType } from '../model/EFragmentType';

type OpmetTableReportProps = {
    report: OpmetResult;
};

const formatReport = (text: string): JSX.Element => {
    const fragments = parseReportFragmets(text);
    const elements: JSX.Element[] = [];

    fragments.forEach((fragment) => {
        switch (fragment.type) {
            case EFragmentType.normal:
                elements.push(<React.Fragment key={v4()}>{fragment.text}</React.Fragment>);
                break;
            case EFragmentType.red:
                elements.push(<span key={v4()} className='text-danger'>{fragment.text}</span>);
                break;
            case EFragmentType.blue:
                elements.push(<span key={v4()} className='text-primary'>{fragment.text}</span>);
                break;
            case EFragmentType.line:
                elements.push(<br key={v4()}/>);
        }
    });

    return (
        <>
            {elements}
        </>
    );
}

export const OpmetTableReport = ({...props}: React.PropsWithoutRef<OpmetTableReportProps>): JSX.Element => {
    return (
        <tr>
            <td>{props.report.queryType}</td>
            <td>{formatDate(props.report.reportTime)}</td>
            <td>{formatReport(props.report.text)}</td>
        </tr>
    )
};
