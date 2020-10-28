const mongoose = require('mongoose');
const {isEmail}=require('validator')
const bcrypt = require('bcrypt')
var userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: [true, "Username is required!"],
        unique: true,
        lowercase: true,
    },
    email:{
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email!"]
    },
    password:{
        type: String,
        required: [true, "Password is required!"],
        minlength: [6, "Enter atleast 6 characters!"],
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],

    posts:[{
        type: mongoose.Schema.Types.ObjectId,
          ref: "postData"
    }],
  },{timestamps : true});
  
  //NEW THINGS

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if (user){
       const auth= await bcrypt.compare(password, user.password)
        if (auth){
            return user
        }
        throw Error('Incorrect Password')
    }
    throw Error('Incorrect Email')
}



userSchema.post('save',function(doc,next){
    console.log("This user has been saved", doc)
    next();
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    
    next();
})
//------------------------------------------------------------------

  var User = mongoose.model("user", userSchema);
  

  module.exports = User;