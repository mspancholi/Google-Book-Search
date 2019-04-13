import React, { Component } from "react";
import ActionBtn from "../components/ActionBtn";
import Img from "../components/Img";
import dbAPI from "../utils/dbAPI";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

class Books extends Component {
  state = {
    books: []
    //login: "mukti"//TODO this is going to have be dynamically set per user.
  };

  componentDidMount() {
    this.loadBooks(this.props.userID);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.userID !== prevProps.userID) {
      console.log("componentDidUpdate: userID: " + this.props.userID);
      this.loadBooks(this.props.userID);
    }
  }

  loadBooks = (login) => {
    dbAPI.getBooks(login)
      .then(res =>
        this.setState({ books: res.data })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    dbAPI.deleteBook(id)
      .then(res => this.loadBooks(this.props.userID))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <h4>Saved Books</h4>
          </Col>
          <Col size="md-12">
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>

                    {/* Below, I made the title of the book be the "view" instead of creating another button just for view, so if clicked it will take you to more info.*/}
                    <strong>
                      <a href={book.link}>{book.title}</a>
                    </strong>

                    <ActionBtn btn_text="Delete" onClick={() => this.deleteBook(book._id)} />

                    <Row>
                      <Col size="md-12" >
                        by {book.authors.join(", ")}
                      </Col>
                    </Row>
                    <Row>
                      <Col size="md-2" >
                        <Img image={book.image} title={book.title}></Img>
                      </Col>
                      <Col size="md-8">
                        {book.description}
                      </Col>
                    </Row>

                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
