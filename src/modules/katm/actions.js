import { createRoutine } from 'redux-saga-routines';

const GET_ACTIVE_REQUESTS = createRoutine("GET_ACTIVE_REQUESTS");
const GET_MONITORING = createRoutine("GET_MONITORING");
const GET_VIEW_MONITORING = createRoutine("GET_VIEW_MONITORING");
export default {
    GET_ACTIVE_REQUESTS,
    GET_MONITORING,
    GET_VIEW_MONITORING
}