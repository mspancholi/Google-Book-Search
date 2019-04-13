import React, { Component } from "react";
import ActionBtn from "../components/ActionBtn";
import Img from "../components/Img";
import dbAPI from "../utils/dbAPI";
import searchAPI from "../utils/searchAPI";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Search extends Component {
    state = {
        booksAPI: [],
        //login: "mukti",//TODO this is going to have be dynamically set per user.
        search_text: ""
    };

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.userID !== prevProps.userID) {
            console.log("componentDidUpdate: userID: " + this.props.userID);
        }
    }

    // only want to show results that have valid fields
    validateData = item => {
        if (item.id &&
            item.volumeInfo.title &&
            item.volumeInfo.authors &&
            item.volumeInfo.description &&
            item.volumeInfo.imageLinks.smallThumbnail &&
            item.volumeInfo.infoLink) {
            return item;
        }
    }

    saveBook = book => {
        dbAPI.saveBook({
            login: this.props.userID,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks.smallThumbnail,
            link: book.volumeInfo.infoLink,
            googleId: book.id
        })
            .then(res => {
                console.log("saved book");
                alert("saved");
            })
            .catch(err => {
                console.log("saveBook:" + err);
                alert("Book Not Saved");
            });
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log("in handle form submit");
        if (this.state.search_text) {
            console.log("search text is not blank");
            searchAPI.searchBook(this.state.search_text)
                .then(res => {
                    var newItems = res.data.items.filter(this.validateData);
                    this.setState({ booksAPI: newItems })
                })
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">

                        <form>
                            <Input
                                value={this.state.search_text}
                                onChange={this.handleInputChange}
                                name="search_text"
                                placeholder="Enter Search Text"
                            />
                            <FormBtn
                                disabled={!(this.state.search_text)}
                                onClick={this.handleFormSubmit}
                            >
                                Search
                            </FormBtn>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12">
                        {this.state.booksAPI.length ? (
                            <List>
                                {this.state.booksAPI.map(book => (
                                    <ListItem key={book.id}>
                                        <Link to={"/books/" + book.id}>
                                            <strong>
                                                <a href={book.volumeInfo.link}>{book.volumeInfo.title}</a>
                                            </strong>
                                        </Link>
                                        <ActionBtn btn_text="Save" onClick={() => this.saveBook(book)} />

                                        <Row>
                                            <Col size="md-12" >
                                                by {book.volumeInfo.authors.join(", ")}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col size="md-2" >
                                                <Img image={book.volumeInfo.imageLinks.smallThumbnail} title={book.volumeInfo.title}></Img>
                                            </Col>
                                            <Col size="md-8">
                                                {book.volumeInfo.description}
                                            </Col>
                                        </Row>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h4>No Results to Display</h4>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Search;
