
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
		axios.post("http://localhost:5001/user/signup", {
			userId: payload.userId,
			password: payload.password,
			userName: payload.userName,
		})
		.then((res) => {
			if(res.data){
				window.alert("회원가입이 완료되었습니다!");
				dispatch(
					logIn({
						is_login: true
					})
				);
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
		axios.post("http://localhost:5001/user/login", {
			userid: userId,
			password: password,
		})
		.then((res) => {
			const token = res.data.accessToken;
			localStorageSet("jwtToken", token);
			dispatch(
				logIn({
					is_login: true,
					userId: userId
				})
			);
			window.alert("로그인 되었습니다.");
			history.replace("/");
		})
		.catch((error) => {
			window.alert("아이디와 비밀번호를 다시한번 확인해주세요.");
			console.log("Login Error", error);
		});
	}
}

// 로그인 중복 검사 middleware
export const loginCheck = () => {
	return function (dispatch, getState, {history}){
		axios.get("http://localhost:5001/user/loginCheck")
		.then((res) => {
			if(res.data.result){
				return
			} else {
				window.alert("다시 로그인 해주세요");
				history.replace("/login");
			}
		})
	}
};

// 로그아웃 middleware
export const logoutFB = () => {
	return function (dispatch, getState, {history}) {
		axios.get("http://localhost:5001/user/logout")
		.then((res) => {
			localStorageRemove("jwtToken");
			dispatch(logOut());
			window.alert(res.data.result)
			history.replace("/login");
		})
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
			return {...state, user: action.user, is_login: true};
		}

		case LOG_OUT: {
			localStorageRemove("jwtToken");
			return {...state, user: action.user, is_login: false};
		}

		case GET_USER: {
			return state;
		}

		default : 
			return state;
	}
}

export default handleUser;