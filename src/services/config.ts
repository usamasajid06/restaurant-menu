import axios from "axios";

const BASE_URL =
  "https://stg.tdh.start-tech.ae/api/8661e1bc-87d4-11ef-ba55-0050563f7167/restaurant";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    lang: "en",
  },
  // timeout: 10000,
});
