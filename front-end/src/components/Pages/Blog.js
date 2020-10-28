import React, { Component } from 'react';
import ArticleCard from '../ArticleCard'
import filter from '../filter'
import '../CSS/Blog.css'
import { Redirect } from 'react-router-dom';
import Sidebar from '../Sidebar'
const axios = require('axios').default;


class Blog extends Component{
    state={
        }
    


        
    render(){
        return (<div className='ninetyPer'>
            <div className='blog-grid'>
                
                    <div className='mainFlex'>
                        <input name='search' id='search' className='search' onChange={filter} placeholder='Start searching'></input>
                        </div>    
                        <ArticleCard />
                
                    
                </div>
                
            </div>
            
            
        )
    }
}


export default Blog