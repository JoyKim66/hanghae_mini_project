import { setCookie, getCookie, deleteCookie } from "../../shared/cookie";
import axios from "axios";

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
		console.log("회원가입미듈웨어:", payload);
		axios.post("/db.json", {
			userId: payload.userId,
			password: payload.password,
			userName: payload.userName,
		})
		.then((res) => {
			window.alert("회원가입이 완료되었습니다!");
			history.replace("/login");
		})
		.catch((err) => {
			window.alert("중복된 아이디가 존재합니다.");
			console.log(err.response.data.errorMessage);
		});
	}
}

// 로그인 middleware
export const loginFB = (userId, password) => {
	return function (dispatch, getState, {history}){
		console.log(history)
		axios.post("/db.json", {
			userid: userId,
			password: password,
		})
		.then((res) => {
			console.log(res.headers.authorization.split("BEARER")[1]);
		})
	}
}

// 로그아웃 middleware
const logoutFB = () => {
	return function (dispatch, getState, {history}) {

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
			setCookie("is_login", "success");
			return {...state, user: action.user, is_login: true};
		}

		default : 
			return state;
	}
}

export default handleUser;