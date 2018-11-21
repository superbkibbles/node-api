const expect = require("expect")
const request = require("supertest")

const {app} = require("./../server.js")
const {user} = require("./../models/user.js")
const {Todo} = require("./../models/todo.js")

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return done()
  })
})
beforeEach((done)=>{
  user.remove({}).then(()=>{
    return done()
  })
})

describe("post/todos", ()=>{
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

  it("should create a new user", (done)=>{
    var email = "test@test.com"
    request(app)
    .post("/users")
    .send({email})
    .expect(200)
    .expect((res)=>{
      expect(res.body.email).toBe(email)
      console.log(res.body.email)
    })
    .end((err, res)=>{
      if(err){
        return done(err)
      }
      user.find().then((data)=>{
        expect(data.length).toBe(1)
        expect(data[0].email).toBe(email)
        done()
      })
    })
  })

  it("shouldn't add a new Todo", (done)=>{
    request(app)
    .post("/todos")
    .send({})
    .expect(400)
    .end((err, res)=>{
      if(err){
        return done(err)
      }
      Todo.find().then((data)=>{
        expect(data.length).toBe(0)
        done()
      })
    })
  })
})
