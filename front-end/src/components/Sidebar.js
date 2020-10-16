import React ,{useState, useContext}from 'react';
import {useHistory,Redirect, Link} from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import '../components/CSS/Sidebar.css'




const Sidebar =()=>{

    const {authLog,dispatch} = useContext(AuthContext)

    console.log('is user auhtenticated?:', authLog.isAuthenticated)
    const userOBJ=(authLog.isAuthenticated)?(authLog.user):null;
    console.log('userobj 1', userOBJ)
    
    console.log('AuthLOg:',userOBJ)

    return(
        <div className='sidebar'>
            <div className='loginDetails'>
                {console.log('userobj 2', userOBJ)}
            {userOBJ!=null?(<h4>hello {userOBJ.username}</h4>):(<h4>You are not logged in</h4>)}
            {authLog.isAuthenticated?(<Link to='/user/logout'><h5>Logout</h5></Link>):<Link to='/user/login'><h4>Login</h4></Link>}
            </div>
            <hr />
            <div className='createBtn'>
            <Link to='/blog/create' className='link'><button>Create New Post</button></Link>
            </div>
            
        </div>
    )
}


export default Sidebar