import React, { Component,useState,useContext, useEffect, lazy } from 'react';
import Cookies from 'js-cookie';
import '../components/CSS/ArticleCard.css'
import { Link, Redirect } from 'react-router-dom';

const axios = require('axios').default;



const ArticleCard=()=>{
    const [posts,setPosts] = useState(
    {postAll:[{}]}
       ) 
    
    
    useEffect(()=>{
         axios.get('http://localhost:2000/apiEndpoint/READ')
            .then(res=>{
                
                setPosts({...posts, postAll: res.data.post})
                
               
    
    })
    },[])
     
    
    
      
    
    const articles =posts.postAll.map(post=>{
        const uniqueID=post._id
        
        const date= new Date(post.createdAt)
        console.log(post)
        
        
        return(
                
                <div key={(uniqueID===undefined)?(null):(uniqueID)} className='card'>

                    <h3>{post.title}</h3>
                    <div className='sideDetails'>
                        
                    <h5> {(post.creater)?(post.creater.username):null} | {date?(date.getDate()+'-'+ (date.getMonth()+1)+'-'+date.getFullYear()):''}</h5>
                    <label>{post.category}</label>
                    </div>
                    <hr/>
                    <h4>{post.body}</h4>
                    <Link className='button' to={`/blog/page/${uniqueID}`}>Open</Link>
                    
                    
                </div>
            
            
        )
    }) 
   
        return(
            <div className='cardContainer'>
            
            {articles>0?"NO":articles}
                
           
            </div>
        )

    

}


export default ArticleCard