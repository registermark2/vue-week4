const url = 'https://vue3-course-api.hexschool.io/v2/';
const path = 'tatw';


// account
const emailInput = document.querySelector('#username');
const pwInput = document.querySelector('#password');
const loginBtn = document.querySelector('#login');
const checkLoginByn = document.querySelector('#checkLogin');
const getProductListBtn = document.querySelector('#getProductList');
loginBtn.addEventListener('click', login);

// 登入
function login() {
  const username = emailInput.value;
  const password = pwInput.value;

  const user = {
    username,
    password
  }

  //登入，儲存token
  axios.post(`${url}/admin/signin`, user)
    .then((res) => {
      // console.log(res);
      const { token, expired } = res.data;
      document.cookie = `tatw=${token}; expired=${new Date(expired)}; `;
      window.location = "./productList.html";
    })
    .catch((error) => {
      // console.dir(error);
      window.location='index.html';
      alert('帳號密碼錯誤，請重新輸入');
    })
}
// 確認登入
// checkLoginByn.addEventListener('click', checkLogin);
// function checkLogin() {
//   // 取得token
//   const token = document.cookie.replace(/(?:(?:^|.*;\s*)tatw\s*\=\s*([^;]*).*$)|^.*$/, "$1");
//   axios.defaults.headers.common['Authorization'] = token;
//   // console.log(token);

//   // 確認是否登入
//   axios.post(`${url}/api/user/check`)
//     .then((res) => {
//       console.log(res.data);
//       window.location = "/productList.html"
//     })
//     .catch((error) => {
//       console.dir(error);
//     })
// }

// // 取得產品列表
// getProductListBtn.addEventListener('click', getProductList);
// function getProductList() {
//   // 取得token
//   const token = document.cookie.replace(/(?:(?:^|.*;\s*)tatw\s*\=\s*([^;]*).*$)|^.*$/, "$1");
//   axios.defaults.headers.common['Authorization'] = token;
//   // console.log(token);

//   // 確認是否登入
//   axios.get(`${url}/api/${path}/admin/products`)
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((error) => {
//       console.dir(error);
//     })
// }
