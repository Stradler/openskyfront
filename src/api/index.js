import axios from "axios";
import * as API_ENDPOINTS from "./constants";

export function getArrivalFlight(airportCode, currentEpoch) {
  return axios.get(API_ENDPOINTS.API_ARRIVAL, {
    params: {
      airport: airportCode,
      begin: currentEpoch - 3600,
      end: currentEpoch
    }
  });
}

export function getDepartureFlight(airportCode, currentEpoch) {
  return axios.get(API_ENDPOINTS.API_DEPARTURE, {
    params: {
      airport: airportCode,
      begin: currentEpoch - 3600,
      end: currentEpoch
    }
  });
}
