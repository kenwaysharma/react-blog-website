const app = require('./app')
require('./models/postDB');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tempPosts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(()=>{
    return console.log('MongoDB Connected...');
  })
  .catch(err=>console.log(err));



const server = app.listen(2000, () => {
    console.log(`Express is running on port ${server.address().port}`);
  });