import { request } from "../../../services/api";

class ApiService {
  static setLoansById = (id) => {
    return request.put(
      `/monitoring/loans/${id}/accept`,
      {},
      {
        params: {
          include: "client,branch,creditType,requirements,location",
        },
      }
    );
  };
  static excelExport = (params) => {
    return request.post("/monitoring/loan-details/export", params);
  };
  static excelExportControlLoans = (params) => {
    return request.post("/monitoring/checkpoints/export", params);
  };
  static excelExportBranches = (params) => {
    return request.get("/monitoring/reports/npl-branches-excel", params);
  };
  static excelExportRegion = (params) => {
    return request.get("/monitoring/reports/npl-regions-excel", params);
  };
}

export default ApiService;
