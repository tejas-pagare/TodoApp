const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { createCheck, deleteCheck, updateCheck } = require('./types');
const {  dbConnection } = require('./utils/DB_Conn');
const { Todo } = require('./models/todoSchema');
const { date } = require('zod');
// const cors = require('cros');
const cors = require('cors');
const todoRouter = require('./routes/todos.js')
const userRouter = require('./routes/user.js')
app.use(cors())
dbConnection();
app.use(bodyParser.json());
app.use("/api/todo",todoRouter);
app.use("/api/user",userRouter);


app.get('/', (req, res) => {
  return res.send("Hii");
})

// app.post("/todo", async(req, res) => {
//   //creating todo
//   //validating
//   const { title, description } = req.body;
//   const check = createCheck.safeParse({ title, description });
//   if (!check.success) {
//     return res.status(411).json({
//       success: false,
//       msg: "Enter a valid input"
//     });
//   }
//   //Adding to mongodb
//   try {
    
//     const newTodo = new Todo({
//       title,
//       description
//     })
//     await newTodo.save();
//     return res.status(200).json({
//       success:true,
//       msg: "Todo created successfully"
//     })
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       msg: "Error creating todo"
//     })
//   }



// })

// app.get("/todos", async(req, res) => {
//   //getting all todos
//   try{
//     const todos = await Todo.find({});
//     return res.status(200).json({
//       success: true,
//       data:todos
//     })
//   }catch(error){
//     res.status(411).json({
//       success: false,
//       msg: "Internal server error "
//     })
//   }

// })

// app.put("/completed", async(req, res) => {
  
//   const { id } = req.body;
//   const check = deleteCheck.safeParse({
//     id: id
//   })
//   if (!check.success) {
//     return res.status(411).json({
//       success: false,
//       msg: "Enter a valid input"
//     });
//   }

//   try {
//     const updateTodo = await Todo.findByIdAndUpdate({_id:id},{completed:true});
//     return res.status(200).json({
//       success: true,
//       msg: "Todo completed successfully"
//     })
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       msg: "Internal server Error"
//     })
//   }

// })

// app.delete("/delete",async(req,res)=>{
//   const {id} = req.body;
//   const check = deleteCheck.safeParse({
//     id
//   })
//   if (!check.success) {
//     return res.status(411).json({
//       success: false,
//       msg: "Enter a valid input"
//     });
//   }

//   try {
//     const deletedTodo = await Todo.findByIdAndDelete({_id:id});
    
//     res.status(200).json({
//       success:true,
//       msg:"Todo deleted successfully",
//       deletedTodo
//     })
//   } catch (error) {
//     res.status(400).json({
//       success:false,
//       msg:"Internal server error"
//     })
//   }

// })

// app.get('/:id',async(req,res)=>{
//   const id = req.params.id;
//   try {
//     const  todo = await Todo.findById(id);
//     if (!todo) {
//       return res.status(404).json({
//         success: false,
//         msg: "Todo not found"
//       })
//     }

//     return res.status(200).json({
//       success: true,
//       msg:"Todo Found",
//       todo
//     })

//   } catch (error) {
    
//   }
// })

// app.patch('/:id/edit',async(req,res)=>{
//   const {id} = req.params;
//   const {description} = req.body;
//   const check = updateCheck.safeParse(description);
//   if (!check.success) {
//     return res.status(411).json({
//       success: false,
//       msg: "Enter a valid input"
//     })
//   }

//   try {
//     const updatedTodo = await Todo.findOneAndUpdate({_id:id},{description:description})
//    return res.status(200).json({
//       success:true,
//       msg:"Todo updated successfully",
//     })
//   } catch (error) {
//    return res.status(400).json({
//       success:false,
//       msg:"Internal server error"
//     })
//   }
// })

app.listen(3000,()=>{
  console.log("Listening");
})






