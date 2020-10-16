import { useState } from "react";
import React from 'react';
import axios from 'axios'
import '../CSS/CreateArticle.css'

const CreateArticle=()=>{
    const newData={
        title: '',
        body:'',
        category:'',
        success:'',
        fail:''
    }

    const [data, setData] = useState(newData);
    const [response, setResponse] = useState(newData);
    const [category,setCategory] = useState(['Fashion', 'Food', 'Travel', 'Music', 'Lifestyle', 'Fitness', 'DIY', 'Sports', 'Finance', 'Politics', 'Parenting'])

    const handleSubmit=async (e)=>{
        e.preventDefault()
        await axios.post('http://localhost:2000/apiEndpoint/CREATE', {
            title: data.title,
            body: data.body,
            category:data.category
          },{withCredentials:true},{
            headers: {
                  'Content-Type': 'application/json'
          }})
          .then(function (res) {
            
            if(res.data==='Post Added'){
                console.log('Success:',res)
                setData({...data,title:'', body:'',category:''})
                setResponse({...response, title:'', body:'',category:'',success: "Post Sucessfully Added"})
                
            }else if(res.data==='JWT authentication failed'){
                setResponse({...response, title:'', body:'',category:'',fail: "You need to login before creating a new post"})
            }else{
                console.log('Erorr', res)
                setResponse({...response, title:res.data.error.title, body:res.data.error.body,category:res.data.error.category,success:''})
            }
            
          })
              
              
              
              
          
          
        
        
        
    }

    const handleChange=(e)=>{
        const {name,value}=e.target
        setData({ ...data, [name]: value });
        
    }
    
    
    return(
        <div className='ninetyPer'>
            <div className='flexit'>
                <h1>Create Post</h1>
                {response.success?(<h5 className='success'>{response.success}</h5>):''}
                {response.fail?(<h5 className='err'>{response.fail}</h5>):''}
                
            <form onSubmit={handleSubmit}>
                <div className='Container'>
                <div className='inputField'>
                        
                        <input name='title' onChange={handleChange} value={data.title} placeholder='Title'></input>
                        {response.title?(<h5 className="err">{response.title}</h5>):''}
                </div>

                <div className='bodyField'>
                    
                    <textarea
                        name='body'
                        onChange={handleChange}
                        value={data.body}
                        placeholder='Write anything'
                    />
                    {response.body?(<h5 className="err">{response.body}</h5>):''}
                </div>
                <div className='selectField'>
                
                <select name='category' value={data.category} onChange={handleChange}>
                    <option value=''>~None Selected~</option>
                    {category.map(cat=>{
                        return(
                            <option value={cat} key={cat}>{cat}</option>
                            
                        )
                    })
                }
                    
                </select>
                {response.category?(<h5 className="err">{response.category}</h5>):''}
                </div>
                </div>
                <button className='submitBtn'>Submit</button>
                

            </form>
            </div>
        </div>

    )
}

export default CreateArticle
