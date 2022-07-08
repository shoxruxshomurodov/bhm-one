import {call, put, takeLatest} from "redux-saga/effects";
import actions from "../katm/actions";
import ApiService from "../katm/services/ApiService";
import {get} from "lodash"

function* getActiveRequests(action) {
    const {params} = action.payload;
    try {
        const {data} = yield call(ApiService.getActiveRequests, params);
        yield put({type: actions.GET_ACTIVE_REQUESTS.SUCCESS, payload: data});
    } catch (e) {
        yield put({type: actions.GET_ACTIVE_REQUESTS.FAILURE});
    }
}

function* getMonitoring(action) {
    const {params} = action.payload;

    try {
        const {data} = yield call(ApiService.getMonitoring, params);
        const content = get(data, "object.content");
        const meta = {
            totalPages: get(data, "object.totalPages"),
            totalElements: get(data, "object.totalElements"),
            pageable: get(data, "object.pageable")
        }
        yield put({type: actions.GET_MONITORING.SUCCESS, payload: {content, meta}});
    } catch (e) {
        yield put({type: actions.GET_MONITORING.FAILURE});
    }
}

function* getMonitoringById(action) {
    const {id} = action.payload;
    try {
        const {data} = yield call(ApiService.getMonitoringById, id);
        const monitoringById = get(data, "object");
        yield put({type: actions.GET_VIEW_MONITORING.SUCCESS, payload: {monitoringById}});
    } catch (e) {
        yield put({type: actions.GET_VIEW_MONITORING.FAILURE});
    }
}


export default function* () {
    yield takeLatest(actions.GET_ACTIVE_REQUESTS.REQUEST, getActiveRequests);
    yield takeLatest(actions.GET_MONITORING.REQUEST, getMonitoring);
    yield takeLatest(actions.GET_VIEW_MONITORING.REQUEST, getMonitoringById);
}