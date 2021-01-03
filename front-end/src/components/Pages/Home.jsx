import React ,{useState, useContext, useEffect}from 'react';
import {useHistory,Redirect, Link} from 'react-router-dom'
import '../CSS/Home.css'

import { RecentContext } from '../../contexts/RecentContext';
const axios = require('axios').default;
const coverimg = require('../CSS/cover.png')
const Home=()=>{

    const {postsRecent, dispatcher} = useContext(RecentContext)

    useEffect(()=>{
        axios.get('http://localhost:2000/apiEndpoint/READ')
           .then(res=>{
               
               
               dispatcher({ payload: res.data.post.slice(0,4)});
              
   
   })
   },[])



    return(
        <div className="ninetyPer">
            <div className='homeDiv'>
                    <div className='intro'>
                        <img src={coverimg} alt=""/>
                    </div>
                    <div className='allRecent'> 
                    <h1>Recent Posts</h1>
                        <div className='recentPosts'>

                        {
                        postsRecent.postR.map(p=>{
                        
                        return(
                        
                            <div className='recentCard' key={ p._id?(p._id):null}>
                                <h3>
                                    {p.title}
                                </h3>
                                <h5>
                                    by {p.creater?(p.creater.username):null}
                                </h5>
                                <p>
                                    {p.body}
                                </p>

                        
                            </div>


                        )
                        }

                    
                            )
                        }

                        </div>
                        <Link to='/blog/' className='link'><button>See All</button></Link>

                    </div>
                    <div className='startPos'>
                        <h1>Start posting now!</h1>
                        <div className='buttons'>
                            
                            <Link to='/blog/create' className='link'><button>Create Post</button></Link>
                            <Link to='/user/login' className='link'><button>Login</button></Link>
                            <Link to='/user/signup' className='link'><button>Signup</button></Link>
                        </div>
                    </div>

                    
            </div>
        </div>
        
        

    )
}

export default Home
