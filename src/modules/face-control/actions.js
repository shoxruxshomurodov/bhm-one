import { createRoutine } from 'redux-saga-routines';
const GET_PERSONAL_MONTHLY = createRoutine('GET_PERSONAL_MONTHLY');
const GET_DEPARTMENT = createRoutine('GET_DEPARTMENT');
const GET_DEPARTMENT_LIST = createRoutine('GET_DEPARTMENT_LIST');
const GET_DEPARTMENT_EMPLOYEES = createRoutine('GET_DEPARTMENT_EMPLOYEES');
const GET_TOTAL_DEPARTMENT_EMPLOYEES_HOUR = createRoutine('GET_TOTAL_DEPARTMENT_EMPLOYEES_HOUR');
const GET_SOFTWARE_DEPARTMENT_EMPLOYESS_LIST = createRoutine('GET_SOFTWARE_DEPARTMENT_EMPLOYESS_LIST');
const GET_VISIBILITY_EMPLOYEES = createRoutine('GET_VISIBILITY_EMPLOYEES');
const GET_VISIBILITY_DEPARTMENT = createRoutine('GET_VISIBILITY_DEPARTMENT');
const GET_VISIBILITY_EMPLOYEE_REASON = createRoutine('GET_VISIBILITY_EMPLOYEE_REASON');
const LATE_DAYS_REASON = createRoutine('LATE_DAYS_REASON');
const ACCEPT_REASON = createRoutine('ACCEPT_REASON')
export default {
	GET_PERSONAL_MONTHLY,
	GET_DEPARTMENT,
	GET_DEPARTMENT_LIST,
	GET_DEPARTMENT_EMPLOYEES,
	GET_TOTAL_DEPARTMENT_EMPLOYEES_HOUR,
	GET_SOFTWARE_DEPARTMENT_EMPLOYESS_LIST,
	GET_VISIBILITY_EMPLOYEES,
	GET_VISIBILITY_DEPARTMENT,
	GET_VISIBILITY_EMPLOYEE_REASON,
	LATE_DAYS_REASON,
	ACCEPT_REASON
};