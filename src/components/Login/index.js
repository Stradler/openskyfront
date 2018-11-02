import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Input, Row, Col } from "mdbreact";
import "./login.css";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };
  login = e => {
    e.preventDefault();
    const { history } = this.props;
    const { username, password } = this.state;
    if (username === "demo" && password === "demo") {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      history.push("/dashboard");
    } else {
      alert("Wrong login/password!");
      localStorage.clear();
    }
  };
  updateForm(field, event) {
    event.persist();
    this.setState(state => ({
      [field]: event.target.value
    }));
  }
  render() {
    return (
      <Row className="Login">
        <Col md="6">
          <form onSubmit={this.login}>
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
