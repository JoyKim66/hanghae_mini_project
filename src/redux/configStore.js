import { legacy_createStore as createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {createBrowserHistory} from "history";
import {connectRouter} from "connected-react-router";

// 모듈
import User from "./modules/user";

export const history = createBrowserHistory();
const rootReducer = combineReducers({
	user: User,
	router: connectRouter(history),
})

const middlewares = [thunk.withExtraArgument({ history: history })];
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);
export default store;