import { legacy_createStore as createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {createBrowserHistory} from "history";
import {connectRouter} from "connected-react-router";

// 모듈
import User from "./modules/user";
import post from "./modules/post";


export const history = createBrowserHistory();
const rootReducer = combineReducers({
	user: User,
	router: connectRouter(history),
	post
})

const middlewares = [thunk.withExtraArgument({ history: history })];
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);
export default store;