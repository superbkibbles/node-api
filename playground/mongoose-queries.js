const {ObjectID} = require("mongodb")

const {mongoose} = require("./../server/db/mongoose.js")
const {Todo} = require("./../server/models/todo.js")
const {user} = require("./../server/models/user.js")

// var id = "5bf5a7ccd42f2a156926a8c111"

// if (!ObjectID.isValid(id)) {
//   console.log("id is not valid")
// }
//
// Todo.find({
//   _id: id
// }).then((data)=>{
//   console.log("todos", data)
// })
//
//
// Todo.findOne({
//   _id: id
// }).then((data)=>{
//   console.log("todo", data)
// })

//
// Todo.findById(id).then((data)=>{
//   if(!data){
//     return console.log("id is not exist")
//   }
//   console.log("by id", data)
// }).catch((err)=>{
//   console.log(err)
// })

var userId = "5bf6d3d0211bca5920318dba"

if (!ObjectID.isValid(userId)) {
  console.log("not valid ID")
}

user.findById(userId).then((data)=>{
  if (!data) {
    return console.log("id is not exist")
  }
  console.log(data)
}).catch((err)=>{
  console.log(err)
})
