import Actions from "./actions";
import { call, put, takeLatest } from "redux-saga/effects";
import { request } from "../api";
import storage from "../storage";
import { connect } from "@giantmachines/redux-websocket";
import config from "../../config";
import * as actionTypes from "../../services/websocket/types";
import Normalizer from "./../normalizr";
import NormalizerAction from "./../normalizr/actions";
import TokenScheme from "../../schema/Token";
import TokenConfirmScheme from "../../schema/TokenConfirm";
import UserScheme from "../../schema/User";
import Api from "./services/ApiServices";
import { get } from "lodash";
import ValidationResponse from "./../helpers/ValidationResponseYii";


function* loginOrSignUpRequest(action) {
  const {
    payload: {
      phone,
      formMethods: { setFieldError, setSubmitting }
    }
  } = action;
  try {
    const { data } = yield call(Api.LoginOrSignUp, phone);
    if (data.hasOwnProperty("token")) {
      const normalizedData = yield call(
        Normalizer.Normalize,
        data,
        TokenScheme
      );
      yield call(setSubmitting, false);
      yield put({
        type: NormalizerAction.NORMALIZE.REQUEST,
        payload: {
          ...normalizedData,
          storeName: "get-token",
          entityName: "token"
        }
      });
    }
    if (data.hasOwnProperty("phone")) {
      const normalizedData = yield call(Normalizer.Normalize, data, UserScheme);
      yield call(setSubmitting, false);
      yield put({
        type: NormalizerAction.NORMALIZE.REQUEST,
        payload: {
          ...normalizedData,
          storeName: "get-user",
          entityName: "user"
        }
      });
    }
    yield put({ type: Actions.LOGIN_OR_SIGN_UP.SUCCESS });
  } catch (e) {
    yield call(ValidationResponse.setErrors, e, setFieldError);
    yield put({ type: Actions.LOGIN_OR_SIGN_UP.FAILURE });
  }
  yield call(setSubmitting, false);
}

function* tokenOne(action) {
  const {
    payload: { token }
  } = action;
  try {
    const { data } = yield call(Api.GetTokenOne, token);
    const normalizedData = yield call(Normalizer.Normalize, data, TokenScheme);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "get-token",
        entityName: "token"
      }
    });
    yield put({ type: Actions.TOKEN_ONE.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.TOKEN_ONE.FAILURE });
  }
}
function* tokenConfirm(action) {
  const {
    payload: {
      token,
      secret,
      formMethods: { setSubmitting }
    }
  } = action;

  try {
    const { data } = yield call(Api.TokenConfirm, token, secret);
    const normalizedData = yield call(
      Normalizer.Normalize,
      data,
      TokenConfirmScheme
    );
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: "confirm-token",
        entityName: "confirm-token"
      }
    });
    yield put({ type: Actions.TOKEN_CONFIRM.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.TOKEN_CONFIRM.FAILURE });
  }
  yield call(setSubmitting, false);
}

function* checkAuthRequest(action) {
  try {
    const { data } = yield call(
      Api.checkAuth,
      get(action, "payload.token", null)
    );
    yield put({
      type: Actions.CHECK_AUTH.SUCCESS,
      payload: { token: get(action, "payload.token", null), user: data }
    });
  } catch (e) {
    yield put({ type: Actions.CHECK_AUTH.FAILURE });
  }
}

function* checkAuthSuccess(action) {
  if (get(action, "payload.token", null)) {
    yield call(storage.set, "token", get(action, "payload.token", null));
  }
}

function* checkAuthFailure() {
  yield call(storage.remove, "token");
}
function* userOne(action) {
  const {
    payload: { userId }
  } = action;
  try {
    const { data } = yield call(Api.GetUserOne, userId);
    const normalizedData = yield call(Normalizer.Normalize, data, UserScheme);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: { ...normalizedData, storeName: "get_user", entityName: "user" }
    });
    yield put({ type: Actions.USER_ONE.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.USER_ONE.FAILURE });
  }
}
function* login(action) {
  const {
    payload: {
      phone,
      password,
      formMethods: { setFieldError, setSubmitting }
    }
  } = action;

  try {
    const { data } = yield call(Api.Login, phone, password);
    const normalizedData = yield call(Normalizer.Normalize, data, TokenScheme);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: { ...normalizedData, storeName: "login", entityName: "user" }
    });
    yield put({ type: Actions.LOGIN.SUCCESS });
  } catch (e) {
    yield call(ValidationResponse.setErrors, e, setFieldError);
    yield put({ type: Actions.LOGIN.FAILURE });
  }
  yield call(setSubmitting, false);
}

// TEPASI YANGI
function* loginByToken(action) {
  const { token } = action.payload;
  const result = yield call(request.get, "/auth/default/get-me", {
    params: {
      include: "profile,employee,section"
    },
    headers: {
      Authorization: `Bearer ${token.token}`
    }
  });

  yield put({
    type: Actions.LOGIN_BY_TOKEN.SUCCESS,
    payload: {
      token,
      user: result.data,
      employee: result.data.employee
    }
  });
  yield call(storage.set, "token", token.token);
}

function* initWs() {
  let token = storage.get("token");
  yield put(connect(`${config.WEB_SOCKET_URL}?token=${token}`));
}

function* userCheckAuth(action) {
  try {
    const result = yield call(request.get, "/auth/default/get-me", {
      params: {
        include: "profile,employee,section"
      }
    });
    yield put({ type: Actions.CHECK.SUCCESS, payload: { user: result.data } });
  } catch (e) {
    yield put({ type: Actions.CHECK.FAILURE, payload: { ...action.payload } });
  }
}

function* linkEmployee(action) {
  const {
    profile_id,
    agree,
    setSubmitting,
    setFieldError,
    cbSuccess
  } = action.payload;

  try {
    const result = yield call(request.post, "auth/default/add-profile", {
      profile_id,
      agree
    });
    const employee = result.data;
    yield put({ type: Actions.LINK_EMPLOYEE.SUCCESS, payload: { employee } });
    yield call(cbSuccess);
    setSubmitting(false);
  } catch (e) {
    const data = e.response.data;
    // eslint-disable-next-line array-callback-return
    data.map((item) => {
      setFieldError(item.field, item.message);
    });
    yield put({
      type: Actions.LINK_EMPLOYEE.FAILURE,
      payload: { profile_id, agree }
    });
    setSubmitting(false);
  }
}

function* logoutRequest(action) {
  //const phone = action.payload;
  try {
    yield call(storage.remove, "token");
    yield put({ type: Actions.LOGOUT.SUCCESS });
    //yield call(this.history.push, `/auth/login/${btoa(phone)}`);
  } catch (e) {
    yield put({ type: Actions.LOGOUT.FAILURE });
  }
}
function* welcomeHome() {
  yield put({ type: Actions.WELCOME_HOME.SUCCESS });
}
function* goodByeHome() {
  yield put({ type: Actions.GOOD_BYE_HOME.SUCCESS });
}
function* calcelGoodByeHome() {
  yield put({ type: Actions.CANCEL_GOOD_BYE_HOME.SUCCESS });
}
function* websocketTryConnect() {
  let token = storage.get("token");
  setTimeout(
    yield put(connect(`${config.WEB_SOCKET_URL}?token=${token}`)),
    3000
  );
}

function* change_mode(action) {
  const { mode } = action.payload;
  yield call(storage.set, "mode", mode);
  yield put({ type: Actions.CHANGE_MODE.SUCCESS, payload: { mode } });
}
function* certSign(action) {
  const  {certinfo,signedMsg} = action.payload;
  try {
    const { data } = yield call(Api.CertSign, certinfo,signedMsg);
    const normalizedData = yield call(Normalizer.Normalize, data, TokenScheme);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: { ...normalizedData, storeName: "cert-sign", entityName: "token" }
    });
    yield put({ type: Actions.CERT_SIGN.SUCCESS });
  } catch (e) {
    yield put({ type: Actions.CERT_SIGN.FAILURE });
  }
}
export default function* mySaga() {
  yield takeLatest(Actions.LOGIN_OR_SIGN_UP.REQUEST, loginOrSignUpRequest);
  yield takeLatest(Actions.TOKEN_ONE.REQUEST, tokenOne);
  yield takeLatest(Actions.TOKEN_CONFIRM.REQUEST, tokenConfirm);
  yield takeLatest(Actions.CHECK_AUTH.REQUEST, checkAuthRequest);
  yield takeLatest(Actions.CHECK_AUTH.SUCCESS, checkAuthSuccess);
  yield takeLatest(Actions.CHECK_AUTH.FAILURE, checkAuthFailure);
  yield takeLatest(Actions.USER_ONE.REQUEST, userOne);
  yield takeLatest(Actions.LOGIN.REQUEST, login);
  yield takeLatest(Actions.CERT_SIGN.REQUEST, certSign);
  // TEPASI YANGI ISH
  yield takeLatest(Actions.LOGIN_BY_TOKEN.REQUEST, loginByToken);
  yield takeLatest(Actions.CHECK.REQUEST, userCheckAuth);
  yield takeLatest(Actions.LINK_EMPLOYEE.REQUEST, linkEmployee);
  yield takeLatest(Actions.LOGOUT.REQUEST, logoutRequest);
  yield takeLatest(Actions.WELCOME_HOME.REQUEST, welcomeHome);
  yield takeLatest(Actions.GOOD_BYE_HOME.REQUEST, goodByeHome);
  yield takeLatest(Actions.CANCEL_GOOD_BYE_HOME.REQUEST, calcelGoodByeHome);
  yield takeLatest(Actions.CHANGE_MODE.REQUEST, change_mode);
  yield takeLatest(Actions.CHECK.SUCCESS, initWs);
  yield takeLatest(actionTypes.WEBSOCKET_CLOSED, websocketTryConnect);
}
