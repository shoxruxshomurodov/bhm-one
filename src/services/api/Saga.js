import { all, call, put, takeEvery } from "redux-saga/effects";
import Actions from "./Actions";
import Api from "./Api";
import Normalizer from "./../normalizr";
import NormalizerAction from "../normalizr/actions";

function* getAll(action) {
  const {
    payload: {
      url,
      config,
      scheme = {},
      storeName,
      entityName,
      callback,
      cb = {
        success: () => {},
        fail: () => {},
      },
    },
  } = action;
  try {
    const { data } = yield call(Api.getAll, url, config);
    const normalizedData = yield call(Normalizer.Normalize, data, scheme);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: { ...normalizedData, storeName, entityName },
    });
    try {
      yield call(cb.success, data);
      yield call(callback, data);
    } catch (e) {}
    yield put({ type: Actions.GET_ALL.SUCCESS, payload: normalizedData });
  } catch (e) {
    yield put({
      type: Actions.GET_ALL.FAILURE,
      payload: { storeName, errors: e.response.data },
    });
    yield put({
      type: NormalizerAction.NORMALIZE.FAILURE,
      payload: { storeName, errors: e.response.data },
    });
    yield call(cb.fail, e);
  }
}
function* getAllTrigger(action) {
  const {
    payload: { storeName },
  } = action;
  yield put({
    type: NormalizerAction.NORMALIZE.TRIGGER,
    payload: { storeName },
  });
}

function* getOne(action) {
  const {
    payload: { url, config, scheme = {}, storeName, entityName, callback },
  } = action;
  try {
    const { data } = yield call(Api.getOne, url, config);
    const normalizedData = yield call(Normalizer.Normalize, data, scheme);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: { ...normalizedData, storeName, entityName },
    });
    try {
      yield call(callback, data);
    } catch (e) {}
    yield put({ type: Actions.GET_ONE.SUCCESS, payload: normalizedData });
  } catch (e) {
    yield put({
      type: Actions.GET_ONE.FAILURE,
      payload: { storeName, errors: e.response.data },
    });
    yield put({
      type: NormalizerAction.NORMALIZE.FAILURE,
      payload: { storeName, errors: e.response.data },
    });
  }
}
function* getOneTrigger(action) {
  const {
    payload: { storeName },
  } = action;
  yield put({
    type: NormalizerAction.NORMALIZE.TRIGGER,
    payload: { storeName },
  });
}

function* deleteItemRequest(action) {
  const {
    payload: {
      id,
      url,
      attributes,
      config = {},
      scheme = {},
      storeName,
      entityName,
      cb = {
        success: () => {},
        fail: () => {},
      },
    },
  } = action;
  try {
    const { data } = yield call(Api.remove, url, attributes, config);
    yield call(cb.success, data);
    yield put({
      type: Actions.OPERATION_DELETE.SUCCESS,
      payload: { id, storeName, scheme, entityName },
    });
  } catch (e) {
    yield put({
      type: Actions.OPERATION_DELETE.FAILURE,
    });
    yield call(cb.fail, e);
  }
}

function* addItemRequest(action) {
  const {
    payload: {
      attributes,
      url,
      scheme = {},
      storeName,
      entityName,
      cb = {
        success: () => {},
        fail: () => {},
      },
    },
  } = action;
  try {
    const { data } = yield call(Api.add, url, attributes);
    const normalizedData = yield call(Normalizer.Normalize, data, scheme);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: `${entityName}-create`,
        entityName: entityName,
      },
    });
    yield call(cb.success, normalizedData, data);
    yield put({
      type: Actions.OPERATION_ADD.SUCCESS,
      payload: { ...normalizedData, storeName, scheme, entityName },
    });
  } catch (e) {
    yield put({
      type: Actions.OPERATION_ADD.FAILURE,
    });
    yield call(cb.fail, e);
  }
}

function* updateItemRequest(action) {
  const {
    payload: {
      attributes,
      url,
      formMethods = {
        setIsFetched: () => {},
      },
      scheme = {},
      storeName,
      entityName,
      cb = {
        success: () => {},
        fail: () => {},
      },
    },
  } = action;
  try {
    const { data } = yield call(Api.update, url, attributes);
    const normalizedData = yield call(Normalizer.Normalize, data, scheme);
    yield put({
      type: NormalizerAction.NORMALIZE.REQUEST,
      payload: {
        ...normalizedData,
        storeName: `${entityName}-update`,
        entityName: entityName,
      },
    });
    yield put({ type: Actions.OPERATION_UPDATE.SUCCESS });
    yield call(cb.success, normalizedData, data);
  } catch (e) {
    yield put({
      type: Actions.OPERATION_UPDATE.FAILURE,
    });
    yield call(cb.fail, e);
    formMethods.setIsFetched(false);
  }
}

export default function* sagas() {
  yield all([
    takeEvery(Actions.GET_ALL.REQUEST, getAll),
    takeEvery(Actions.GET_ONE.REQUEST, getOne),
    takeEvery(Actions.GET_ALL.TRIGGER, getAllTrigger),
    takeEvery(Actions.GET_ONE.TRIGGER, getOneTrigger),
    takeEvery(Actions.OPERATION_DELETE.REQUEST, deleteItemRequest),
    takeEvery(Actions.OPERATION_ADD.REQUEST, addItemRequest),
    takeEvery(Actions.OPERATION_UPDATE.REQUEST, updateItemRequest),
  ]);
}
