const mongoose = require('mongoose');


var postSchema = new mongoose.Schema({
      

        title: {
            type:String,
            required:true
        },
        body: {
            type:String,
            required:true
        },
        date:{
            type: Date,
            default: Date.now()
          },

      comments:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: "comment"
      }],
      category:{
        type:String,
        required:true
    },

      creater: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"
      }
  }
 

)
  


module.exports = mongoose.model('postData', postSchema);

