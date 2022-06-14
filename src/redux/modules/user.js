
import axios from "axios";
import jwtDecode from "jwt-decode";
import { localStorageRemove, localStorageSet } from "../../shared/localStorage";
import { setCookie } from "../../shared/cookie";

// Actions Type
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_ID = "GET_ID";



// Action creators
const logIn = (user) => ({type: LOG_IN, user});
const logOut = (user) => ({type: LOG_OUT, user});
const getId = (user) => ({type: GET_ID, user});


// 회원가입 middleware
export const signUpFB = (payload) => {
	return function (dispatch, getState, { history }) {
		axios.post("http://3.38.107.48/user/signup", {
			userid: payload.userid,
			password: payload.password,
			nickname: payload.nickname,
		})
		.then((res) => {
			if(res.data){
				window.alert("회원가입이 완료되었습니다!");
				history.replace("/login");
			}
		})
		.catch((err) => {
			window.alert("회원가입에 실패했습니다!");
		});
	}
}

// 아이디 중복 검사 middleware
export const idDoubleCheckFB = (userId) => {
	return function (dispatch, getState, {history}){
		axios.post("http://3.38.107.48/user/signup/useridCheck", {
			userid: userId
		})
		.then((res) => {
			if(res.data){
				window.alert("사용가능한 아이디 입니다.");
			} else {
				window.alert("중복되는 아이디 입니다.");
			}
			dispatch(
				getId({
					is_double_check: res.data
				})
			)
		})
		.catch((err) => {
			console.log(err);
		});
	}
}

// 로그인 middleware
export const loginFB = (userId, password) => {
	return function (dispatch, getState, {history}){
		axios.post("http://3.38.107.48/user/login", {
			userid: userId,
			password: password,
		})
		.then((res) => {
			const token = res.data.accessToken;
			//받아온 토큰 속에서 유저네임 찾아내기!
			const DecodedToken = jwtDecode(token);
			localStorageSet("jwtToken", token);
			setCookie("userId", userId);
			setCookie("nickname", DecodedToken.nickname);
			dispatch(
				logIn({
					is_login: true,
					userId: userId,
					nickname: DecodedToken.nickname,
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

// 로그아웃 middleware
export const logoutFB = () => {
	return function (dispatch, getState, {history}) {
		localStorageRemove("jwtToken");
		dispatch(logOut());
		window.alert("로그아웃 되었습니다.")
	}
}

// initialState
const initialState = {
	user: {
    userId: "",
    nickname: ""
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

		case GET_ID: {
			return {...state, is_double_check: true};
		}

		default : 
			return state;
	}
}

export default handleUser;