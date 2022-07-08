import {createRoutine} from 'redux-saga-routines';

const CHANGE_LANG = createRoutine("CHANGE_LANG");
const GET_TRANSLATIONS = createRoutine("GET_TRANSLATIONS");
export default {
    CHANGE_LANG,
    GET_TRANSLATIONS
}