const {User} = require("./../models/user.js")

var authenticate= (req, res, next)=>{
  var token = req.header("x-auth")
  User.findOneToken(token).then((user)=>{
    if (!user) {
      return Promise.reject()
    }
    // res.send(user)
    req.user = user;
    req.token = token
    next()
  }).catch((err)=>{
    res.status(401).send()
  })
}

module.exports = {
  authenticate: authenticate
}
