

import React, { Component,useState, useEffect, lazy } from 'react';
import Cookies from 'js-cookie';

import { Link, Redirect } from 'react-router-dom';
const axios = require('axios').default;



const CreateComment=(props)=>{
    var commentStr={
        body:''
        
    }
    const [comment, setComment] = useState(commentStr);
   
    
         
    
    
         const handleSubmit=(e)=>{
             e.preventDefault()
             console.log('This is the id:',props.post.id)
             axios.post(`http://localhost:2000/apiEndpoint/CREATE/comment/${props.post.id}`,{
                 body:comment.body
             },
             {withCredentials:true},{
                headers: {
                      'Content-Type': 'application/json'
              }}).then(res=>{
                  console.log(res);
                  
                  props.onCommentCreate(res.data)
                  setComment({ ...comment, body: '' });
                  
                })
         }
     
    
    
        const handleChange=(e)=>{
            const {name,value}=e.target
            setComment({ ...comment, [name]: value });
            
        }
    
   
   
        return(
            <div className='commentContainer'>
            <form onSubmit={handleSubmit}>
                <div className='commentFlex'>
                
                
                <input type="text" name='body' onChange={handleChange} value={comment.body} placeholder='Write something'/>
                <button className='cmtBtn'>Submit</button>
                </div>
            </form>
            
                
            
            </div>
        )

    

}


export default CreateComment