import React, {Component} from 'react';
import logo from '../resources/logo.png';

import {Image, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg={"dark"} variant={"dark"}>
                <Link to={""} className={"navbar-brand"}>
                    <Image src={logo} width={150} alt={"logo"}></Image>
                </Link>
                <Nav className={"mr-auto"}>
                    <Link to={"add"} className={"nav-link"}>Add Book</Link>
                    <Link to={"list"} className={"nav-link"}>Book List</Link>
                </Nav>
            </Navbar>
        );
    }
}