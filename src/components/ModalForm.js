import React, { Component } from "react";
import { Row, Table, TableHead, TableBody } from "mdbreact";
import * as apiCall from "../api";
import "../styles/ModalForm.css";

class ModalForm extends Component {
  state = {
    departure: [],
    arrival: []
  };
  componentDidMount() {
    this.updateData(3600);
  }
  updateData(event) {
    let end;
    if (event.target) {
      end = event.target.value * 60;
    } else {
      end = event;
    }
    let currentEpoch = Math.round(new Date(2018, 10, 1).getTime() / 1000);
    Promise.all([
      apiCall.getArrivalFlight(
        this.props.airportCode,
        currentEpoch,
        currentEpoch - end
      ),
      apiCall.getDepartureFlight(
        this.props.airportCode,
        currentEpoch,
        currentEpoch - end
      )
    ])
      .then(values =>
        this.setState({
          departure: values[1].data,
          arrival: values[0].data
        })
      )
      .catch(e => console.log("can't get data"));
  }
  render() {
    return (
      <form className="ModalForm__form" onSubmit={e => e.preventDefault()}>
        <Row>
          <span className="ModalForm__name">Departed in last: </span>
          <select onChange={this.updateData.bind(this)}>
            <option defaultValue={60}>60</option>
            <option value={10}>10</option>
            <option value={30}>30</option>
            <option value={90}>90</option>
          </select>
          <span className="ModalForm__name">minutes </span>
        </Row>
        <Row>
          <Table striped className="ModalForm__table" small>
            <TableHead>
              <tr>
                <th>ICAO</th>
                <th>First Seen</th>
                <th>Last Seen</th>
              </tr>
            </TableHead>
            <TableBody>
              {this.state.departure.length > 0
                ? this.state.departure.map(aircraft => (
                    <tr>
                      <th>{aircraft.icao24}</th>
                      <th>{new Date(aircraft.firstSeen).toString()}</th>
                      <th>{new Date(aircraft.lastSeen).toString()}</th>
                    </tr>
                  ))
                : "No current flight in that time range"}
            </TableBody>
          </Table>
        </Row>
        <Row>
          <span className="ModalForm__name">Arrived in last:</span>
          <select onChange={this.updateData.bind(this)}>
            <option defaultValue={60}>60</option>
            <option value={30}>30</option>
            <option value={10}>10</option>
            <option value={90}>90</option>
          </select>
          <span className="ModalForm__name">minutes</span>
        </Row>
        <Row>
          <Table striped className="ModalForm__table" small>
            <TableHead>
              <tr>
                <th>ICAO</th>
                <th>First Seen</th>
                <th>Last Seen</th>
              </tr>
            </TableHead>
            <TableBody>
              {this.state.arrival.length > 0
                ? this.state.arrival.map(aircraft => (
                    <tr>
                      <th>{aircraft.icao24}</th>
                      <th>{new Date(aircraft.firstSeen).toString()}</th>
                      <th>{new Date(aircraft.lastSeen).toString()}</th>
                    </tr>
                  ))
                : "No current flight in that time range"}
            </TableBody>
          </Table>
        </Row>
      </form>
    );
  }
}

export default ModalForm;
