import {createStore} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension";
import reducers from './reducers';
import {apply, afterCreate} from "./middlewares";

export default function configureStore() {
    const store = createStore(reducers, composeWithDevTools(apply))
    return afterCreate(store);
}
