import React ,{useState, useContext}from 'react';
import {useHistory,Redirect, Link} from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import hideORshow from '../components/hideORshow'
import '../components/CSS/Sidebar.css'
import {ReactComponent as ReactIcon} from '../components/CSS/vector/default-monochrome.svg';



const Sidebar =()=>{

    const {authLog,dispatch} = useContext(AuthContext)

    console.log('is user auhtenticated?:', authLog.isAuthenticated)
    const userOBJ=(authLog.isAuthenticated)?(authLog.user):null;
    console.log('userobj 1', userOBJ)
    
    console.log('AuthLOg:',userOBJ)

    return(
        <div className='sidebar'>
            <button className='toggleBtn2' onClick={hideORshow}>X</button>
            <div className='loginDetails'>
                {console.log('userobj 2', userOBJ)}
            {userOBJ!=null?(<h4>hello {userOBJ.username}</h4>):(<h4>You are not logged in</h4>)}
            {authLog.isAuthenticated?(<Link to='/user/logout'  className='inOut'><h5>Logout</h5></Link>):<Link to='/user/login' className='inOut'><h4>Login</h4></Link>}
            </div>
            <hr />
            <div className='createBtn'>
            <Link to='/blog/create' className='link'><button>Create New Post</button></Link>
            </div>
            <hr />
            <div className='links'>
            <ul>
            
            <Link to='/' className='footerList' ><li>Home</li></Link>
            <Link to='/blog' className='footerList' ><li>Blog</li></Link>
            <Link to='/about' className='footerList'><li>About</li></Link>
            <Link to='/contact' className='footerList'><li>Contact</li></Link>
            </ul>    
                
            
                

            </div>
            <hr />
            <div className='svg'>
            <ReactIcon />
            <h4>mail@yourblog.com</h4>
            <a className='footerList' href='https://www.privacypolicygenerator.info/live.php?token=hEVMqbBGLfwj7NVug4WehyRJGlyHnXYd'>Privacy Polity</a>
            </div>
           
            
        </div>
    )
}


export default Sidebar