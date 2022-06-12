import { useState } from "react";
import styled from "styled-components"
import { useHistory } from "react-router-dom";
import { localStorageGet } from "./shared/localStorage";
import { logoutFB } from "./redux/modules/user";
import { useDispatch, useSelector } from "react-redux";

const token = localStorageGet("jwtToken");

const Header = () => {
	const [useToken, setUseToken] = useState(token);
	const history = useHistory();
	const select = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const logout = () => {
		setUseToken(!useToken)
		dispatch(logoutFB());
	};

	return (
		<HeaderWrap>
			<HeaderInner>
			<h2><a href="/">홈</a></h2>
			{
				select.is_login
				? (
					<ul className="userInner">
					<li>사용자명</li>
					<li onClick={() => {
						logout()
					}}>로그아웃</li>
					</ul>
				)
				: (
					<ul className="userInner">
						<li onClick={() => {
							history.push("/login")
						}}>로그인</li>
						<li onClick={() => {
							history.push("/signup")
						}}> 회원가입</li>
					</ul>
				) 
			}
			</HeaderInner>
		</HeaderWrap>
	);
}

const HeaderWrap = styled.div`
	border-bottom: 1px solid #eee;
	box-shadow: rgb(0 0 0 / 8%) 0px 0px 8px;
`
const HeaderInner = styled.div`
	max-width: 960px;
	width: 100%;
	height: 50px;
	line-height: 50px;
	padding: 0 20px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;

	& .userInner {
		display: flex;
		& li {margin: 0 20px}
		& li:last-child {margin: 0}
	}
`

export default Header;