import { createRoutine } from 'redux-saga-routines';
const GET_ALL_VACANCY = createRoutine('GET_ALL_VACANCY');
const GET_CANDIDATE_APPLICATIONS = createRoutine('GET_CANDIDATE_APPLICATIONS');
const GET_VACANCY_USER = createRoutine('GET_VACANCY_USER');
export default {
    GET_ALL_VACANCY,
    GET_CANDIDATE_APPLICATIONS,
    GET_VACANCY_USER
};
