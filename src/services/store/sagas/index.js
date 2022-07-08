import { all } from "redux-saga/effects";
import auth from "../../auth/sagas";
import chat from "../../../modules/chat/sagas";
import face from "../../../modules/face-control/sagas";
import normalize from "../../normalizr/sagas";
import api from "../../api/Saga";
import problem_credits from "../../../modules/problem-credits/sagas";
import vacancy from "../../../modules/vacancy/sagas";
import languageSaga from "./translation";
import message from "../../../modules/language/sagas";
import katm from "../../../modules/katm/sagas";
import monitoring from "../../../modules/monitoring/sagas";
import appeal from "../../../modules/appeal/sagas";
import smsJob from "../../../modules/send-sms/sagas";
export default function* sagas() {
  yield all([
    auth(),
    chat(),
    face(),
    normalize(),
    problem_credits(),
    vacancy(),
    api(),
    languageSaga(),
    message(),
    katm(),
    monitoring(),
    appeal(),
    smsJob(),
  ]);
}
