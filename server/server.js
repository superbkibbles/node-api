require("./config/config.js")

const _ = require("lodash")
const express = require("express")
const bodyParser = require("body-parser")

const port = process.env.PORT
const {ObjectID} = require("mongodb")
var {mongoose} = require("./db/mongoose.js")
var {User} = require("./models/user")
var {Todo} = require("./models/todo")
var {authenticate} = require("./middlewar/authenticate.js")

var app = express()

app.use(bodyParser.json());

app.post("/todos", (req, res)=>{
  var newTodo = new Todo({
    text: req.body.text
  })
  newTodo.save().then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.status(400).send()
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

app.get("/todos/:id", (req, res)=>{
  var todoId = req.params.id;

  if (!ObjectID.isValid(todoId)) {
    return res.status(404).send()
  }
  Todo.findById(todoId).then((todo)=>{
    if(!todo){
      return res.status(404).send()
    }
    res.send({todo: todo})
    // res.send(todo)
  }).catch(()=>{
    res.status(400).send()
  })
})

app.delete("/todos/:id", (req, res)=>{
  var todoId = req.params.id
  if (!ObjectID.isValid(todoId)) {
    return res.status(404).send()
  }
  Todo.findByIdAndRemove(todoId).then((todo)=>{
    if (!todo) {
      return res.status(404).send()
    }
    res.send({todo: todo})
  }).catch((err)=>{
    res.status(400).send()
  })
})
// Updating Todos
app.patch("/todos/:id", (req, res)=>{
  var todoId = req.params.id
  var body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectID.isValid(todoId)) {
    return res.status(404).send()
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else{
    body.completedAt = null
    body.completed = false
  }
  Todo.findByIdAndUpdate(todoId, {$set: body}, { new: true}).then((todo)=>{
    if(!todo){
      return res.status(404).send()
    }
    res.send({todo: todo})
  }).catch((err)=>{
    res.status(400).send()
  })
})


// posting user
app.post("/users", (req, res)=>{
  var body = _.pick(req.body, ["email", "password"])
  var user = new User(body)
  user.save().then((data)=>{
    return user.generateAuthToken()
    // res.send(data)
  }).then((token)=>{
    res.header("x-auth", token).send(user)
  }).catch((err)=>{
    res.status(400).send()
  })
})

// getting all users
app.get("/users", (req, res)=>{
  User.find().then((user)=>{
    res.send(user)
  }).catch((err)=>{
    res.status(400).send()
  })
})


app.get("/user/me",authenticate , (req, res)=>{
  res.send(req.user)
})

app.post("/users/login", (req, res)=>{
  var body = _.pick(req.body, ["email", "password"])

  User.findByCredentials(body.email, body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.header("x-auth", token).send(user)
  })
  }).catch((err)=>{
    res.status(400).send()
  })
})

app.delete("/user/me/token",authenticate, (req, res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send()
  }).catch(()=>{
    res.status(400).send()
  })
})

app.delete("/users/:id", (req, res)=>{
  var userId = req.params.id
  if (!ObjectID.isValid(userId)) {
    return res.status(400).send()
  }
  User.findByIdAndRemove(userId).then((user)=>{
    if (!user) {
      return res.status(400).send()
    }
    res.send(user)
  }).catch((err)=>{
    res.status(404).send()
  })
})

app.listen(port, ()=>{
  console.log("started on "+ port)
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
