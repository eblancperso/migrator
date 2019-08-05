import axios from "axios";

import { getAccessToken } from "./";

const baseUrl = window.location.host.includes("localhost")
  ? "http://localhost:4000"
  : "http://api.migrator.com";
const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const post = async (endpoint, body, host = baseUrl) => {
  try {
    await addHeaders();
    return parseResponse(await axios.post(`${host}${endpoint}`, body));
  } catch (error) {
    return handleError(error);
  }
};

export const get = async (endpoint, host = baseUrl) => {
  try {
    await addHeaders();
    return parseResponse(await axios.get(`${host}${endpoint}`));
  } catch (error) {
    return handleError(error);
  }
};

export const parseResponse = response => response.data;

const addHeaders = async () => {
  const token = await getAccessToken();
  config.headers.Authorization = `Bearer ${token}`;
};

const handleError = error => {
  if (error.response.status === 401) {
    window.location.replace("/");
  }
  return { error: error.response.data };
};
