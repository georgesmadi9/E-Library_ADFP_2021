import React, {Component} from 'react';
import {Button, ButtonGroup, Card, Dropdown, DropdownButton, FormControl, InputGroup, Table} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faList, faSearch, faTimes, faTrash} from "@fortawesome/free-solid-svg-icons";
import ActionToast from "./ActionToast";
import {Link} from "react-router-dom";
import DropdownItem from "react-bootstrap/DropdownItem";
import axios from "axios";

export default class BookList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            show: false,
            search: "",
            dropdownValue: "Filter"
        };
    }

    componentDidMount() {
        this.findAllBooks();
    }

    // Get Request (everthing) /api/Books
    findAllBooks = () => {
        fetch("http://localhost:8080/api/Books")
            .then(response => response.json())
            .then((data) => {
                this.setState({books: data});
            })
    }

    // DELETE Request with Fetch API but not refreshing the page for no reason
    /*deleteBook = (bookId) => {
        fetch("http://localhost:8080/api/Books/"+bookId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then((book) => {
            if (book) {
                this.setState({"show": true});
                setTimeout(() => this.setState({"show": false}), 3000)
                this.setState({
                    books: this.state.books.filter(book => book.id !== bookId)
                })
            } else {
                this.setState({"show": false})
            }
        })
    }*/

    // DELETE Request with axios (works)
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

    // Search by Title using the request : /api/Books?title={:title}
    searchByTitle = () => {
        fetch("http://localhost:8080/api/Books?title=" + this.state.search)
            .then(response => response.json())
            .then((data) => {
                this.setState({books: data});
            })
    }

    // Search by Author using the request : /api/Books?author={:author}
    searchByAuthor = () => {
        fetch("http://localhost:8080/api/Books?author=" + this.state.search)
            .then(response => response.json())
            .then((data) => {
                this.setState({books: data});
            })
    }

    // Search by Rating using the request : /api/Books?rating={:number}
    searchByRating = () => {
        fetch("http://localhost:8080/api/Books?rating=" + this.state.search)
            .then(response => response.json())
            .then((data) => {
                this.setState({books: data});
            })
    }

    // Search by Author & Rating using the request : /api/Books?author={:author}&rating={:number}
    searchByAuthorAndRating = () => {
        const search = this.state.search;
        const regex1 = /.*\|/;
        const regex2 = /[0-9]+\.?[0-9]*/;
        const param1 = regex1.exec(search);
        const param2 = regex2.exec(search);
        fetch("http://localhost:8080/api/Books?author=" + param1[0].substring(0, param1[0].length - 1) + "&rating=" + parseFloat(param2[0]))
            .then(response => response.json())
            .then((data) => {
                this.setState({books: data})
            })
    }

    // Function to use the correct search function
    // if no method was chosen or the search term is empty
    // we use the GET Request to get everything /api/Books
    searchMethod = () => {
        if (this.state.dropdownValue === "Title") {
            this.searchByTitle();
        } else if (this.state.dropdownValue === "Author") {
            this.searchByAuthor();
        } else if (this.state.dropdownValue === "Rating") {
            this.searchByRating();
        } else if (this.state.dropdownValue === "Author & Rating (A|R)") {
            this.searchByAuthorAndRating();
        } else {
            this.findAllBooks();
        }
    }

    // Save the search value
    searchChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // Erase search bar
    cancelSearch = () => {
        this.setState({"search": ""})
    }

    // Change the "dropdownValue" from the state to select the search method
    handleSelect = (e) => {
        this.setState({"dropdownValue": e})
    }

    render() {
        return (
            <>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <ActionToast show={this.state.show} message={"Book Successfully Deleted!"} type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"} style={{marginBottom: "5%"}}>
                    <Card.Header>
                        <div style={{"float": "left"}}>
                            <FontAwesomeIcon icon={faList}/> Books List
                        </div>
                        <div style={{"float": "right"}}>
                            <InputGroup size={"sm"}>
                                <DropdownButton
                                    size={"sm"}
                                    title={this.state.dropdownValue}
                                    as={InputGroup.Prepend}
                                    variant={"outline-secondary"}
                                    id={"dropdown-filter"}>
                                    <DropdownItem
                                        as={Button}
                                        onClick={() => this.handleSelect("Title")}>
                                        Title
                                    </DropdownItem>
                                    <DropdownItem
                                        as={Button}
                                        onClick={() => this.handleSelect("Author")}>
                                        Author
                                    </DropdownItem>
                                    <DropdownItem
                                        as={Button}
                                        onClick={() => this.handleSelect("Rating")}>
                                        Rating
                                    </DropdownItem>
                                    <Dropdown.Divider/>
                                    <DropdownItem
                                        as={Button}
                                        onClick={() => this.handleSelect("Author & Rating (A|R)")}>
                                        Author & Rating (A|R)
                                    </DropdownItem>
                                </DropdownButton>
                                <FormControl
                                    placeholder={"Search ..."}
                                    name={"search"}
                                    value={this.state.search}
                                    className={"bg-dark text-white"}
                                    style={{border: "1px solid #17A288"}}
                                    onChange={this.searchChange}
                                />
                                <InputGroup.Append>
                                    <Button size={"sm"} variant={"outline-info"} type={"button"}
                                            onClick={this.searchMethod}>
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </Button>
                                    <Button
                                        size={"sm"}
                                        variant={"outline-danger"}
                                        type={"button"}
                                        onClick={this.cancelSearch}
                                    >
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover variant={"dark"}>
                            <thead style={{textAlign: "center", verticalAlign: "middle"}}>
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
