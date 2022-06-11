import React, { useState } from 'react';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { emailCheck } from './shared/common';
import { signUpFB } from "./redux/modules/user"

const Signup = () => {
	const [id, setId] = useState("");
	const [pwd, setPwd] = useState("");
	const [pwd_check, setPwdCheck] = useState("");
	const [user_name, setUserName] = useState("");
	const dispatch = useDispatch();

	const signupFu = async () => {
		if (!id || !pwd || !user_name) {
      window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요!");
      return;
    }

    if(!emailCheck(id)){
      window.alert('이메일 형식이 맞지 않습니다!');
      return;
    }

		if (pwd !== pwd_check) {
      window.alert("패스워드와 패스워드 확인이 일치하지 않습니다!");
      return;
    }
		const new_obj = {id, pwd, user_name}
		dispatch(signUpFB(new_obj))
  }

	return (
		<SignupInner>
			<H2>회원가입</H2>
			<label>
				<p>아이디</p> 
				<Input onChange={(e) => {
					setId(e.target.value);
				}} placeholder="이메일"/>
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
		& .pwConfirm {
			margin-top: 10px;
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