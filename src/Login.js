import { useEffect, useState } from "react";
import styled from "styled-components"
import { useDispatch } from 'react-redux';
import { loginCheck, loginFB } from "./redux/modules/user"
import { emailCheck } from './shared/common';
import { localStorageGet } from "./shared/localStorage";

const token = localStorageGet("jwtToken");

const Login = () => {
	const [userId, setId] = useState("");
	const [password, setPwd] = useState("");
	const dispatch =  useDispatch();

	const login = () => {
    if (userId === "" || password === "") {
      window.alert("아이디와 비밀번호를 모두 입력해주세요!");
      return;
    }

		if(!emailCheck(userId)){
			window.alert('아이디가 이메일 형식이 맞지 않습니다!');
      return;
		}

    dispatch(loginFB(userId, password));
  };

	useEffect(() => {
		token && dispatch(loginCheck());
	},[])
	
	return (
		<LoginInner>
				<H2>로그인</H2>
				<label>
					<Input type="text" placeholder="아이디(이메일)를 입력해주세요" onChange={(e) => {
						setId(e.target.value)
					}}/>
				</label>
				<label>
					<Input type="password" placeholder="비밀번호를 입력해주세요!" onChange={(e) => {
						setPwd(e.target.value)
					}}/>
				</label>
				<Btn onClick={login}>로그인하기</Btn>
				<SubText>아직 커피바라 계정이 없나요? <a href="/signup">회원가입</a></SubText>
		</LoginInner>
	);
}

const LoginInner = styled.div`
	max-width: 420px; 
	width: 100%;
	padding: 0 20px;
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
`

const Input = styled.input`
	width: 100%;
	min-width: 230px;
	box-sizing: border-box;
	padding: 10px;
	border: 2px solid #333;
	border-radius: 3px;
	margin-bottom: 20px;
`
const H2 = styled.h2`
	font-size: 26px;
	font-weight: 600;
	margin-bottom: 10px;
`

const Btn = styled.button`
	width: 100%;
	background-color: #333;
	color: #fff;
	padding: 10px;
	border-radius: 0.4em;
`

const SubText = styled.p`
	height: 30px;
	line-height: 30px;
	font-size: 10px;
	text-align: center;
	& a {
		font-weight: 600;
	}
`

export default Login;