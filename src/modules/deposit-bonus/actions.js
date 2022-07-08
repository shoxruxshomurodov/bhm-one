import { createRoutine } from 'redux-saga-routines';
const GET_ALL_DEPOSIT_EMPLOYEES = createRoutine('GET_ALL_DEPOSIT_EMPLOYEES');
const GET_EMPLOYEE_DEPOSITS = createRoutine('GET_EMPLOYEE_DEPOSITS');
const GET_EXCEL = createRoutine('GET_EXCEL');

export default {
    GET_ALL_DEPOSIT_EMPLOYEES,
    GET_EMPLOYEE_DEPOSITS,
    GET_EXCEL
};
