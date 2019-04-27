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

  onFacebookLogin = (loginStatus, resultObject) => {
    console.log("onFacebookLogin");
    if (loginStatus === true) {
      console.log("onFacebookLogin: setState: user.name: " + resultObject.user.name);
      console.log("onFacebookLogin: setState: userID: " + resultObject.user.id);
      this.setState({
        username: resultObject.user.name,
        userID: resultObject.user.id
      });
    } else {
      //alert("Facebook login error");
      console.log("Facebook login error");
    }
  }

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
            <Route exact path="/" render={(props) => <Books {...props} userID={this.state.userID} />} />
            <Route exact path="/books" render={(props) => <Books {...props} userID={this.state.userID} />} />
            <Route exact path="/search" render={(props) => <Search {...props} userID={this.state.userID} />} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
