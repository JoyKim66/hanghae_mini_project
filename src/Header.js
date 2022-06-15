import styled from "styled-components"
import jwtDecode from "jwt-decode";
import { useHistory, Link } from "react-router-dom";
import { localStorageGet } from "./shared/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { logoutFB } from "./redux/modules/user";
import { getCookie } from "./shared/cookie";

const Header = () => {
	const token = localStorageGet("jwtToken");
	const history = useHistory();
	const dispatch = useDispatch();
	const is_login = useSelector((state) => state.user);
	
	const logout = () => {
		dispatch(logoutFB());
	};

	if(!is_login.is_login && !token){
		return (
			<HeaderWrap>
			<HeaderInner>
				<h2><Link to="/">커피바라</Link></h2>
				<ul className="userInner">
					<li onClick={() => {
						history.push("/login")
					}}>로그인</li>
					<li onClick={() => {
						history.push("/signup")
					}}>회원가입</li>
				</ul>
			</HeaderInner>
		</HeaderWrap>
		)
	}
	const DecodedToken = jwtDecode(token);
	return (
		<HeaderWrap>
			<HeaderInner>
			<h2><a href="/">커피바라</a></h2>
			<ul className="userInner">
				<li>{DecodedToken.nickname}</li>
				<li onClick={() => {
						logout()
					}}>로그아웃</li>
			</ul>
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
		& li {margin: 0 20px; cursor: pointer;}
		& li:last-child {margin: 0}
	}
`

export default Header;