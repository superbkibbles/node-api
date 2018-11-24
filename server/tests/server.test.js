const expect = require("expect")
const request = require("supertest")
const {ObjectID} = require("mongodb")

const {app} = require("./../server.js")
const {user} = require("./../models/user.js")
const {Todo} = require("./../models/todo.js")

var todos = [{
  _id : new ObjectID(),
  text: "first test todo"
  },
  {
    _id : new ObjectID(),
    text: "second test todo"
  }]


beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos)
  }).then(()=> done())
})

// beforeEach((done)=>{
//   Todo.remove({}).then(()=>{
//     return done()
//   })
// })
// beforeEach((done)=>{
//   user.remove({}).then(()=>{
//     return done()
//   })
// })


// describe("GET /todos", ()=>{
//   it("get todos", (done)=>{
//     request(app)
//     .get("/todos")
//     .expect(200)
//     .expect((res)=>{
//       expect(res.body.todos.length).toBe(2)
//       // console.log(res.body.todos.length)
//     })
//     .end(done)
//   })
// })


// describe("post/todos", ()=>{
  // it("should create new todo", (done)=>{
  //
  //   var text = "test todo text"
  //   request(app)
  //   .post('/todos')
  //   .send({text})
  //   .expect(200)
  //   .expect((res)=>{
  //     expect(res.body.text).toBe(text)
  //   })
  //   .end((err, res)=>{
  //     if(err){
  //       return done(err)
  //     }
  //     Todo.find().then((todos)=>{
  //       expect(todos.length).toBe(1);
  //       expect(todos[0].text).toBe(text)
  //       done()
  //     }).catch((err)=>{
  //       done(err)
  //     });
  //   });
  // });

//   it("should create a new user", (done)=>{
//     var email = "test@test.com"
//     request(app)
//     .post("/users")
//     .send({email})
//     .expect(200)
//     .expect((res)=>{
//       expect(res.body.email).toBe(email)
//       console.log(res.body.email)
//     })
//     .end((err, res)=>{
//       if(err){
//         return done(err)
//       }
//       user.find().then((data)=>{
//         expect(data.length).toBe(1)
//         expect(data[0].email).toBe(email)
//         done()
//       })
//     })
//   })
//
//   it("shouldn't add a new Todo", (done)=>{
//     request(app)
//     .post("/todos")
//     .send({})
//     .expect(400)
//     .end((err, res)=>{
//       if(err){
//         return done(err)
//       }
//       Todo.find().then((data)=>{
//         expect(data.length).toBe(0)
//         done()
//       })
//     })
//   })
// })


//
// describe("Get todos/id", ()=>{
//   it("should return todo doc", (done)=>{
//     request(app)
//     .get(`/todos/${todos[0]._id.toHexString()}`)
//     .expect(200)
//     .expect((res)=>{
//       expect(res.body.todo.text).toBe(todos[0].text)
//     })
//     .end(done)
//   })
//   it("should return 404 if todo not found", (done)=>{
//     var hexId = new ObjectID().toHexString
//     request(app)
//     .get("/todos/hexId")
//     .expect(404)
//     .end(done)
//   })
//   it("it should return 404 for none object ids", (done)=>{
//     request(app)
//     .get("/todos/123")
//     .expect(404)
//     .end(done)
//   })
// })


describe("delete /todos/:id",()=>{
  it("should delete a todo", (done)=>{
    var hexId = todos[0]._id.toHexString()

    request(app)
    .delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo._id).toBe(hexId)
    })
    .end((err, res)=>{
      if(err){
        return done(err)
      }
      Todo.findById(hexId).then((todo)=>  {
        expect(todo).toBeFalsy()
        done()
      }).catch((err)=>{
        done(err)
      })
    })
  })


  it("should return 404 if todo not found", (done)=>{
        var hexId = new ObjectID().toHexString
        request(app)
        .delete("/todos/hexId")
        .expect(404)
        .end(done)
  })
  it("should return 404 if oject id is invalid",(done)=>{
        request(app)
        .delete("/todos/123")
        .expect(404)
        .end(done)
  } )
})
