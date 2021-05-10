import React, {Component} from 'react';
import {Button, Card, Col, Form} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faPlusSquare, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";

import ActionToast from "./ActionToast";

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

    // Function associated to the GET Request /api/Books/:id
    findBookById = (bookId) => {
        fetch("http://localhost:8080/api/Books/" + bookId)
            .then(response => response.json())
            .then(book => {
                if (book) {
                    this.setState({
                        id: book.id,
                        title: book.title,
                        author: book.author,
                        description: book.description,
                        rating: book.rating
                    });
                }
            }).catch((error) => {
            console.error("Error: " + error);
        })
    }

    // Function associated to the POST Request /api/Books
    // Creates a new book and adds it to the database
    submitBook = (event) => {
        event.preventDefault();

        const book = {
            title: this.state.title,
            author: this.state.author,
            description: this.state.description,
            rating: this.state.rating
        }

        const headers = new Headers();
        headers.append("Content-Type", "application/json")

        fetch("http://localhost:8080/api/Books", {
            method: "POST",
            body: JSON.stringify(book),
            headers
        })
            .then(response => response.json())
            .then((book) => {
                if (book) {
                    this.setState({"show": true, "method": "post"});
                    setTimeout(() => this.setState({"show": false}), 3000)
                } else {
                    this.setState({"show": false})
                }
            });

        this.setState(this.initialState);
    };

    // Function associated to the PUT Request /api/Books/:id
    // Edit an instance of books
    updateBook = event => {
        event.preventDefault();

        const book = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            description: this.state.description,
            rating: this.state.rating
        }

        const headers = new Headers();
        headers.append("Content-Type", "application/json")

        fetch("http://localhost:8080/api/Books/" + book.id, {
            method: "PUT",
            body: JSON.stringify(book),
            headers
        })
            .then(response => response.json())
            .then(book => {
                if (book) {
                    this.setState({"show": true, "method": "put"});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    setTimeout(() => this.bookList(), 3000)
                } else {
                    this.setState({"show": false})
                }
            });

        this.setState(this.initialState);
    }

    // Updating the state with the input from the form
    bookChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    // Reset all the fields in the forms
    resetBook = () => {
        this.setState(() => this.initialState);
    };

    // By pressing the Book List button, redirects to the Book List tab
    // After editing a book entry, redirects to the Book List tab
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
