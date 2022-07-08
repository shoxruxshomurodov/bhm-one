import { createRoutine } from 'redux-saga-routines';
const GET_ALL_EXCHANGE_POINTS = createRoutine('GET_ALL_EXCHANGE_POINTS');
const GET_ALL_ONLINE_CONVERSION = createRoutine('GET_ALL_ONLINE_CONVERSION');
export default {
    GET_ALL_EXCHANGE_POINTS,
    GET_ALL_ONLINE_CONVERSION
};

