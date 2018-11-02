import axios from "axios";
import * as API_ENDPOINTS from "./constants";

export function getArrivalFlight(params) {
  return axios.get(API_ENDPOINTS.API_ARRIVAL, { params });
}

export function getDepartureFlight(params) {
  return axios.get(API_ENDPOINTS.API_DEPARTURE, { params });
}
