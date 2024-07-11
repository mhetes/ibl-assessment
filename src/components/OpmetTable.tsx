import React from 'react';
import { Table } from 'react-bootstrap';
import { OpmetTableStation } from './OpmetTableStation';
import type { AggregatedResults } from '../model/AggregatedResults';

type OpmetTableProps = {
    data: AggregatedResults;
    error: string | null;
}

export const OpmetTable = ({...props}: React.PropsWithoutRef<OpmetTableProps>): JSX.Element => {
    return (
        <div style={{ marginTop: '20pt'}}>
            <span style={{ fontSize: '24pt', fontWeight: 'bold', color: 'red' }}>{props.error}</span>
            <Table striped bordered hover>
                { Object.keys(props.data).map((station) =>
                    <OpmetTableStation key={'opmet_' + station} station={station} reports={props.data[station]} />)
                }
            </Table>
        </div>
    )
};
