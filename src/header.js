import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './App.css';
import './avatar.css';

class Header extends Component {

  func(e) {
    e.target.classList.toggle("show");
  }

  render() {

    const svgStyle = {
      position: 'absolute',
      width: '0',
      height: '0'
    };
    return (
        <div className="App-header">

        <div className="Header-links">
          <ul className="navbar">

            <li><Link to='login' > Login </Link></li>
            <li><Link to='register' > Register </Link></li>
            <li><Link to='categories' > Categories </Link></li>
            <li><Link to='test' onClick={this.funct} > Test </Link></li>
            <li className="dropdown">
              <a href="#" className="dropbtn"> Dropdown</a>
              <div className="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </li>
          </ul>
        </div>

        <div className="profile_card" onClick={this.func}>
            <img className="circle" height="32" width="32" src="http://www.foolproof.co.uk/media/466535/Luke-Burroughs.jpg" alt=""/>
            <div className="profile_content">
              <div>Link1ashdfjjkjsbdkjf</div>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
        </div>



        </div>

    );
  }
}

export default Header;
