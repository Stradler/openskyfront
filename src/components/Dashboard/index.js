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
  Button
} from "mdbreact";
import ModalForm from "../modalForm";
import "./dashboard.css";
const airports = {
  "Dallas-Fort Worth": "KDFW",
  "Frankfurt Airport": "EDDF",
  "Dubai International": "OMDB",
  "Indira Gandhi International Airport": "VIDP",
  "Los Angeles": "KLAX",
  "Chicago O'Hare": "KORD",
  "London Heathrow": "EGLL",
  "Amsterdam Airport Schiphol": "EHAM",
  "Madrid Barajas Airport ": "LEMD",
  Paris: "LFPG"
};

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
        <Modal
          className="Modal"
          isOpen={this.state.modal}
          toggle={this.toggle.bind(this, "")}
        >
          <ModalHeader toggle={this.toggle.bind(this, "")}>
            Current Flights for {this.state.airport}
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
