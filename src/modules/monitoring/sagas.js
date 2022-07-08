import {call, put, takeLatest} from "redux-saga/effects";
import actions from "./actions";
import ApiService from "./services/ApiService";
import Loans from "../../schema/Loans";
import Normalizer from "../../services/normalizr";
import NormalizerAction from "../../services/normalizr/actions";
function* setLoanById(action) {
  const {
    payload: {
      id,
      cb = {
        success: () => {
        },
        fail: () => {
        },
      }
    }
  } = action;
  try {
    const {data} = yield call(ApiService.setLoansById, id);
    const normalizedData = yield call(Normalizer.Normalize, data, Loans);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "set-loan-id",
        entityName: "loan"
      }
    });
    yield put({type: actions.SET_LOAN_BY_ID.SUCCESS});
    yield call(cb.success, normalizedData, data);
  } catch (e) {
    yield put({type: actions.SET_LOAN_BY_ID.FAILURE});
    yield call(cb.fail, e);
  }

}

export default function* () {
  yield takeLatest(actions.SET_LOAN_BY_ID.REQUEST, setLoanById);
}
