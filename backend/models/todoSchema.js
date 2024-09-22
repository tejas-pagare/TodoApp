const mongoose = require('mongoose');
const { Schema } = mongoose;



const todoSchema = Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type:String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

module.exports.Todo = mongoose.model("todos",todoSchema);


