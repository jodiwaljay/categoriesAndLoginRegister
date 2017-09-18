import React, { Component } from 'react';
import Header from './header.js';
import App_sidebar from './app-sidebar.js';
import Home from './home_with_sidebar.js';
import './App.css';

class App extends Component {
  render() {
    return (
      /*
      <div className="App">
        <App_sidebar>
        <Header/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        </App_sidebar>
      </div>*/
      <Home/>
    );
  }
}

export default App;
