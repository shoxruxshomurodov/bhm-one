import {call, put, takeLatest} from "redux-saga/effects";
import actions from "../appeal/actions";
import ApiService from "../appeal/services/ApiService";
import {get} from "lodash"

function* getAppeal(action) {

    const {params} = action.payload;
    try {
        const {data} = yield call(ApiService.getAppealIndex, params);

        yield put({type: actions.GET_APPEAL.SUCCESS, payload: data});
    } catch (e) {
        yield put({type: actions.GET_APPEAL.FAILURE});
    }
}

function* setAppeal(action) {
    const {id} = action.payload;
    try {
        const {data} = yield call(ApiService.getMonitoringById, id);
        const monitoringById = get(data, "object");
        yield put({type: actions.SET_APPEAL.SUCCESS, payload: {monitoringById}});
    } catch (e) {
        yield put({type: actions.SET_APPEAL.FAILURE});
    }
}


export default function* () {
    yield takeLatest(actions.GET_APPEAL.REQUEST, getAppeal);
    yield takeLatest(actions.SET_APPEAL.REQUEST, setAppeal);
}