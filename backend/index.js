const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { createCheck, deleteCheck } = require('./types');
const {  dbConnection } = require('./utils/DB_Conn');
const { Todo } = require('./models/todoSchema');
const { date } = require('zod');
app.use(bodyParser.json());
dbConnection();


app.get('/', (req, res) => {
  return res.send("Hii");
})

app.post("/todo", async(req, res) => {
  //creating todo
  //validating
  const { title, description } = req.body;
  const check = createCheck.safeParse({ title, description });
  if (!check.success) {
    return res.status(411).json({
      success: false,
      msg: "Enter a valid input"
    });
  }
  //Adding to mongodb
  try {
    
    const newTodo = new Todo({
      title,
      description
    })
    await newTodo.save();
    return res.status(200).json({
      success:true,
      msg: "Todo created successfully"
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "Error creating todo"
    })
  }



})

app.get("/todos", async(req, res) => {
  //getting all todos
  try{
    const todos = await Todo.find({});
    return res.status(200).json({
      success: true,
      date:todos
    })
  }catch(error){
    res.status(411).json({
      success: false,
      msg: "Internal server error "
    })
  }

})

app.put("/completed", async(req, res) => {
  
  const { id } = req.body;
  const check = deleteCheck.safeParse({
    id: id
  })
  if (!check.success) {
    return res.status(411).json({
      success: false,
      msg: "Enter a valid input"
    });
  }

  try {
    const updateTodo = await Todo.findByIdAndUpdate({_id:id},{completed:true});
    return res.status(200).json({
      success: true,
      msg: "Todo completed successfully"
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "Internal server Error"
    })
  }

})

app.listen(3000,()=>{
  console.log("Listening");
})






