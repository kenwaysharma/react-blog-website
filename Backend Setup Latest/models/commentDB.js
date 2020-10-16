const mongoose = require('mongoose');
// Using the Schema constructor, create a new CommentSchema object
// This is similar to a Sequelize model
var CommentSchema = new mongoose.Schema({
    // `body` is of type String
    creater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
  },
    body: String
  });
  
  // This creates our model from the above schema, using mongoose's model method
  var Comment = mongoose.model("comment", CommentSchema);
  
  // Export the Note model
  module.exports = Comment;