import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import axiosCalls from './apiCalls.js';


class LoginForm extends Component {
  constructor(props){
    super(props);

    console.log(this.props.type + " " + this.props.disp);
    if(this.props.type == this.props.disp){
      this.state={disp: 'block'};
    }
    else{
      this.state={disp: 'none'};
    }
    this.func = this.func.bind(this);
  }
  func(e) {
    //e.target.classList.toggle("show");
    if(this.props.type == 'register'){
      console.log(this.refs.email.value + " " + this.refs.password.value);
      const newEmail = this.refs.email.value;
      const newPassword = this.refs.password.value;

      axiosCalls.registerAPI(newEmail, newPassword);
    }

    else if(this.props.type == 'login'){
      console.log(this.refs.email.value + " " + this.refs.password.value)
      axios.post('http://localhost:3001/api/login',
      querystring.stringify({
              email: this.refs.email.value, //gave the values directly for testing
              password: this.refs.password.value
      }),{
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(function (response) {
        console.log(response);
        sessionStorage.setItem('jwtToken', response.data.token);
        //response.data.token and response.data.user   can be also accessed
      })
      .catch(function (error) {
        console.log(error.response);
        // response.data.error consists the actual error message
      });

    }
  }

  render() {

    const style = {
      display: this.state.disp,
      width: '0',
      height: '0'
    };
    return (
        <div style={style}>
          User-email
          <input ref='email' type='text'/><br></br>
          Password
          <input type='text' ref='password'/><br></br>
          <button onClick={this.func}>Submit</button>
        </div>
    );
  }
}

export default LoginForm;
