const express = require("express")
const bodyParser = require("body-parser")

var {mongoose} = require("./db/mongoose.js")
var {user} = require("./models/user")
var {Todo} = require("./models/todo")

var newUser = new user({
  email: "test1@test.com"
})
newUser.save()

var app = express()

app.use(bodyParser.json());

app.post("/todos", (req, res)=>{
  var newTodo = new Todo({
    text: req.body.text
  })
  newTodo.save().then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
})

app.get("/todos", (req, res)=>{
  Todo.find().then((todos)=>{
    res.send({
      todos:todos
    })
  }).catch((err)=>{
    res.send(err)
  })
})

app.post("/users", (req, res)=>{
  var newUser = new user({
    email: req.body.email
  })
  newUser.save().then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
})

app.listen(3000, ()=>{
  console.log("started on 3000")
})


module.exports = {
  app: app
}








































// var newTodo= new Todo({
//   text: "cook dinner"
// })
//
// newTodo.save().then((res)=>{
//   console.log(res)
// }).catch((err)=>{
//   console.log("Unable to save todo")
// })

// var anotherTodo = new Todo({
//   text: " edit this video "
// })
//
// anotherTodo.save().then((res)=>{
//   console.log(res)
// }).catch((err)=>{
//   console.log("Unable to save Todo")
// })




// var newUser = new user({
//   email: "test@test.com"
// })
//
// newUser.save().then((res)=>{
//   console.log(res)
// }).catch((err)=>{
//   console.log("Unable to save the user")
// })
