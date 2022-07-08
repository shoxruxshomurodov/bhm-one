import {createRoutine} from "redux-saga-routines";

const GET_ALL = createRoutine("GET_ALL");
const GET_ONE = createRoutine("GET_ONE");
const OPERATION_DELETE = createRoutine("OPERATION_DELETE");
const OPERATION_ADD = createRoutine("OPERATION_ADD");
const OPERATION_UPDATE = createRoutine("OPERATION_UPDATE");
export default {
    GET_ALL,
    GET_ONE,
    OPERATION_DELETE,
    OPERATION_ADD,
    OPERATION_UPDATE
}
