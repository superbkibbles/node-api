const {ObjectID} = require("mongodb")
const jwt = require("jsonwebtoken")
const {Todo} = require("./../../models/todo.js")
const {User} = require("./../../models/user.js")

const userOneId = new ObjectID()
const userTwoId = new ObjectID()
console.log()
const users = [
{
  _id: userOneId,
  email:"UserOne@test.com",
  password: "UserOnepass",
  tokens:[{
    access: "auth",
    token: jwt.sign({_id: userOneId, access: "auth"}, "abc123").toString()
  }]
},{
  _id: userTwoId,
  email: "User.two@test.com",
  password: "UserTwopass",
  tokens:[{
    access: "auth",
    token: jwt.sign({_id: userTwoId, access: "auth"}, "abc123").toString()
  }]
}]

const todos = [{
  _id : new ObjectID(),
  text: "first test todo",
  _creator: userOneId
  },
  {
    _id : new ObjectID(),
    text: "second test todo",
    completed: true,
    completedAt: 333,
    _creator: userTwoId
  }]

const populateTodo = (done)=>{
    Todo.remove({}).then(()=>{
      return Todo.insertMany(todos)
    }).then(()=> done())
  }

const populateUser = (done)=>{
  User.remove({}).then(()=>{
    var userOne = new User(users[0]).save()
    var userTwo = new User(users[1]).save()
    return Promise.all([userOne, userTwo])
  }).then(()=> done())
}



module.exports={
  todos: todos,
  populateTodo, populateTodo,
  users: users,
  populateUser: populateUser
}
