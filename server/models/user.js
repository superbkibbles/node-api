var mongoose  = require("mongoose")

var user = mongoose.model("user", {
  email:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
})


module.exports={
  user: user
}
