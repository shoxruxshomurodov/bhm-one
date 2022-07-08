import { createRoutine } from 'redux-saga-routines';

const GET_LANGUAGE = createRoutine("GET_LANGUAGE");
const GET_ONE_MESSAGE = createRoutine("GET_ONE_MESSAGE");
export default {
    GET_LANGUAGE,
    GET_ONE_MESSAGE
}