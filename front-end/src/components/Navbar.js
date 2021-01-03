import React ,{useState, useContext} from 'react';
import {Link, NavLink, withRouter}  from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext.js';
import hideORshow from '../components/hideORshow'
import './CSS/Navbar.css'


const Navbar = ()=>{
    
    const {authLog,dispatch} = useContext(AuthContext)
    const styleLog=(authLog.isAuthenticated)?('hide'):('loginBtn')
   
return(
    
        <nav className='navbar sidenav' id='navbar'>
            <ul className='override'>
                <div className='otherBtn'>
                <NavLink exact to='/' className='navlink'><li>Home</li></NavLink>
                <NavLink to='/blog' className='navlink'><li>Blog</li></NavLink>
                <button className='toggleBtn' onClick={hideORshow}>☰ Menu</button>
                </div>
                <div className={styleLog}>
                <NavLink to='/user/login' className='navlink'><li>Login</li></NavLink>
                <NavLink to='/user/signup' className='navlink'><li>Signup</li></NavLink>
                </div>
            </ul>
        </nav>
    
)
}


export default Navbar