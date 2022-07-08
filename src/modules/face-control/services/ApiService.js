import { request } from "../../../services/api";

class ApiService {
  static getPersonalMonthly = () => {
    return request.post("face-control/clock/test");
  };
  static getDepartment = (period) => {
    return request.post("face-control/clock/department", { period });
  };
  static getDepartmentList = () => {
    return request.get("face-control/clock/department-list");
  };
  static getDepartmentEmployees = (code, period, slug) => {
    return request.post(`face-control/clock/department-${slug}`, {
      code,
      period,
      slug
    });
  };
  static getVisibilityEmployees = (period) => {
    return request.post("face-control/clock/approved", { period });
  };
  static getVisibilityDepartment = (code, period, slug) => {
    return request.post(`face-control/clock/approved-${slug}`, {
      code,
      period,
      slug
    });
  };
  static getVisibilityEmployeesReason = (period, emp_code, comment) => {
    return request.post("face-control/clock/approved-reason", {
      period,
      emp_code,
      comment
    });
  };
  static lateDays_reason = (code, period) => {
    return request.post("face-control/clock/department-reason", {
      code,
      period
    });
  };
  static accept_reason = (reason) => {
    return request.post("face-control/clock/reason-confirm", reason);
  };
}
export default ApiService;
