
import React ,{useState, useContext, useEffect}from 'react';
import {useHistory,Redirect, useParams} from 'react-router-dom'
import axios from 'axios'


import '../CSS/Page.css'

import CreateComment from './CreateComment';



const  Page=()=>{



const [show,setShow]=useState({
    commentBox:false
})

 const [post,setPost] = useState(
     {id:'', username:'', title:'',body:'',createdAt:'',comments:[{}]
    }) 
    const [response, setResponse] = useState({msg:''});

let {postTitle}=useParams()




useEffect(() => {
    axios.get(`http://localhost:2000/apiEndpoint/singlePost/${postTitle}`,{withCredentials:true},{
        headers: {
              'Content-Type': 'application/json'
  }

    }).then((res)=>{
        console.log('THis is post', (res.data.post.creater.username))
        const postS=res.data.post
        setPost({...post,id:postS._id,  username:postS.creater.username, title:postS.title, createdAt:postS.createdAt, body:postS.body,comments: postS.comments})
        
        return;
    }).catch((err)=>{
        console.log([err])
    })
  },[]);



  const handleCommentButton=(e)=>{
    
    setShow({ ...show, commentBox:!show.commentBox });  
}

const onCommentCreate =(data)=>{
    console.log('Data',data)
    if(data.msg==='JWT authentication failed'){
        setResponse({...response, msg: 'Please login and try again'})
    }else if(data.body===''||data.body.length<10){
        setResponse({...response, msg: 'Please write atleast 10characters'})
    }else{
        setPost((prev) => ({ ...prev, comments: [...prev.comments, data] }))
        setResponse({...response, msg: ''})
        console.log('WOrking')
    }
    
}
        var datePost=new Date(post.createdAt)
    return (
        
        <div className='postContainer'>
            
            
            <div className='singlePostcontainer'>
                <div className='singlePost' >
                    <h1>{post.title}</h1>
                    <h5> {post.username} | {datePost?(datePost.getDate()+'-'+ (datePost.getMonth()+1)+'-'+datePost.getFullYear()):''}</h5>
                    <hr/>
                    <p>{post.body} </p>
                    
                    <hr/>
                    <h5>Comments:<button className='btnCom' onClick={handleCommentButton}>{show.commentBox?'Close':'Add Comment'}</button></h5>
                    <h5 className='fail'>{response.msg}</h5>
                    
                    {show.commentBox?

                    (<CreateComment post={post} onCommentCreate={onCommentCreate}/>)
                    
                    
                    :''}

                    {post.comments?console.log('This is comments',post.comments):null}
                    
                    {post.comments.map(comment=>{
                           
                        
                        const commentID = (comment)?(comment._id):''
                        const dateCom=new Date(comment.createdAt)
                        return(
                            
                            <div className='comment' key={commentID?commentID:null}>
                                
                                <h3>{comment.body}</h3>
                                <h6>{(comment.creater)?(comment.creater.username):''} | {dateCom?(dateCom.getDate()+'-'+ (dateCom.getMonth()+1)+'-'+dateCom.getFullYear()):''} </h6>
                                
                        
                            </div>
                        )
                    })}
                </div>
            </div>
        
            
        </div>
        )
}


export default Page