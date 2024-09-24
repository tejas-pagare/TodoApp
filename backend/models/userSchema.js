const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = Schema({
  username:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  todos:{
    type:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "todos"
      }
    ]
  }
})

const User = mongoose.model("User",userSchema);
module.exports = User;