import {call, put, takeLatest} from 'redux-saga/effects';
import actions from './actions';
import ApiService from './services/ApiService';

function* getAllVacancyRequest(action) {
    try {
        const {code, page = 1} = action.payload;
        const params = {code, 'per-page': 20, page};
        const {data} = yield call(ApiService.getAllVacancy, params);
        yield put({
            type: actions.GET_ALL_VACANCY.SUCCESS,
            payload: {data},
        });
    } catch (e) {
        console.log(e);
    }

}


export default function* () {
    yield takeLatest(actions.GET_ALL_VACANCY.REQUEST, getAllVacancyRequest);
}
