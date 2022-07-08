import {put, takeLatest} from 'redux-saga/effects';
import Actions from '../actions/translation';
import storage from '../../storage';
import i18n from "../../../services/i18n";
const i18nLang = i18n();
function* changeLang(action) {
    const {lang} = action.payload;
    try {
        storage.set('lang', lang);
        yield put({type: Actions.CHANGE_LANG.SUCCESS, payload: {lang}});
    } catch (e) {
        yield put({type: Actions.CHANGE_LANG.FAILURE, payload: {lang}});
    }
}
function* getTranslations(action) {
    const {
        payload: {lang}
    } = action;
    yield i18nLang.changeLanguage(lang);
    yield put({type: Actions.GET_TRANSLATIONS.SUCCESS, payload: {lang}});
}
export default function* userSaga() {
    yield takeLatest(Actions.CHANGE_LANG.REQUEST, changeLang);
    yield takeLatest(Actions.GET_TRANSLATIONS.REQUEST, getTranslations);
}
