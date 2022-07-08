import createSagaMiddleware from "redux-saga";
import { applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import reduxWebsocket from "@giantmachines/redux-websocket";
import sagas from "./sagas";
import axios from "axios";
import storage from "../storage";
import get from "lodash/get";

const reduxWebsocketMiddleware = reduxWebsocket();
const sagaMiddleware = createSagaMiddleware();

const list = [sagaMiddleware, ReduxPromise, reduxWebsocketMiddleware]; //reduxWebsocketMiddleware

const apply = applyMiddleware(...list);

const afterCreate = (store) => {
  sagaMiddleware.run(sagas);
  store.subscribe(() => {
    let state = store.getState();
    var tokenStorage = storage.get("token");
    var tokenState = get(state, "auth.token.token", null);
    if (tokenState) {
      axios.defaults.headers["Authorization"] = `Bearer ${tokenState}`;
      storage.set("token", get(state, "auth.token.token",null));
    } else if (tokenStorage) {
      axios.defaults.headers["Authorization"] = `Bearer ${tokenStorage}`;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  });
  return store;
};

export { apply, afterCreate };
