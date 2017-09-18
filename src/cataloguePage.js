import React, { Component } from 'react';
//import {Link} from 'react-router';
import axios from 'axios';
import {
  Route,
  Link,
  Redirect
} from 'react-router-dom'


import './App.css';
import './avatar.css';

class CataloguePage extends Component {
  constructor(props){
    super(props);
    this.state={
      success: true,
      catNames: []
    }
    this.funct = this.funct.bind(this);

    this.funct();
  }

  funct() {
    console.log(sessionStorage.getItem('jwtToken'));
    var url = 'http://localhost:3001/api/category/' + this.props.match.params.id;
    axios.get(url,
      {headers: {Authorization: sessionStorage.getItem('jwtToken') }}
    )
    .then((response)=> {
      console.log(response);
      //this.elem = response.data.categories;
      var newelement = [];
      for(var i=0; i<response.data.catalogues.length; i++){
        newelement.push(response.data.catalogues[i].title);
      }
      this.setState({success: true, catNames: this.state.catNames.concat(newelement) });
      return '<div>response</div>';
      //response.data.token and response.data.user can be also accessed
    })
    .catch((error)=>{
      console.log(error);
      //this.elem = error.response;
      this.setState({success: false});
      return '<div>Redirect to Login</div>';
      // response.data.error consists the actual error message
    });
  }

  render() {
    var categories = [];
    if(this.state.success){
      for(var i=0; i<this.state.catNames.length; i++){
          var url = '/categories/' + this.state.catNames[i].toLowerCase();
          categories.push(<div><a href={url}>{this.state.catNames[i]}</a></div>);
      }
      return <div>{categories}</div>
    }
    else{
      return <Redirect to={{pathname: '/login'}}/>
      //return <div>Redirecting to Login Page</div>;
    }
  }
}

export default CataloguePage;
