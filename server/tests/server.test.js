const expect = require("expect")
const request = require("supertest")
const {ObjectID} = require("mongodb")

const {app} = require("./../server.js")
const {User} = require("./../models/user.js")
const {Todo} = require("./../models/todo.js")
const {todos,populateTodo, users, populateUser} = require ("./seeds/seed.js")



beforeEach(populateUser)

beforeEach(populateTodo)

describe("GET /User/me", ()=>{
  it("should Get a user", (done)=>{
    request(app)
    .get("/user/me")
    .set("x-auth", users[0].tokens[0].token)
    .expect(200)
    .expect((res)=>{
      expect(res.body._id).toBe(users[0]._id.toHexString())
      expect(res.body.email).toBe(users[0].email)
    })
    .end(done)
  })
  it("should return 401 err", (done)=>{
    request(app)
    .get("/user/me")
    .expect(401)
    .expect((res)=>{
      expect(res.body).toEqual({})
    })
    .end(done)
  })
})


describe("POST Users", ()=>{
  it("it should create a user", (done)=>{
    var email = "test@test.com"
    var password = "123mnb!"
    request(app)
    .post("/users")
    .send({email, password})
    .expect(200)
    .expect((res)=>{
      expect(res.headers["x-auth"]).toBeTruthy()
      expect(res.body.email).toBe(email)
    })
    .end((err)=>{
      if(err){
        return done(err)
      }
      User.findOne({email: email}).then((user)=>{
        expect(user).toBeTruthy()
        expect(user.password).not.toBe(password)
        done();
      })
    })
  })
  it("should response with 400", (done)=>{
    request(app)
    .post("/users")
    .send({email: "dsbk",
       password: "isc"
    })
    .expect(400)
    .end(done)
    })
    it("should create a use if its exist", (done)=>{
      request(app)
      .post("/users")
      .send({email: users[0].email, password: "password12"})
      .expect(400)
      .end(done)
    })
})

describe("POST /users/login", ()=>{
  it("should login the user and return auth", (done)=>{
    request(app)
    .post("/users/login")
    .send({
      email: users[1].email,
      password: users[1].password
    })
    .expect(200)
    .expect((res)=>{
      expect(res.headers["x-auth"]).toBeTruthy()
    })
    .end((err, res)=>{
      if(err){
        return done(err)
      }
      User.findById(users[1]._id).then((user)=>{
        expect(user.tokens[0]).toMatchObject({
          access: "auth",
          token: res.headers["x-auth"]
        })
        done()
      }).catch((err)=>{
        return done(err)
      })
    })
  })
  it("should reject the invalid login", (done)=>{
    request(app)
    .post("/users/login")
    .send({
      email: users[1].email,
      password: users[1].password + 1
    })
    .expect(400)
    .expect((res)=>{
      expect(res.headers["x-auth"]).toBeFalsy()
    })
    .end((err, res)=>{
      if(err) {return done(err)}
      User.findById(users[1]._id).then((user)=>{
        expect(user.tokens.length).toBe(0)
        done()
      }).catch((err)=>{
        return done(err)
      })
    })
  })
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


describe("GET /todos", ()=>{
  it("get todos", (done)=>{
    request(app)
    .get("/todos")
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2)
      // console.log(res.body.todos.length)
    })
    .end(done)
  })
})


describe("post/todos", ()=>{
  it("should create new todo", (done)=>{

    var text = "test todo text"
    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text)
    })
    .end((err, res)=>{
      if(err){
        return done(err)
      }
      Todo.find().then((todos)=>{
        expect(todos.length).toBe(3);
          expect(todos[2].text).toBe(text)
        done()
      }).catch((err)=>{
        done(err)
      });
    });
  });

  it("shouldn't add a new Todo", (done)=>{
    request(app)
    .post("/todos")
    .send({})
    .expect(400)
    .end(done)
  })
})



describe("Get todos/id", ()=>{
  it("should return todo doc", (done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text)
    })
    .end(done)
  })
  it("should return 404 if todo not found", (done)=>{
    var hexId = new ObjectID().toHexString
    request(app)
    .get("/todos/hexId")
    .expect(404)
    .end(done)
  })
  it("it should return 404 for none object ids", (done)=>{
    request(app)
    .get("/todos/123")
    .expect(404)
    .end(done)
  })
})


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


describe("Patch /todos/:id", (req, res)=>{
  it("should update Todo", (done)=>{
    var todoId = todos[0]._id.toHexString()
    var newText = "hello from text"
    request(app)
    .patch(`/todos/${todoId}`)
    .send({
      completed: true,
      text: newText
    })
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(newText)
      expect(res.body.todo.completed).toBe(true)
      expect(typeof res.body.todo.completedAt).toBe("number")
    })
    .end(done)
  })

  it("should clear comletedAt ", (done)=>{
    var todoId = todos[1]._id.toHexString()
    var newText = "hello from text"
    request(app)
    .patch(`/todos/${todoId}`)
    .send({
      completed: false,
      text: newText
    })
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(newText)
      expect(res.body.todo.completed).toBe(false)
      expect(res.body.todo.completedAt).toBeFalsy()
    })
    .end(done)
  })
})
