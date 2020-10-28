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
  
            
            let user=await User.findById(decodedToken.id);
            
            var userCreater = user 
            
  
            //res.locals.user=user //LEARN THIS
            console.log("[ CREATE POST ]This is 2. Token authentication success")
          
            const nComment= new commentDB({creater:userCreater, body:req.body.body})


            console.log(nComment)
            nComment.save()
            let query={_id: req.params.id}
            console.log(query)
            
            User.findByIdAndUpdate(decodedToken.id,{$push:{comments:nComment}})
            
            .exec(function(err, user){
              if (err) {
                console.log("Something wrong when updating data! USER", err);
              }else{
                console.group('SUCCESS USER POST',user )
                postDB.findByIdAndUpdate(query,{$push:{comments:nComment}})
                  .exec(function(err,post){
                    if (err) {
                      console.log("Something wrong when updating data! POST ERROR", err);
                      res.json({err})
                    }else{
                      console.log('This is the updated Post', post)
                      res.send(nComment)
                    }
                  })
                  
              }})
                  
      
            
            
            
            
            
           
            
          //  postDB.findOneAndUpdate(query,{$push:{comments:nComment}}, (err,updated)=>{
          //  if (err) {
          //    console.log("Something wrong when updating data!");
          //  }else{
          //    User.findByIdAndUpdate(decodedToken,{$push:{comments:nComment}},(err, updatedUser)=>{
          //      if (err) {
          //        console.log("Something wrong when updating data! STAR", err);
          //      }else{
          //        console.log('This is the updated User', updatedUser)
          //        res.send(nComment)
          //      }
          //      }
          //    )}
          //  
          //})





           
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