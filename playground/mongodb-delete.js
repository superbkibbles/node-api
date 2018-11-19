const {MongoClient, ObjectID} = require("mongodb")

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client)=>{
  if(err){
    return console.log("unable to connect to the server", err)
  }
  console.log("connected to the server")

  var db = client.db("TodoApp")

  // deleteMany

  // db.collection("Todos").deleteMany({text : "eat"}).then((res)=>{
  //   console.log(res)
  // }).catch((err)=>{
  //   console.log("nothing to delete")
  // })

  // deleteOne
  // db.collection("Todos").deleteOne({text : "hangout"}).then((res)=>{
  //   console.log(res)
  // }).catch((err)=>{
  //   console.log("nothing to delete")
  // })

  //findOneAndDelete
  // db.collection("Todos").findOneAndDelete({completed : "Hello"}).then((res)=>{
  //   console.log(res)
  // }).catch((err)=>{
  //   console.log("nothing to delete")
  // })



  // db.collection("UserCollection").deleteMany({name: "pip"}).then((res)=>{
  //   console.log(res)
  // }).catch((err)=>{
  //   console.log("nothing to delete")
  // })


  db.collection("UserCollection").findOneAndDelete({_id :new ObjectID("5bf2fcef3fe21f17fae3d0f2")}).then((res)=>{
    console.log(res)
  }).catch((err)=>{
    console.log("nothing to delete")
  })

  // client.close()
})
