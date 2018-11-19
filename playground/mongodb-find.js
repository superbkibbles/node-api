const {MongoClient, ObjectID} = require("mongodb")

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client)=>{
  if(err){
    return console.log("unable to connect to the server", err)
  }
  console.log("connected to the server")

  var db = client.db("TodoApp")

  // db.collection("Todos").find({_id : new ObjectID("5bf2f5379c70e61519100930")}).toArray().then((data)=>{
  //   console.log("fetch")
  //   console.log(JSON.stringify(data, undefined, 2))
  // }).catch((err)=>{
  //   console.log("OPS there was an error")
  // })

  // db.collection("Todos").find().count().then((data)=>{
  //   console.log(`todos Count is : ${data}`)
  // }).catch((err)=>{
  //   console.log("OPS there was an error")
  // })


  db.collection("UserCollection").find({name : "subhi"}).toArray().then((data)=>{
    console.log("users")
    console.log(JSON.stringify(data, undefined, 2))
  }).catch((err)=>{
    console.log("couldn't find the data")
  })
  // client.close()
})
