import axios from 'axios';
import querystring from 'querystring';
var axiosCalls = {};

axiosCalls.registerAPI = function(email, password){
  axios.post('http://localhost:3001/api/register',
  querystring.stringify({
          'email': email,
          'password': password
  }),{
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
  .then(function (response) {
    console.log(response);
    //response.data.token and response.data.user can be also accessed
    axiosCalls.verificationEmailAPI(email);
  })
  .catch(function (error) {
    console.log(error.response);
    // response.data.error consists the actual error message
    axiosCalls.verificationEmailAPI(email);
  });
}

axiosCalls.verificationEmailAPI = function(email){
  axios.post('http://localhost:3001/api/emailVerification',
  querystring.stringify({
          'email': email, //gave the values directly for testing
  }),{
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
  .then(function (response) {
    console.log(response);
    //response.data.token and response.data.user can be also accessed
  })
  .catch(function (error) {
    console.log(error);
    // response.data.error consists the actual error message
  });
}

export default axiosCalls;
