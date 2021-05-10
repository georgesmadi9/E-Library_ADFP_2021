import React, {Component} from 'react';
import {Button, Card, Col, Form} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faPlusSquare, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import ActionToast from "./actiontoast";

export default class Book extends Component {

    initialState = {
        id: '',
        title: '',
        author: '',
        description: '',
        rating: ''
    };

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.method = "post";
        this.bookChange = this.bookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);
    }

    componentDidMount() {
        const bookId = +this.props.match.params.id;
        if (bookId) {
            this.findBookById(bookId);
        }
    }

    findBookById = (bookId) => {
        axios.get("http://localhost:8080/api/Books/" + bookId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        title: response.data.title,
                        author: response.data.author,
                        description: response.data.description,
                        rating: response.data.rating
                    });
                }
            }).catch((error) => {
            console.error("Error: " + error);
        })
    }

    submitBook = (event) => {
        event.preventDefault();

        const book = {
            title: this.state.title,
            author: this.state.author,
            description: this.state.description,
            rating: this.state.rating
        }

        axios.post("http://localhost:8080/api/Books", book)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true, "method": "post"});
                    setTimeout(() => this.setState({"show": false}), 3000)
                } else {
                    this.setState({"show": false})
                }
            });

        this.setState(this.initialState);
    };

    updateBook = event => {
        event.preventDefault();

        const book = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            description: this.state.description,
            rating: this.state.rating
        }

        axios.put("http://localhost:8080/api/Books/" + book.id, book)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true, "method": "put"});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    setTimeout(() => this.bookList(), 3000)
                } else {
                    this.setState({"show": false})
                }
            });

        this.setState(this.initialState);
    }

    bookChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    resetBook = () => {
        this.setState(() => this.initialState);
    };

    bookList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {title, author, description, rating} = this.state;

        return (
            <>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <ActionToast show={this.state.show}
                                 message={this.state.method === "put" ? "Book Successfully Updated!" : "Book Successfully Saved!"}
                                 type={"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon
                            icon={this.state.id ? faEdit : faPlusSquare}/> {this.state.id ? "Update Book" : "Add New Book"}
                    </Card.Header>
                    <Form onReset={this.resetBook}
                          onSubmit={this.state.id ? this.updateBook : this.submitBook}
                          id={"bookFormID"}>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridTitle"}>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control required autoComplete={"off"}
                                                  type="text" name={"title"}
                                                  value={title}
                                                  onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Book Title"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridAuthor"}>
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control required autoComplete={"off"}
                                                  type="text" name={"author"}
                                                  value={author}
                                                  onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Book Author"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridDescription"}>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control required autoComplete={"off"}
                                                  type="text" name={"description"}
                                                  value={description}
                                                  onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Book Description"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridRating"}>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control required autoComplete={"off"}
                                                  type="text" name={"rating"}
                                                  value={rating}
                                                  onChange={this.bookChange}
                                                  className={"bg-dark text-white"}
                                                  placeholder="Enter Book Rating / 10"/>
                                </Form.Group>
                            </Form.Row>

                            <Card.Footer style={{"textAlign": "right"}}>
                                <Button size={"sm"} variant="success" type="submit">
                                    <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Update" : "Save"}
                                </Button>{" "}
                                <Button size={"sm"} variant="info" type="reset">
                                    <FontAwesomeIcon icon={faUndo}/>
                                    {" "}Reset
                                </Button>{" "}
                                <Button size={"sm"} variant="info" type="button" onClick={this.bookList.bind()}>
                                    <FontAwesomeIcon icon={faList}/>
                                    {" "}Book List
                                </Button>
                            </Card.Footer>
                        </Card.Body>
                    </Form>
                </Card>
            </>
        )
            ;
    }
}
