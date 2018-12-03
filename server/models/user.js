const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema(
  {
    email:{
      type: String,
      required: true,
      minlength: 1,
      trim: true,
      unique: true,
      validate:{
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email "
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    tokens:[{
      access:{
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
  }
)

userSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject()
  return _.pick(userObject, ["email", "_id"])
}


userSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = "auth"
  var token = jwt.sign({_id: user._id.toHexString(), access}, "abc123" ).toString()
  user.tokens = user.tokens.concat([{access: access, token: token}])
  return user.save().then(()=>{
    return token;
  })
}
userSchema.statics.findOneToken= function(token){
  var User = this;
  var decoded;
  try{
    decoded = jwt.verify(token, "abc123")
  } catch{
    // return new Promise((resolve, reject)=>{
    //   reject()
    // })
    return Promise.reject();
  }
  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    "tokens.access": "auth"
  })
}

userSchema.statics.findByCredentials = function(email, password){
  var User = this;
  return User.findOne({email}).then((user)=>{
    if(!user){
      return Promise.reject()
    }
    return new Promise((resolve, reject)=>{
      bcrypt.compare(password, user.password, (err, res)=>{
        if(res){
         resolve(user)
        }
        else{
        return reject(err)
        }
      })
    })
  })
}

userSchema.pre("save", function(next){
  var user = this;

  if(user.isModified("password")){
   bcrypt.genSalt(10, (err, salt)=>{
     bcrypt.hash(user.password, salt,(err, hash)=>{
          user.password = hash
          next()
        })
      })
  }else{
    next()
  }
})

userSchema.methods.removeToken = function(token){
  var user = this;
  return user.update({
    $pull:{
      tokens:{
        token: token
      }
    }
  })
  }

var User = mongoose.model("user", userSchema )


module.exports={
  User: User
}
