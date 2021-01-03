import React, { Component } from 'react';
import CreateArticle from './components/Pages/CreateArticle'
import Blog from './components/Pages/Blog'
import Navbar from './components/Navbar.js';

import {BrowserRouter as Router, Route, Switch, withRouter, Link} from 'react-router-dom'
import Home from './components/Pages/Home.jsx'
import About from './components/Pages/About'
import Contact from './components/Pages/Contact'
import Singup from './components/Pages/Signup'
import Login from './components/Pages/Login'
import Page from './components/Pages/Page'
import AuthContextProvider from './contexts/AuthContext';
import RecentContextProvider from './contexts/RecentContext';
import Logout from './components/Pages/Logout.js';
import Sidebar from './components/Sidebar';
import '../src/components/CSS/Sidebar.css'

class App extends React.Component{
  constructor(props){
  super(props);
  this.state= {
    posts:[ 
      
    ]
  
}}



render() {

  return (
    <div className="App">
    
      <Router>
        <RecentContextProvider>
      <AuthContextProvider>
        <Navbar />
        
        <Switch>
        
          <Route exact path="/"  component={Home} />
          <Route exact strict path="/blog/page/:postTitle" component={Page} />
          <Route exact path="/blog/create" exact component={CreateArticle} />

          <Route exact path="/blog" component={Blog} />

          <Route path="/user/signup" component={Singup} />
              
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/user/logout" component={Logout} />

          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          
          
        </Switch>
        <div className='tenPer scale-in-hor-right show'>
            <Sidebar />
          </div>
        </AuthContextProvider>
        </RecentContextProvider>
      </Router>
      
      
      
      
      
    </div>
  );
}
}



export default App;
