import Axios from "axios";
import { loadProgressBar } from "axios-progress-bar";

export const BASE_URL = "http://10.0.30.90/api";
// export const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

export const axiosGeneral = Axios.create({
  baseURL: BASE_URL,
  responseType: "json",
});
loadProgressBar({ showSpinner: false }, axiosGeneral);
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const errorHandler = (error) => {
  return error.response !== undefined
    ? `Response ${error.response.status}: ${error.response.data.message}`
    : error.message;
};
