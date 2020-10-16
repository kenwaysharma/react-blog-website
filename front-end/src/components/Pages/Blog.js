import React, { Component } from 'react';
import ArticleCard from '../ArticleCard'

import '../CSS/Blog.css'
import { Redirect } from 'react-router-dom';
import Sidebar from '../Sidebar'
const axios = require('axios').default;


class Blog extends Component{
    state={
        }
    


        
    render(){
        

        return (
            <div className='blog-grid'>
                <div className='ninetyPer'>
                
                <ArticleCard />
                
                
                </div>
                <div className='tenPer'>
                
                </div>
            </div>
            
            
        )
    }
}


export default Blog