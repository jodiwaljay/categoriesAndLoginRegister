import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Home from '../home_with_sidebar.js';
import CategoryPage from '../categories.js';
import CataloguePage from '../cataloguePage.js';
import dashboard from '../dashboard.js';

const routes = (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/login" component={() => (<Home disp="login" />)} />
      <Route path="/register" component={() => (<Home disp="register" />)} />
      <Route exact path="/categories" component={CategoryPage} />
      <Route path="/categories/:id" component={CataloguePage}/>
    </div>
  </BrowserRouter>
);

export default routes;
