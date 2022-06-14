import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { emailCheck } from './shared/common';
import { idDoubleCheckFB, signUpFB } from "./redux/modules/user"
import { localStorageGet } from './shared/localStorage';

const token = localStorageGet("jwtToken");

const Signup = () => {
	const [userid, setId] = useState("");
	const [password, setPwd] = useState("");
	const [pwd_check, setPwdCheck] = useState("");
	const [nickname, setUserName] = useState("");
	const dispatch = useDispatch();
	const id_check = useSelector((state) => state.user.is_double_check);

	const idDoubleCheck = () => {
		if (!userid) {
      window.alert("아이디를 입력해주세요!");
      return;
    }

		dispatch(idDoubleCheckFB(userid));
	}

	const signupFu = () => {
		if (!userid || !password || !nickname) {
      window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요!");
      return;
    }

    if(!emailCheck(userid)){
      window.alert('이메일 형식이 맞지 않습니다!');
      return;
    }

		if (password !== pwd_check) {
      window.alert("패스워드와 패스워드 확인이 일치하지 않습니다!");
      return;
    }

		if( !id_check ){
			window.alert("중복확인 버튼을 눌러주세요");
      return;
		}

		const new_obj = {userid, password, nickname}
		dispatch(signUpFB(new_obj))
  }

	return (
		<SignupInner>
			<H2>회원가입</H2>
			<label>
				<p>아이디</p> 
				<Input onChange={(e) => {
					setId(e.target.value);
				}} placeholder="아이디(이메일)"/>
				<button className='id_double_check' onClick={idDoubleCheck}>중복확인</button>
			</label>
			<label>
				<p>닉네임</p> 
				<Input onChange={(e) => {
					setUserName(e.target.value)
				}} placeholder="닉네임을 입력해주세요"/>
			</label>
			<label>
				<p>비밀번호</p>
				<Input type="password" onChange={(e) => {
					setPwd(e.target.value)
				}} placeholder="비밀번호"/>
				<Input type="password" className='pwConfirm' onChange={(e) => {
					setPwdCheck(e.target.value)
				}} placeholder="비밀번호 확인"/>
			</label>
			
			<Btn onClick={signupFu}>회원가입</Btn>
		</SignupInner>
	);
}

const SignupInner = styled.div`
	max-width: 420px; 
	width: 100%;
	padding: 0 20px;
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	& label {
		display: block;
		margin-bottom: 20px;
		position: relative;
		& .pwConfirm {
			margin-top: 10px;
		}
		& .id_double_check {
			font-size: 12px;
			background-color: #333;
			color: #fff;
			padding: 5px 8px;
			border-radius: 0.4em;
			position: absolute;
			top: 50%;
			right: 10px;
			transform: translateY(-10%);
		}
		& p {
			font-size:12px;
			margin-bottom: 4px;
			font-weight: 600;
		}
	}
`

const Input = styled.input`
	width: 100%;
	min-width: 230px;
	box-sizing: border-box;
	padding: 10px;
	border: 2px solid #333;
	border-radius: 3px;
	&::placeholder {
		font-size: 12px;
	}
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
export default Signup;