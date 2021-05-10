import React, {Component} from 'react';
import {Col, Container, Navbar} from "react-bootstrap";

export default class Footer extends Component {
    render() {
        let fullyear = new Date().getFullYear();

        return (
            <Navbar fixed={"bottom"} bg={"dark"} variant={"dark"}>
                <Container>
                    <Col lg={12} className={"text-center text-muted"}>
                        <div>
                            {fullyear}-{fullyear + 1}, All Rights Reserved by 3-B00KS
                        </div>
                    </Col>
                </Container>
            </Navbar>
        );
    }
}