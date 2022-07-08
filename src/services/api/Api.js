import { request } from "./index";

class Api {
  static getAll = (url, config) => {
    return request.get(url, config);
  };
  static getOne = (url, config) => {
    return request.get(url, config);
  };
  static add = (url, attributes) => {
    return request.post(url, attributes);
  };
  static remove = (url, attributes, config) => {
    if (attributes) {
      return request.delete(url, { data: attributes }, config);
    }
    return request.delete(url, config);
  };
  static update = (url, attributes) => {
    return request.put(url, attributes);
  };
}

export default Api;
