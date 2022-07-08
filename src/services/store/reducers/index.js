import { combineReducers } from "redux";
import auth from "../../auth/reducers";
import chat from "../../../modules/chat/reducers";
import face from "../../../modules/face-control/reducers";
import problem_credits from "../../../modules/problem-credits/reducers";
import vacancy from "../../../modules/vacancy/reducers";
import normalize from "../../normalizr/reducers";
import languageReducer from "./translation";
import message from "../../../modules/language/reducers";
import katm from "../../../modules/katm/reducers";
import appeal from "../../../modules/appeal/reducers";
import smsJob from "../../../modules/send-sms/reducers";
export default combineReducers({
  auth,
  chat,
  face,
  normalize,
  problem_credits,
  vacancy,
  languageReducer,
  message,
  katm,
  appeal,
  smsJob,
});
