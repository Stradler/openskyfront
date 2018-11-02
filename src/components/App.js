import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { Container } from "mdbreact";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Container>
      </Router>
    );
  }
}

export default App;
