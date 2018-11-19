// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb")

// // var obj = new ObjectID;
// console.log(obj)

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client)=>{
  if(err){
    return console.log("unable to connect to mongodb server", err)
  }
  console.log("connected to mongoDB server")

  const db = client.db("TodoApp")

  // db.collection('Todos').insertOne({
  //   text : "walk thr dog",
  //   completed : false
  // }, (err, result)=>{
  //   if(err){
  //     return console.log("unable to insert Todo", err)
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // })

  // db.collection("UserCollection").insertOne({
  //   name : "azad",
  //   age : 35,
  //   location : "Iraq"
  // }, (err, res)=>{
  //   if (err) {
  //     return  console.log("unable to add user ", err)
  //   }
  //   console.log(JSON.stringify(res.ops, undefined, 2))
  // })

  client.close();
});
