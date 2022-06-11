
import axios from "axios";
import { localStorageRemove, localStorageSet } from "../../shared/localStorage";

// Actions Type
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// Action creators
const logIn = (user) => ({type: LOG_IN, user});
const logOut = (user) => ({type: LOG_OUT, user});
const getUser = (user) => ({type: GET_USER, user});

// 회원가입 middleware
export const signUpFB = (payload) => {
	return function (dispatch, getState, { history }) {
		console.log(dispatch)
		console.log(getState)
		axios.post("http://localhost:5001/user/signup", {
			userId: payload.userId,
			password: payload.password,
			userName: payload.userName,
		})
		.then((res) => {
			console.log(res.data)
			if(res.data){
				window.alert("회원가입이 완료되었습니다!");
				history.replace("/");
			} 
		})
		.catch((err) => {
			window.alert("중복된 아이디가 존재합니다.");
			console.log(err);
		});
	}
}

// 아이디 중복 검사 middleware
export const idDoubleCheckFB = (userId) => {
	return function (dispatch, getState, {history}){
		axios.post("http://localhost:5001/user/signup/useridCheck", {
			userid: userId
		})
		.then((res) => {
			if(res.data.result){
				window.alert("중복되는 아이디 입니다.");
			} else {
				window.alert("사용가능한 아이디 입니다.");
			}
		})
		.catch((err) => {
			console.log(err);
		});
	}
}

// 로그인 middleware
export const loginFB = (userId, password) => {
	return function (dispatch, getState, {history}){
		axios.post("/db.json", {
			userid: userId,
			password: password,
		})
		.then((res) => {
			const token = res.token;
			localStorageSet("jwtToken", token);
			dispatch(
				logIn({
					is_login: true,
					userId: userId
				})
			);
		})
	}
}

// 로그아웃 middleware
export const logoutFB = () => {
	return function (dispatch, getState, {history}) {
		localStorageRemove("jwtToken");
		dispatch(logOut());
		history.replace("/");
	}
}

// initialState
const initialState = {
	userInfo: {
    userId: "",
    userName: "",
  },
  is_login: false,
}

// Reducer
const handleUser = (state = initialState, action = {}) => {
	switch(action.type) {
		case LOG_IN: {
			console.log("유저정보 ", state);
			return {...state, user: action.user, is_login: true};
		}

		default : 
			return state;
	}
}

export default handleUser;