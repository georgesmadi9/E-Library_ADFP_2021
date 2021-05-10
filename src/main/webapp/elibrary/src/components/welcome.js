import React, {Component} from 'react';
import {Jumbotron} from "react-bootstrap";

export default class Welcome extends Component {
    render() {
        return (
            <Jumbotron className={"bg-dark text-white"}>
                <h1>Welcome to 3-B00KS</h1>
                <blockquote className={"blockquote mb-0"}>
                    <p>
                        All you can read, in one place.
                    </p>
                </blockquote>
            </Jumbotron>
        );
    }
}