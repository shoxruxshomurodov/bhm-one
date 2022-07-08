import { request } from "../../services/api";

class ApiService {
  static excelExport = (url, params, config) => {
    return request.get(url, {
      params: {
        ...config,
        ...params,
      },
    });
  };
  static refreshReport = (url, params, config) => {
    return request.get(url, {
      params: {
        ...config,
        ...params,
      },
    });
  };
}

export default ApiService;
