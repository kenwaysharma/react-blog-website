
import React ,{useState, useContext, useEffect}from 'react';
import {useHistory,Redirect, useParams} from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../Sidebar'

import '../CSS/Page.css'
import '../CSS/Sidebar.css'



const  Page=()=>{
 const [post,setPost] = useState(
     {username:'', title:'',body:'',date:'',comments:[{}]
    }) 
let {postTitle}=useParams()

useEffect(() => {
    axios.get(`http://localhost:2000/apiEndpoint/singlePost/${postTitle}`,{withCredentials:true},{
        headers: {
              'Content-Type': 'application/json'
  }

    }).then((res)=>{
        console.log(res)
        const postS=res.data
        setPost({...post,  username:postS.username, title:postS.title, body:postS.body,comments: postS.comments})
        return;
    }).catch((err)=>{
        console.log([err])
    })
  },[]);

 

    return (
        
        <div className='postContainer'>
            <div className='singlePostcontainer'>
                <div className='singlePost'>
                    <h1>{post.title}</h1>
                    <hr/>
                    <p>{post.body} </p>
                    <hr/>
                    <h5>Comments:<button className='btnCom'>+</button></h5>
                    {post.comments.map(comment=>{
                        
                        const commentID=comment._id
                        return(
                            <div className='comment' key={commentID}>
                                <h3>{comment.body} This is kinda greta and feel like we should do this more often though</h3>
                                <h6>By: {comment.creater}</h6>
                        
                            </div>
                        )
                    })}
                </div>
            </div>
        
            
        </div>
        )
}


export default Page