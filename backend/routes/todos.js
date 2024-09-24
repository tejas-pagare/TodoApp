const express = require('express');
const router = express.Router()
const { Todo } = require("../models/todoSchema");
const { createCheck, deleteCheck, updateCheck } = require("../types");
const userVerfier = require('../middleware/userVerfier');
const getUser = require('../utils/getUser');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');





router.post("/create",userVerfier, async(req, res) => {
  //creating todo
  //validating
  const { title, description } = req.body;
  const check = createCheck.safeParse({ title, description });
  const user = jwt.decode(req.headers.token);
  const id = user.id;
  console.log(id);
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
   const response = await newTodo.save();
   console.log(response)
   try{
      const update = await User.findByIdAndUpdate({_id:id},{$push:{todos:response._id}},{new: true, useFindAndModify: false})
    console.log(update);
   }catch(error){
    return res.status(400).json({
      success: false,
      msg: "Error creating todo"
    })
   }
  
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

router.get("/todos",userVerfier, async(req, res) => {
  //getting all todos
  try{

    const todos = await Todo.find({});
    return res.status(200).json({
      success: true,
      data:todos
    })
  }catch(error){
    res.status(411).json({
      success: false,
      msg: "Internal server error "
    })
  }

})

router.put("/completed",userVerfier, async(req, res) => {
  
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

router.delete("/delete",async(req,res)=>{
  const {id} = req.body;
  console.log(id);
  const check = deleteCheck.safeParse({
    id
  })
  if (!check.success) {
    return res.status(411).json({
      success: false,
      msg: "Enter a valid input"
    });
  }

  try {
    const deletedTodo = await Todo.findByIdAndDelete({_id:id});
    
    res.status(200).json({
      success:true,
      msg:"Todo deleted successfully",
      deletedTodo
    })
  } catch (error) {
    res.status(400).json({
      success:false,
      msg:"Internal server error"
    })
  }

})

router.get('/:id',userVerfier,async(req,res)=>{
  const id = req.params.id;
  try {
    const  todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        msg: "Todo not found"
      })
    }

    return res.status(200).json({
      success: true,
      msg:"Todo Found",
      todo
    })

  } catch (error) {
    
  }
})

router.patch('/:id/edit',userVerfier,async(req,res)=>{
  const {id} = req.params;
  const {description} = req.body;
  const check = updateCheck.safeParse(description);
  if (!check.success) {
    return res.status(411).json({
      success: false,
      msg: "Enter a valid input"
    })
  }

  try {
    const updatedTodo = await Todo.findOneAndUpdate({_id:id},{description:description})
   return res.status(200).json({
      success:true,
      msg:"Todo updated successfully",
    })
  } catch (error) {
   return res.status(400).json({
      success:false,
      msg:"Internal server error"
    })
  }
})


module.exports = router;