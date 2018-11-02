import axios from "axios";
import * as API_ENDPOINTS from "./constants";

export function getArrivalFlight(airportCode, endEpoch, beginEpoch) {
  return axios.get(API_ENDPOINTS.API_ARRIVAL, {
    params: {
      airport: airportCode,
      begin: beginEpoch,
      end: endEpoch
    }
  });
}

export function getDepartureFlight(airportCode, endEpoch, beginEpoch) {
  return axios.get(API_ENDPOINTS.API_DEPARTURE, {
    params: {
      airport: airportCode,
      begin: beginEpoch,
      end: endEpoch
    }
  });
}
