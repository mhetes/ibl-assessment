import React from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';

type OpmetFormProps = {
    disabled: boolean;
    onSubmit: (reports: ('METAR' | 'SIGMET' | 'TAF')[], stations?: string[], countries?: string[]) => void;
}

export const OpmetForm = ({...props}: React.PropsWithoutRef<OpmetFormProps>): JSX.Element => {
    const [ msgMetar, setMsgMetar ] = React.useState<boolean>(false);
    const [ msgSigmet, setMsgSigmet ] = React.useState<boolean>(false);
    const [ msgTaf, setMsgTaf ] = React.useState<boolean>(false);
    const [ stations, setStations ] = React.useState<string>('');
    const [ countries, setCountries ] = React.useState<string>('');
    const [ errMsg, setErrMsg ] = React.useState<string>('');
    const [ errStations, setErrStations ] = React.useState<string>('');
    const [ errCountries, setErrCountries ] = React.useState<string>('');

    /**
     * Button click function
     */
    const validateAndSubmitForm = React.useCallback(() => {
        // Arrays for submission
        const submitReports: ('METAR' | 'SIGMET' | 'TAF')[] = [];
        const submitStations: string[] = [];
        const submitCountries: string[] = [];
    
        // Variables for form validation
        let formValid = true;
        let newErrMsg = '';
        let newErrStations = '';
        let newErrCountries = '';
        
        // Reports: At least one report type must be selected
        if (msgMetar) submitReports.push('METAR');
        if (msgSigmet) submitReports.push('SIGMET');
        if (msgTaf) submitReports.push('TAF');
        if (submitReports.length === 0) {
            formValid = false;
            newErrMsg = 'At least one report type must be selected';
        }

        // Airports: 4-char words with upper case, ignore multichar spaces
        stations.split(' ').forEach((station) => {
            switch (station.length) {
                case 0:
                    break;
                case 4:
                    if (!submitStations.includes(station.toUpperCase()))
                        submitStations.push(station.toUpperCase());
                    break;
                default:
                    formValid = false;
                    newErrStations = 'Airport codes must have 4 characters';
            }
        });
        
        // Countries: 2-char words with upper case, ignore multichar spaces
        countries.split(' ').forEach((country) => {
            switch (country.length) {
                case 0:
                    break;
                case 2:
                    if (!submitCountries.includes(country.toUpperCase()))
                        submitCountries.push(country.toUpperCase());
                    break;
                default:
                    formValid = false;
                    newErrCountries = 'Country codes must have 2 characters';
            }
        });

        // At least one Airport or Country
        if (submitStations.length === 0 && submitCountries.length === 0) {
            formValid = false;
            newErrStations = 'At least one Airport or Country must be specified';
            newErrCountries = 'At least one Airport or Country must be specified';
        }

        // Complete validation
        setErrMsg(newErrMsg);
        setErrStations(newErrStations);
        setErrCountries(newErrCountries);

        // Submit form if valid
        if (formValid && typeof props.onSubmit === 'function')
            props.onSubmit(submitReports, submitStations, submitCountries);
    }, [msgMetar, msgSigmet, msgTaf, stations, countries, props]);

    return (
        <Form as={Container} fluid style={{marginLeft: 0, marginTop: '20pt', padding: '10pt' , border: '1px solid black', maxWidth: '500pt'}}>
            <Row>
                <Col>
                    <Form.Label>
                        Message Types:
                    </Form.Label>
                </Col>

                <Form.Group as={Col} controlId='formMsgType1'>
                    <Form.Check
                        type='checkbox'
                        label='METAR'
                        disabled={props.disabled}
                        checked={msgMetar}
                        onChange={(e) => setMsgMetar(e.currentTarget.checked)}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId='formMsgType2'>
                    <Form.Check
                        type='checkbox'
                        label='SIGMET'
                        disabled={props.disabled}
                        checked={msgSigmet}
                        onChange={(e) => setMsgSigmet(e.currentTarget.checked)}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId='formMsgType3'>
                    <Form.Check
                        type='checkbox'
                        label='TAF'
                        disabled={props.disabled}
                        checked={msgTaf}
                        onChange={(e) => setMsgTaf(e.currentTarget.checked)}
                    />
                </Form.Group>
            </Row>

            <Row>
                <Col>&nbsp;</Col>
                <Col xs={9} className='text-danger'>{errMsg}</Col>
            </Row>

            <Form.Group as={Row} controlId='formAirports'>
                <Col>
                    <Form.Label>
                        Airports:
                    </Form.Label>
                </Col>

                <Col xs={9}>
                    <Form.Control
                        type='text'
                        disabled={props.disabled}
                        value={stations}
                        onChange={(e) => setStations(e.currentTarget.value)}
                    />
                </Col>
            </Form.Group>

            <Row>
                <Col>&nbsp;</Col>
                <Col xs={9} className='text-danger'>{errStations}</Col>
            </Row>

            <Form.Group as={Row} controlId='formCountries'>
                <Col>
                    <Form.Label>
                        Countries:
                    </Form.Label>
                </Col>

                <Col xs={9}>
                    <Form.Control
                        type='text'
                        disabled={props.disabled}
                        value={countries}
                        onChange={(e) => setCountries(e.currentTarget.value)}
                    />
                </Col>
            </Form.Group>

            <Row>
                <Col>&nbsp;</Col>
                <Col xs={9} className='text-danger'>{errCountries}</Col>
            </Row>

            <Row>
                <Col style={{display: 'flex', justifyContent: 'right'}}>
                    <Button variant='secondary' disabled={props.disabled} onClick={() => validateAndSubmitForm()}>
                        Create Briefing
                    </Button>
                </Col>
            </Row>
        </Form>
    )
};
