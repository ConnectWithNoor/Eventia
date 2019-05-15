import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap'

import Timer from './Timer'

const EventInfo = () => {
    return (
        <React.Fragment>
            <Container>
                <Row className="align-items-center justify-content-center mt-5">
                    <Col sm={12} className="text-center">
                        <h1 className="text-h1">About Eventia</h1>
                    </Col>
                </Row>
                <Row className="justify-content-start">
                    <Col sm={10} md={9} lg={8}>
                        <p className="text-p-eventInfo text-uppercase eventInfo-mr">Launching in</p>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-3">
                    <Timer />
                </Row>

                <Row className="align-items-center justify-content-center mt-3">
                    <Col sm={10} md={9} lg={8}>
                        <p className="text-p-eventInfo">It’s a terrific blend of computer science, electrical and electronics engineering, business studies arts & literature and which have become the need of industries today. In today’s cut-throat competitions, speed and efficiency of software backed by a blend of engineering technologies, an engineer's analytical ability and a businessman's sound knowledge of the market create products which comply with the needs of the business. This blend is sure to provide extremely important impetus to the efforts of the young people behind the products.</p>
                    </Col>
                </Row >
                <Row className="align-items-center justify-content-center mt-3">
                    <Col sm={10} md={9} lg={8}>
                        <p className="text-p-eventInfo"><span class ="text-primary font-weight-bold">Eventia</span> a step towards further enforcing the commitment of FAST for the development of Information Technology and Engineering Science related fields in Pakistan.</p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                <Button size="lg" href="/register" variant="primary" className="px-4 py-3">
                    Get Your Ticket
                </Button>
                </Row>
            </Container>
        </React.Fragment >
    );
};

export default EventInfo;       