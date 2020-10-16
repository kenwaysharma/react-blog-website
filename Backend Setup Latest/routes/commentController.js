var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
var posts = require('../models/postDB')
var comments=require("../models/commentDB");
const { query } = require('express');
const authMiddleWare = require('../middleware/authMiddleWare');
const { requireAuth } = require('../middleware/authMiddleWare');
const postDB= new mongoose.model('postData')
const commentDB=new mongoose.model('comment')
const User = require('../models/userDB');
const jwt = require('jsonwebtoken');
mongoose.set('useFindAndModify', false);









//Create Comment inside a post
router.post('/:id',requireAuth, async(req, res) => {
  const token= await req.cookies.jwt;
  if(token){
    jwt.verify(token,'this is my secret', async (err,decodedToken)=>{
  
            console.log(decodedToken)
            let user=await User.findById(decodedToken.id);
            console.log("USER",user)
            var userCreater = user 
            console.log("userC:",userCreater)
  
            //res.locals.user=user //LEARN THIS
            console.log("[ CREATE POST ]This is 2. Token authentication success")
          
            const nComment= new commentDB({creater:userCreater, body:req.body.body})


            console.log(nComment)
            nComment.save()
            let query={_id: req.params.id}
            console.log(query)
            postDB.findOneAndUpdate(query,{$push:{comments:nComment}}, (err,updated)=>{
            if (err) {
              console.log("Something wrong when updating data!");
            }else{
            res.send(updated.populate('comments'))}
          })





           
        }
    )
  
    
  
  
  
  
  
  }
    


      
    //const nComment= new commentDB({username:"bob the builder", body:"Very cool post"})
    //console.log(post)
    //console.log(nComment)
    //nComment.save()
    
    //post.comments.push(nComment);
    //post.save();

    
  })

  module.exports = router;