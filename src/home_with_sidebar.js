import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Sidebar from 'react-sidebar';
import MaterialTitlePanel from './material_title_panel';
import Header from './header.js';
import LoginForm from './login_form.js';
import {Link, Redirect} from 'react-router-dom';
import {BrowserRouter, Route} from 'react-router-dom';

const styles = {
  contentHeaderMenuLink: {

    color: 'white',
    padding: 8,
  },
  content: {
    padding: '16px',
  },
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.disp);
    this.state = {
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30,
      disp: 'register',
      obj: {}
    };

    this.renderPropCheckbox = this.renderPropCheckbox.bind(this);
    this.renderPropNumber = this.renderPropNumber.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.func = this.func.bind(this);
  }

  onSetOpen(open) {
    this.setState({open: open});
  }

  menuButtonClick(ev) {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }

  renderPropCheckbox(prop) {
    const toggleMethod = (ev) => {
      const newState = {};
      newState[prop] = ev.target.checked;
      this.setState(newState);
    };

    return (
      <p key={prop}>
        <input type="checkbox" onChange={toggleMethod} checked={this.state[prop]} id={prop} />
        <label htmlFor={prop}> {prop}</label>
      </p>);
  }

  renderPropNumber(prop) {
    const setMethod = (ev) => {
      const newState = {};
      newState[prop] = parseInt(ev.target.value, 10);
      this.setState(newState);
    };

    return (
      <p key={prop}>
         {prop} <input type="number" onChange={setMethod} value={this.state[prop]} />
      </p>);
  }

  func() {
    console.log(sessionStorage.getItem('jwtToken'));

    axios.get('http://localhost:3001/api/auth',

      {headers:{
        Authorization: sessionStorage.getItem('jwtToken')
      }}
    )
    .then(function (response) {
      console.log(response);
      //this.setState({obj: {success: true, msg: response}});
      var obj = {success: true, msg: response};
      return <div>obj.msg</div>;
      //response.data.token and response.data.user can be also accessed
    })
    .catch((error)=>{
      console.log(error.response);
      this.setState({obj: {success: false, msg: error.response}});
      var obj = {success: false, msg: error.response};
      return <Redirect to="/login"/>;
      // response.data.error consists the actual error message
    });
  }

  render() {
    const sidebar = <Header />;


/*    const contentHeader = (
      <span>
        {!this.state.docked &&
         <a onClick={this.menuButtonClick} href="#" style={styles.contentHeaderMenuLink}>=</a>}
        <span> React Sidebar</span>
      </span>);
*/
    const divStyle = {
        display: 'flex',

        flexDirection: 'row'
    };

    const contentHeader = <div style={divStyle} className="mainHeader">
      {!this.state.docked &&
       <div onClick={this.menuButtonClick} href="#" style={styles.contentHeaderMenuLink}><div className="bar1"></div>
  <div className="bar2"></div>
  <div className="bar3"></div></div>}<Header/></div>

    const sidebarProps = {
      sidebar: sidebar,
      docked: this.state.docked,
      sidebarClassName: 'custom-sidebar-class',
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen,
    };
    var obj = {};
    //console.log(this.func());
    if(this.props.disp == 'categories'){
      this.func();
    }

    return (
      <Sidebar {...sidebarProps}>
        <MaterialTitlePanel title={contentHeader}>

          <button><Link to='login' > Login </Link></button>

          <button><Link to='register' > Register </Link></button>
          <button onClick={()=>{sessionStorage.removeItem('jwtToken');}}><Link to='/' > Logout </Link></button>
          <br></br>
          <LoginForm type='login' disp={this.props.disp}/>
          <br></br>
          <LoginForm type='register' disp={this.props.disp}/>
          <br></br>
          <button onClick={this.func}>Test</button>

        </MaterialTitlePanel>
      </Sidebar>
    );
  }
}

export default Home;
