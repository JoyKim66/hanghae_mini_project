import { useState } from "react";
import styled from "styled-components"
import { useHistory } from "react-router-dom";

const Header = () => {
	const [token, settoken] = useState(false);
	const history = useHistory();
	return (
		<HeaderWrap>
			<HeaderInner>
			<h2><a href="/">홈</a></h2>
			{
				token 
				? (
					<ul className="userInner">
						<li>사용자명</li>
						<li>로그아웃</li>
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