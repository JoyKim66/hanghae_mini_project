//쿠키가져오는것
const getCookie = (name) => {
  let value = "; " + document.cookie;

  let parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};
//쿠키저장
const setCookie = (Authorization, value, exp = 5) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = `${Authorization}=${value}; expires=${date.toUTCString()}`;
};
//유효기간을 앞으로 땡겨서 만료시켜주는!
const deleteCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};

export { getCookie, setCookie, deleteCookie };
