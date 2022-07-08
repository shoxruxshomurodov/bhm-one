import { call, put, takeLatest } from "redux-saga/effects";
import actions from "./actions";
import ApiServices from "./services/ApiService";

function* getPersonalMonthly() {
  try {
    const result = yield call(ApiServices.getPersonalMonthly);
    const { data } = result;

    yield put({
      type: actions.GET_PERSONAL_MONTHLY.SUCCESS,
      payload: { data }
    });
  } catch (e) {
    yield put({
      type: actions.GET_PERSONAL_MONTHLY.FAILURE
    });
  }
}
function* getDepartment(action) {
  let { period } = action.payload;
  try {
    const result = yield call(ApiServices.getDepartment, period);
    const { data: employees } = result;
    yield put({
      type: actions.GET_DEPARTMENT.SUCCESS,
      payload: { employees }
    });
  } catch (e) {
    yield put({
      type: actions.GET_DEPARTMENT.FAILURE
    });
  }
}

function* getDepartmentList() {
  try {
    const result = yield call(ApiServices.getDepartmentList);
    const { data: departmentList } = result;
    yield put({
      type: actions.GET_DEPARTMENT_LIST.SUCCESS,
      payload: { departmentList }
    });
  } catch (e) {
    yield put({
      type: actions.GET_DEPARTMENT_LIST.FAILURE
    });
  }
}
function* getDepartmentEmployees(action) {
  let { code, period, slug } = action.payload;

  try {
    const result = yield call(
      ApiServices.getDepartmentEmployees,
      code,
      period,
      slug
    );
    const { data: departmentEmployees } = result;
    yield put({
      type: actions.GET_DEPARTMENT_EMPLOYEES.SUCCESS,
      payload: { departmentEmployees }
    });
  } catch (e) {
    yield put({
      type: actions.GET_DEPARTMENT_EMPLOYEES.FAILURE
    });
  }
}

function* getTotalWorkDepartmentEmployees(action) {
  let { code, period, slug } = action.payload;
  try {
    const result = yield call(
      ApiServices.getDepartmentEmployees,
      code,
      period,
      slug
    );
    const { data: totalWorkDepartmentEmployees } = result;
    yield put({
      type: actions.GET_TOTAL_DEPARTMENT_EMPLOYEES_HOUR.SUCCESS,
      payload: { totalWorkDepartmentEmployees }
    });
  } catch (e) {
    yield put({
      type: actions.GET_TOTAL_DEPARTMENT_EMPLOYEES_HOUR.FAILURE
    });
  }
}
function* getSoftwareDepartmentEmployeesList(action) {
  let { code, periodInMonthy: period, slug } = action.payload;
  try {
    const result = yield call(
      ApiServices.getDepartmentEmployees,
      code,
      period,
      slug
    );
    const { data: totalWorkDepartmentEmployees } = result;
    yield put({
      type: actions.GET_SOFTWARE_DEPARTMENT_EMPLOYESS_LIST.SUCCESS,
      payload: { totalWorkDepartmentEmployees }
    });
  } catch (e) {
    yield put({
      type: actions.GET_SOFTWARE_DEPARTMENT_EMPLOYESS_LIST.FAILURE
    });
  }
}
function* getVisibilityEmployees(action) {
  let { period } = action.payload;
  try {
    const result = yield call(ApiServices.getVisibilityEmployees, period);
    const { data: getVisibilityEmployees } = result;
    yield put({
      type: actions.GET_VISIBILITY_EMPLOYEES.SUCCESS,
      payload: { getVisibilityEmployees }
    });
  } catch (e) {
    yield put({
      type: actions.GET_VISIBILITY_EMPLOYEES.FAILURE
    });
  }
}
function* getVisibilityDepartment(action) {
  let { code, period, slug } = action.payload;
  try {
    const result = yield call(
      ApiServices.getVisibilityDepartment,
      code,
      period,
      slug
    );
    const { data: getVisibilityDepartment } = result;
    yield put({
      type: actions.GET_VISIBILITY_DEPARTMENT.SUCCESS,
      payload: { getVisibilityDepartment }
    });
  } catch (e) {
    yield put({
      type: actions.GET_VISIBILITY_DEPARTMENT.FAILURE
    });
  }
}
function* getVisibilityEmployeeReason(action) {
  let { period, emp_code, comment } = action.payload;
  try {
    const result = yield call(
      ApiServices.getVisibilityEmployeesReason,
      period,
      emp_code,
      comment
    );
    const { data: employee_reason } = result;
    yield put({
      type: actions.GET_VISIBILITY_EMPLOYEE_REASON.SUCCESS,
      payload: { employee_reason }
    });
  } catch (e) {
    yield put({
      type: actions.GET_VISIBILITY_EMPLOYEE_REASON.FAILURE
    });
  }
}
function* lateDaysReason(action) {
  let { code, period } = action.payload;
  try {
    const result = yield call(ApiServices.lateDays_reason, code, period);
    const { data: late_reason } = result;
    yield put({
      type: actions.LATE_DAYS_REASON.SUCCESS,
      payload: { late_reason }
    });
  } catch (e) {
    yield put({
      type: actions.LATE_DAYS_REASON.FAILURE
    });
  }
}
function* acceptReason(action) {
  let { reason } = action.payload;
  try {
    yield call(ApiServices.accept_reason, reason);
    yield put({
      type: actions.ACCEPT_REASON.SUCCESS
    });
    yield put({
      type: actions.ACCEPT_REASON.TRIGGER
    });
  } catch (e) {
    yield put({
      type: actions.ACCEPT_REASON.FAILURE
    });
  }
}
export default function*() {
  yield takeLatest(actions.GET_PERSONAL_MONTHLY.REQUEST, getPersonalMonthly);
  yield takeLatest(actions.GET_DEPARTMENT.REQUEST, getDepartment);
  yield takeLatest(actions.GET_DEPARTMENT_LIST.REQUEST, getDepartmentList);
  yield takeLatest(
    actions.GET_DEPARTMENT_EMPLOYEES.REQUEST,
    getDepartmentEmployees
  );
  yield takeLatest(
    actions.GET_TOTAL_DEPARTMENT_EMPLOYEES_HOUR.REQUEST,
    getTotalWorkDepartmentEmployees
  );
  yield takeLatest(
    actions.GET_SOFTWARE_DEPARTMENT_EMPLOYESS_LIST.REQUEST,
    getSoftwareDepartmentEmployeesList
  );
  yield takeLatest(
    actions.GET_VISIBILITY_EMPLOYEES.REQUEST,
    getVisibilityEmployees
  );
  yield takeLatest(
    actions.GET_VISIBILITY_DEPARTMENT.REQUEST,
    getVisibilityDepartment
  );
  yield takeLatest(
    actions.GET_VISIBILITY_EMPLOYEE_REASON.REQUEST,
    getVisibilityEmployeeReason
  );
  yield takeLatest(actions.LATE_DAYS_REASON.REQUEST, lateDaysReason);
  yield takeLatest(actions.ACCEPT_REASON.REQUEST, acceptReason);
}
