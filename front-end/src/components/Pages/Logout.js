import React ,{useState, useContext}from 'react';
import {useHistory,Redirect, Link} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios'




const Logout =()=>{

    const {authLog,dispatch} = useContext(AuthContext)

     axios.get('/apiEndpoint/CREATE/user/logout').then((res)=>{
     
      if(res.data==='Logout Success'){
        dispatch({type: 'LOGOUT'});
        
      }
  }).catch((err)=>{
      console.log(err)
  })
    
    
  

    return(
        <div >
            <h1>You are logged out!!!!</h1>
            {<Redirect to='/' />}
        </div>
        
    )
}


export default Logout