const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { createCheck, deleteCheck } = require('./types');
app.use(bodyParser.json());


app.get('/', (req, res) => {
  return res.send("Hii");
})

app.post("/todo", (req, res) => {
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

})

app.get("/todos", (req, res) => {
  //getting all todos

})

app.put("/completed", (req, res) => {
  
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

})

app.listen(process.env.PORT)






