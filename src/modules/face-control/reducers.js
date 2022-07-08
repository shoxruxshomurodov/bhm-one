import actions from "./actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_PERSONAL_MONTHLY.REQUEST:
      return {
        ...state,
        isFetched: false
      };

    case actions.GET_PERSONAL_MONTHLY.FAILURE:
      return {
        ...state,
        isFetched: false
      };
    case actions.GET_PERSONAL_MONTHLY.SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        isFetched: true,
        data
      };
    case actions.GET_DEPARTMENT.REQUEST:
      return {
        ...state,
        isFetched: false
      };

    case actions.GET_DEPARTMENT.FAILURE:
      return {
        ...state,
        isFetched: false
      };

    case actions.GET_DEPARTMENT.SUCCESS:
      const { employees } = action.payload;
      return {
        ...state,
        isFetched: true,
        employees
      };

    case actions.GET_DEPARTMENT_LIST.REQUEST:
      return {
        ...state,
        isFetched: false
      };

    case actions.GET_DEPARTMENT_LIST.FAILURE:
      return {
        ...state,
        isFetched: false
      };

    case actions.GET_DEPARTMENT_LIST.SUCCESS:
      const { departmentList } = action.payload;
      return {
        ...state,
        isFetched: true,
        departmentList
      };

    case actions.GET_DEPARTMENT_EMPLOYEES.REQUEST:
      return {
        ...state,
        isFetched: false
      };

    case actions.GET_DEPARTMENT_EMPLOYEES.FAILURE:
      return {
        ...state,
        isFetched: false
      };

    case actions.GET_DEPARTMENT_EMPLOYEES.SUCCESS:
      const { departmentEmployees } = action.payload;
      return {
        ...state,
        isFetched: true,
        departmentEmployees
      };

    case actions.GET_TOTAL_DEPARTMENT_EMPLOYEES_HOUR.REQUEST:
      return {
        ...state,
        isFetched: false
      };

    case actions.GET_TOTAL_DEPARTMENT_EMPLOYEES_HOUR.FAILURE:
      return {
        ...state,
        isFetched: false
      };

    case actions.GET_TOTAL_DEPARTMENT_EMPLOYEES_HOUR.SUCCESS:
      const { totalWorkDepartmentEmployees } = action.payload;
      return {
        ...state,
        isFetched: true,
        totalWorkDepartmentEmployees
      };
    case actions.GET_SOFTWARE_DEPARTMENT_EMPLOYESS_LIST.REQUEST:
      return {
        ...state,
        isFetched: false
      };
    case actions.GET_SOFTWARE_DEPARTMENT_EMPLOYESS_LIST.FAILURE:
      return {
        ...state,
        isFetched: false
      };

    case actions.GET_SOFTWARE_DEPARTMENT_EMPLOYESS_LIST.SUCCESS:
      const {
        totalWorkDepartmentEmployees: softwareDepartmentEmployeesList
      } = action.payload;
      return {
        ...state,
        isFetched: true,
        softwareDepartmentEmployeesList
      };
    case actions.GET_VISIBILITY_EMPLOYEES.REQUEST:
      return {
        ...state,
        isFetched: false
      };

    case actions.GET_VISIBILITY_EMPLOYEES.FAILURE:
      return {
        ...state,
        isFetched: false
      };

    case actions.GET_VISIBILITY_EMPLOYEES.SUCCESS:
      const { getVisibilityEmployees } = action.payload;
      return {
        ...state,
        isFetched: true,
        getVisibilityEmployees
      };
    case actions.GET_VISIBILITY_DEPARTMENT.REQUEST:
      return {
        ...state,
        isFetched: false
      };

    case actions.GET_VISIBILITY_DEPARTMENT.FAILURE:
      return {
        ...state,
        isFetched: false
      };

    case actions.GET_VISIBILITY_DEPARTMENT.SUCCESS:
      const { getVisibilityDepartment } = action.payload;
      return {
        ...state,
        isFetched: true,
        getVisibilityDepartment
      };
    case actions.GET_VISIBILITY_EMPLOYEE_REASON.REQUEST:
      return {
        ...state,
        isFetched: false
      };

    case actions.GET_VISIBILITY_EMPLOYEE_REASON.FAILURE:
      return {
        ...state,
        isFetched: false
      };

    case actions.GET_VISIBILITY_EMPLOYEE_REASON.SUCCESS:
      const { employee_reason } = action.payload;
      return {
        ...state,
        isFetched: true,
        employee_reason
      };
    case actions.LATE_DAYS_REASON.REQUEST:
      return {
        ...state,
        isFetched: false
      };

    case actions.LATE_DAYS_REASON.FAILURE:
      return {
        ...state,
        isFetched: false
      };

    case actions.LATE_DAYS_REASON.SUCCESS:
      const { late_reason } = action.payload;
      return {
        ...state,
        isFetched: true,
        late_reason
      };
    case actions.ACCEPT_REASON.FAILURE:
      return {
        ...state,
        isFetched_Accept: false
      };
    case actions.ACCEPT_REASON.TRIGGER:
      return {
        ...state,
        isFetched_Accept: false
      };
    case actions.ACCEPT_REASON.SUCCESS:
      return {
        ...state,
        isFetched_Accept: true
      };
    default:
      return state;
  }
};
