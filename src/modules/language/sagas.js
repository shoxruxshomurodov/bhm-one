import {call, put, takeLatest} from "redux-saga/effects";
import actions from "../language/actions";
import ApiService from "../language/services/ApiService";


function * getLanguage(action){
    const {params,name=""} = action.payload;
    try {
        const {data} = yield call(ApiService.getLanguage, params,name);

        yield put({type: actions.GET_LANGUAGE.SUCCESS, payload: data});
    }
    catch (e) {
        yield put({type: actions.GET_LANGUAGE.FAILURE});
    }
}
function * getOneMessage(action){
    const {message_id} = action.payload;
    try {
        const data = yield call(ApiService.getOneMessage, message_id);
        yield put({type: actions.GET_ONE_MESSAGE.SUCCESS, payload:data});
    }
    catch (e) {
        yield put({type: actions.GET_ONE_MESSAGE.FAILURE});
    }
}


export default function *(){
    yield takeLatest(actions.GET_LANGUAGE.REQUEST, getLanguage);
    yield takeLatest(actions.GET_ONE_MESSAGE.REQUEST, getOneMessage);
}