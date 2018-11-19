const {MongoClient, ObjectID} = require("mongodb")

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client)=>{
  if(err){
    return console.log("unable to connect to the server", err)
  }
  console.log("connected to the server")

  var db = client.db("TodoApp")

  // db.collection("Todos").findOneAndUpdate({_id: new ObjectID("5bf2ebacc0b55e133a807dc0")}, {
  //   $set:{
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((res)=>{
  //   console.log(res)
  // })



  db.collection("UserCollection").findOneAndUpdate({_id: new ObjectID("5bf2fd008eb5191807069f14")}, {
    $set:{
      name : "ruru"
    },
    $inc:{
      age: -10
    }
  }, {
    returnOriginal : false
  }).then((res)=>{
    console.log(res)
  })

  // client.close()
})
