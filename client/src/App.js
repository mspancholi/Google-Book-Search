import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Search from "./pages/Search";
import FacebookLoginButton from './components/FacebookLoginButton';

class App extends Component {
  state = {
    username: null,
    userID: null
  };

  render() {
    return (
      <Router>
        <div>
          <FacebookLoginButton onLogin={this.onFacebookLogin}>
            <div className="fb-login-button" data-size="medium" data-button-type="login_with" data-auto-logout-link="true" data-use-continue-as="false"></div>
          </FacebookLoginButton>
          <Nav />
          <br></br>
          <br></br>
          <Switch>
            <Route exact path="/" component={Books} />
            <Route exact path="/books" component={Books} />
            <Route exact path="/search" component={Search} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
