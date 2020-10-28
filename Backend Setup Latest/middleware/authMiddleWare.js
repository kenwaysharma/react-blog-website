const jwt = require('jsonwebtoken');
const User = require('../models/userDB');



const requireAuth = async (req,res,next)=>{
    const token= await req.cookies.jwt;
    console.log(token)
    if(token){
        jwt.verify(token,'this is my secret',(err,decodedToken)=>{
            if(err){
                console.log(err.message)
                //return res.send('FAILED')
            }else{
                console.log(decodedToken)
                //res.send('Authorised!')
                
                next()
                
            }
        })
    }else{
        res.json({msg:'JWT authentication failed'})
    }


    
}



//check current user for dashboard
const checkUser= async(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,'this is my secret', async (err,decodedToken)=>{
            if(err){
                console.log(err.message)
                //res.locals.user=null //LEARN THIS
                console.log("This is 1. And token authentications failed")
                next()
            }else{
                console.log(decodedToken)
                let user=await User.findById(decodedToken.id);
                //res.locals.user=user //LEARN THIS
                console.log("This is 2. Token authentication success")
                next()
            }
        })
}else{
    
    res.locals.user=null; //LEARN THIS
    console.log("This is 3. and JWT doesnt exist", res.locals.user)
    next()
}

}

module.exports={requireAuth,checkUser}