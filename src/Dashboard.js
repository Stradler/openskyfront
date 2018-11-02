import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardImage,
  CardText,
  CardBody,
  CardTitle,
  CardGroup,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Table
} from "mdbreact";
import axios from "axios";
const API_ENDPOINT = "https://opensky-network.org/api";
const airports = {
  Atlanta: "KATL",
  Beijing: "ZBAA",
  "Dubai International": "OMDB",
  "Tokyo Haneda": "RJTT",
  "Los Angeles": "KLAX",
  "Chicago O'Hare": "KORD",
  "London Heathrow": "EGLL",
  "Hong Kong": "VHHH",
  "Shanghai Pudong": "ZSPD",
  Paris: "LFPG"
};

class ModalForm extends Component {
  state = {
    departure: {},
    arrival: {}
  };
  componentDidMount() {
    let state = {};
    let currentEpoch = Math.round(new Date(2018, 10, 1).getTime() / 1000);
    axios
      .get(API_ENDPOINT + "/flights/arrival", {
        params: {
          airport: this.props.airportCode,
          begin: currentEpoch - 600,
          end: currentEpoch
        }
      })
      .then(response => (state.departure = response.data));
    axios
      .get(API_ENDPOINT + "/flights/departure", {
        params: {
          airport: this.props.airportCode,
          begin: currentEpoch - 600,
          end: currentEpoch
        }
      })
      .then(response => (state.arrival = response.data));

    console.log(state);
  }
  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <Row>
          Departed in:
          <select>
            <option value={10}>10</option>
            <option value={30}>30</option>
            <option value={60}>60</option>
            <option value={90}>90</option>
          </select>
          minutes
          <Table />
        </Row>

        <Row>
          Arrived in:
          <select>
            <option value={10}>10</option>
            <option value={30}>30</option>
            <option value={60}>60</option>
            <option value={90}>90</option>
          </select>
          minutes
          <Table />
        </Row>
      </form>
    );
  }
}

class Dashboard extends Component {
  state = {
    modal: false,
    airport: null
  };
  toggle(name) {
    this.setState((state, props) => ({
      airport: name,
      modal: !this.state.modal
    }));
  }
  componentDidMount() {
    if (!localStorage.getItem("username")) {
      this.props.history.push("/");
    }
  }
  render() {
    let grid = [];
    for (let name in airports) {
      grid.push(
        <Col xs="4" sm="3" md="2" key={name}>
          <Card
            style={{ minHeight: "350px", marginTop: "20px", cursor: "pointer" }}
            onClick={this.toggle.bind(this, name)}
          >
            <CardImage
              top
              width="100%"
              src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
              alt={"Image of " + name + "Airport"}
              top
              hover
              overlay="white-slight"
            />
            <CardBody>
              <CardTitle>{name}</CardTitle>
              <CardText>
                Click on the card to get info about this airport!
              </CardText>
            </CardBody>
          </Card>
        </Col>
      );
    }
    return (
      <Row>
        <CardGroup
          style={{
            justifyContent: "center"
          }}
        >
          {grid}
        </CardGroup>
        <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this, "")}>
          <ModalHeader toggle={this.toggle.bind(this, "")}>
            Modal title
          </ModalHeader>
          <ModalBody>
            <ModalForm airportCode={airports[this.state.airport]} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle.bind(this, "")}>
              Close
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </Row>
    );
  }
}

export default withRouter(Dashboard);
