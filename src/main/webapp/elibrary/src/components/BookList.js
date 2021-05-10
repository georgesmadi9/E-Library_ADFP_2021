import React, {Component} from 'react';
import {Button, ButtonGroup, Card, Table} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faTrash} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ActionToast from "./actiontoast";
import {Link} from "react-router-dom";

export default class BookList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    componentDidMount() {
        this.findAllBooks();
    }

    findAllBooks = () => {
        axios.get("http://localhost:8080/api/Books")
            .then(response => response.data)
            .then((data) => {
                this.setState({books: data});
            })
    }

    deleteBook = (bookId) => {
        axios.delete("http://localhost:8080/api/Books/" + bookId)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 3000)
                    this.setState({
                        books: this.state.books.filter(book => book.id !== bookId)
                    })
                } else {
                    this.setState({"show": false})
                }
            })
    }

    render() {
        return (
            <>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <ActionToast show={this.state.show} message={"Book Successfully Deleted!"} type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"} style={{marginBottom: "5%"}}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faList}/>
                        {" "}Book List
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover variant={"dark"}>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Author</th>
                                <th>Rating /10</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.books.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="5">No Books Available.</td>
                                    </tr> :
                                    this.state.books.map((book) => (
                                        <tr key={book.id}>
                                            <td>{book.title}</td>
                                            <td>{book.description}</td>
                                            <td>{book.author}</td>
                                            <td>{book.rating}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Link to={"edit/" + book.id}
                                                          className={"btn btn-sm btn-outline-primary"}><FontAwesomeIcon
                                                        icon={faEdit}/></Link>{" "}
                                                    <Button size={"sm"} variant={"outline-danger"}
                                                            onClick={this.deleteBook.bind(this, book.id)}><FontAwesomeIcon
                                                        icon={faTrash}/></Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </>
        );
    }
}
