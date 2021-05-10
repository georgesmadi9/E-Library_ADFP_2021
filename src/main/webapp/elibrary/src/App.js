import {Col, Container, Row} from "react-bootstrap";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './components/Navbar';
import Welcome from './components/Welcome';
import Footer from "./components/Footer";
import Book from "./components/Book";
import BookList from "./components/BookList";

// Main app
function App() {
    const marginTop = {
        marginTop: "20px"
    };

    return (
        <Router>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} style={marginTop}>
                        <Switch>
                            <Route path={"/"} exact component={Welcome}></Route>
                            <Route path={"/add"} exact component={Book}></Route>
                            <Route path={"/edit/:id"} exact component={Book}></Route>
                            <Route path={"/list"} exact component={BookList}></Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Router>
    );
}

export default App;
