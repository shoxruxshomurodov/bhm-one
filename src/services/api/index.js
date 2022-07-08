import axios from "axios";
import config from "../../config";
import storage from "../storage";

const request = axios.create({
  baseURL: config.API_ROOT,
  params: {
    _f: "json",
  },
  headers: {
    common: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
    },
  },
});

request.interceptors.request.use(
  function(config) {
    if (!config.headers.Authorization) {
      const token = storage.get("token");
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export { request };
