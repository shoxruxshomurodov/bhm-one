import { call, put, takeLatest } from "redux-saga/effects";
import actions from "./actions";
import ApiService from "./services/ApiService";

function* changeSmsJobStatus(action) {
  const { id, status, cb } = action.payload;
  try {
    const { data } = yield call(ApiService.changeSmsStatus, id, status);
    cb.success();
  } catch (e) {
    console.log(e);
    cb.fail();
  }
}

export default function*() {
  yield takeLatest(actions.CHANGE_SMS_JOB_STATUS.REQUEST, changeSmsJobStatus);
}
