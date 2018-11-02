import React, { Component } from "react";
import { Row, Table, TableHead, TableBody } from "mdbreact";
import * as apiCall from "../../api";
import "./ModalForm.css";

class ModalForm extends Component {
  state = {
    departure: [],
    arrival: []
  };
  componentDidMount() {
    this.updateData(3600);
  }
  updateData = event => {
    let end;
    if (event.target) {
      end = event.target.value * 60;
    } else {
      end = event;
    }
    let currentEpoch = Math.round(Date.now() / 1000) - 24 * 3600;
    Promise.all([
      apiCall.getArrivalFlight({
        airport: this.props.airportCode,
        end: currentEpoch,
        begin: currentEpoch - end
      }),
      apiCall.getDepartureFlight({
        airport: this.props.airportCode,
        end: currentEpoch,
        begin: currentEpoch - end
      })
    ])
      .then(values =>
        this.setState({
          departure: values[1].data,
          arrival: values[0].data
        })
      )
      .catch(e => console.log("can't get data"));
  };
  renderRow = verb => {
    let data = verb === "Departed" ? this.state.departure : this.state.arrival;
    return [
      <Row key={verb + 1}>
        <span className="ModalForm__name">{verb} in last: </span>
        <select onChange={this.updateData}>
          <option defaultValue={60}>60</option>
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={90}>90</option>
        </select>
        <span className="ModalForm__name">minutes </span>
      </Row>,
      <Row key={verb + 2}>
        <Table striped className="ModalForm__table" small>
          <TableHead>
            <tr>
              <th>ICAO</th>
              <th>First Seen</th>
              <th>Last Seen</th>
            </tr>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map(aircraft => (
                <tr key={aircraft.icao24 + aircraft.firstSeen}>
                  <th>{aircraft.icao24}</th>
                  <th>{new Date(aircraft.firstSeen * 1000).toString()}</th>
                  <th>{new Date(aircraft.lastSeen * 1000).toString()}</th>
                </tr>
              ))
            ) : (
              <tr>
                <th colSpan="3">No current flight in that time range</th>
              </tr>
            )}
          </TableBody>
        </Table>
      </Row>
    ];
  };
  render() {
    return (
      <form className="ModalForm" onSubmit={e => e.preventDefault()}>
        {this.renderRow("Departed")}
        {this.renderRow("Arrived")}
      </form>
    );
  }
}

export default ModalForm;
