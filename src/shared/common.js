import {BASE_URL} from '../assets/config';
import { localStorageGet } from './localStorage';

// 이메일형식
export const emailCheck = (email) => {
	let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;
	return _reg.test(email);
};

// 비밀번호
// 영문, 숫자, 특수문자(공백제외)만 허용, 2개 이상 조합
export const passwordCHK = (password) => {
  let _reg = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?=[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{10,25}$/
  
  return _reg.test(password);
}

// 동일한 문자 3개이상 연속 불가
export const passwordCHK1 = (password) => {
  let _reg = /(\w)\1\1/;

  return _reg.test(password);
}


// 닉네임(이름) 형식: 한글 또는 알파벳 대소문자(a~z, A~Z)
export const usernameCHK = (username) => {
  let _reg = /^[가-힣a-zA-Z]+$/;
  return _reg.test(username);
};

// 무한스크롤
export const getComment = async ({
  sortBy = 'id', 
  page = 1,
  post_id,
  size = 5}) => {
  const query = `sortBy=${sortBy}&page=${page}&size=${size}`;
  const response = await fetch(`${BASE_URL}/reply/list/paging/${post_id}?${query}`,{
    headers: {
      'Authorization': "Bearer " + localStorageGet("jwtToken") ,
    },
  });
  const body = await response.json();
  return body;
}