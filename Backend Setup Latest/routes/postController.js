var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
var posts = require('../models/postDB')
var comments=require("../models/commentDB");
const { query } = require('express');
const { requireAuth } = require('../middleware/authMiddleWare');
const postDB= new mongoose.model('postData')
const User = require('../models/userDB');
const commentDB=new mongoose.model('comment')
const jwt = require('jsonwebtoken');
mongoose.set('useFindAndModify', false);



  
router.get('/USERS', (req,res)=>{
  User.find({}, function (err, user) {
      if (err) {
          console.log(err);
      }else{
          res.send(user)
          }
        }
      ).populate('comments posts')

    })


router.get('/READ', (req,res)=>{
  posts.find({}, function (err, post) {
    if (err) {
      console.log(err);
  }else{
      res.json({post})
      }
        }
      )
      .populate([{path:'creater'}, {path:'comments', select:'creater'}])
      
    })
  router.get('/singlePost/:id',  (req,res)=>{
    const query = req.params.id
    console.log('query',query)
     posts.findById(query,function(err,post){
      if (err) {
        console.log(err);
    }else{
        res.send(post)
        }
    }).populate([{path:'creater'}, {path:'comments'}])
  })


router.post('/CREATE',requireAuth, async (req, res) => {
  const token= await req.cookies.jwt;
  var userCreater=null
 
 
  console.log(req.body)
 
if(token){
  jwt.verify(token,'this is my secret', async (err,decodedToken)=>{

          
          let user=await User.findById(decodedToken.id);
          
          var userCreater = user 
          

          //res.locals.user=user //LEARN THIS
          console.log("[ CREATE POST ]This is 2. Token authentication success")
          
          const post= new postDB({title:req.body.title, body:req.body.body,category: req.body.category ,creater:userCreater})
          await post.save()
          .then(() => { 
            const query={_id:user._id}
            console.log('QUERY',query)
          User.findOneAndUpdate(query,{$push:{posts:post}}, (err, updated)=>{
            if (err) {
              console.log("Something wrong when updating data!",err);
            }else{
              console.log(updated)
            res.send('Post Added')}
          })
          
        }).catch((err) => {
          
          var error={title:'', body:'', category:'' }
          Object.values(err.errors).forEach(({properties})=>{
            console.log(properties.path,properties.message)
            
            error[properties.path]=properties.message
            
          })
      
         res.json({error})
            
          }) 
         

          
          
      
      
         
      }
  )

  





} })



router.post('/UPDATE/:id',requireAuth,(req, res) => {
  let postUpdated={
    "posts.name":req.body.posts.name,
    "posts.address":req.body.posts.address,
    
  }
    let query={_id:req.params.id}
    
    posts.findOneAndUpdate(query, postUpdated, (err, newPost) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    
        res.send('UPDATED')
    });
  })

  router.post('/DELETE/:id',requireAuth,(req, res) => {
    
      let query={_id:req.params.id}
      
      posts.findOneAndDelete(query, (err) => {
          if (err) {
              console.log("Something wrong when updating data!");
          }
      
          res.send('DELETED')
      });
    })

    




    
module.exports = router;
