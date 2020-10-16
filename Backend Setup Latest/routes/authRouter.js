var express = require('express');
var router = express.Router();
const jwt =require('jsonwebtoken')
const mongoose = require('mongoose');
var users = require('../models/userDB')

const { query } = require('express');
const userDB= new mongoose.model('user')

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false);


//handle error function
const handleErrors = (err)=>{
  console.log(err.message, err.code)
  var error={username:'', email:'', password:'' }

  if(err.message==='Incorrect Email'){
    error.email='Please enter registered email'
  }
  if(err.message==='Incorrect Password'){
    error.password='Wrong password'
  }


  if(err.message.includes('user validation failed')){
    console.log(Object.values(err.errors).forEach(({properties})=>{
      console.log(properties.path)
      error[properties.path]=properties.message

    }))
  }
  if(err.code===11000){
    error.email="Email already registered!"
  }
  return error
}
//Tokens
const maxAge= 3*24*60*60;
const createToken=(id)=>{
  return jwt.sign({id}, 'this is my secret',{
    expiresIn: maxAge
  })
}

//
router.post('/signup', async (req, res) => {
    const user = new userDB()
    user.username=req.body.username;
    user.email=req.body.email;
    user.password=req.body.password;
    
    
    user.save()
      .then(() => { 
        
        //const token= createToken(user._id)
        
        //res.cookie('jwt',token, { maxAge: maxAge*1000})
      
        //res.send(token); //send user id to front end using res.json(user._id)
        res.json(
          "SUCCESS"
        )
      })
      .catch((err) => {
        const errors= handleErrors(err);
        res.send(errors)
  
        
  }) 
  } )

  router.get('/signup',(req,res)=>{
    res.send('Signup GET reached')
  })
  router.get('/login',(req,res)=>{
    res.send('Login GET reached')
  })


  router.post('/login', async (req, res) => {
    const {email, password}= req.body;
    try{
       const user = await userDB.login(email, password)
       const token= createToken(user._id)
       res.cookie('jwt',token, { maxAge: maxAge*1000})
       
       res.json({
         user,
         token,
            Message: "SUCCESS"
      })
    }catch(err){
      
      const errors=handleErrors(err)
        res.json({errors})
    }
  } )


  router.get('/logout',async (req,res)=>{
    res.cookie('jwt', '',{maxAge: 1})
    
    res.send('Logout Success')
  })


  module.exports = router;