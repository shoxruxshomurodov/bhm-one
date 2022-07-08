import { request } from "../../../services/api";

class ApiService {
  static getCollectorMigrationCalendar = (period) => {
    return request.get("collector/statistics/migrate-calendar", {
      params: {
        period: period,
      },
    });
  };
  static getDebtListHandle = (filial, region_id, period) => {
    return request.get("collector/dashboard/one", {
      params: {
        filial,
        region_id,
        period,
      },
    });
  };
  static getDashboardChartListHandle = (filial, region_id, period) => {
    return request.get("collector/dashboard/last-thirty-days", {
      params: {
        filial,
        region_id,
        period,
      },
    });
  };
  static getChartListHandle = (filial, region_id, period) => {
    return request.get("collector/dashboard/three", {
      params: {
        filial,
        region_id,
        period,
      },
    });
  };

  static getControllerViewHandler = (loan_id) => {
    return request.get("collector/controller/loan-view", {
      params: {
        include:
          "client_view,loanState,bank,credits,kpi,statusList,account_view,creditType,loanState.stateStatus,credits.bank,credits.creditType,loanEmployees,myLoanStatus",
        loan_id,
      },
    });
  };
  static selectEmployeesIds = (ids) => {
    return request.post("/problem-credit/employees/import", { ids });
  };
  static sendUserIdAndCreditsIds = (user_id, loan_ids) => {
    return request.post("/problem-credit/employees/link-loan", {
      user_id,
      loan_ids,
    });
  };
  static getBonus = (filial, month, year) => {
    return request.get("/problem-credit/bonus/filial", {
      params: {
        filial,
        month,
        year,
      },
    });
  };
  static getBonusChart = (filial, month, year) => {
    return request.get("/problem-credit/bonus/filial-chart", {
      params: {
        filial,
        month,
        year,
      },
    });
  };
  static getDetailPay = (user_id, month, year) => {
    return request.get("/problem-credit/bonus/detail-pay", {
      params: {
        user_id,
        month,
        year,
      },
    });
  };
  static getBonusUser = (month, year) => {
    return request.get("/problem-credit/bonus/user", {
      params: {
        month,
        year,
      },
    });
  };
  static getEmployeesList = (region_code, filial_code, page) => {
    return request.get("/problem-credit/employees/index", {
      params: {
        "filter[region_id]": region_code,
        "filter[filial]": filial_code,
        include: "countLoans",
        page,
      },
    });
  };
  static getStatusSave = (loan_id, status, comment) => {
    return request.post("/problem-credit/loan/status-save", {
      loan_id,
      status,
      comment,
    });
  };
  static changeCategory = (loan_id, is_return, comment) => {
    return request.post("/problem-credit/loan/change-category", {
      loan_id,
      is_return,
      comment,
    });
  };
  static changeCategoryInMonitoring = (loan_id, is_return, comment) => {
    return request.post("/problem-credit/monitoring/change-category", {
      loan_id,
      is_return,
      comment,
    });
  };
  static sendSms = (categoryId, content, file) => {
    return request.post("/sms/send/excel", {
      categoryId,
      content,
      file,
    });
  };
}

export default ApiService;
