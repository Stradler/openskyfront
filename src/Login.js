import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Input, Row, Col } from "mdbreact";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };
  login(history, e) {
    e.preventDefault();
    if (this.state.username === "demo" && this.state.password === "demo") {
      localStorage.setItem("username", this.state.username);
      localStorage.setItem("password", this.state.password);
      history.push("/dashboard");
    } else {
      alert("Wrong login/password!");
      localStorage.clear();
    }
  }
  updateForm(field, event) {
    event.persist();
    this.setState((state, props) => ({
      ...state,
      [field]: event.target.value
    }));
  }
  render() {
    return (
      <Row>
        <Col md="6">
          <form onSubmit={this.login.bind(this, this.props.history)}>
            <Input
              label="Your name"
              icon="user"
              onChange={this.updateForm.bind(this, "username")}
            />
            <Input
              type="password"
              onChange={this.updateForm.bind(this, "password")}
              label="Your password"
              group-type="password"
              icon="lock"
            />
            <button>Submit</button>
          </form>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Login);
