const {SHA256} = require("crypto-js")
const jwt = require("jsonwebtoken")

var data={
  id: 10
}

var token = jwt.sign(data, "123abc")
console.log(token)

var decoded = jwt.verify(token, "123abc")
console.log("decoded0", decoded)


// var message = "I am user number 3"
// var hash = SHA256(message).toString()
//
// console.log("message"+ message)
// console.log("Hash", hash)
//
// var data ={
//   id: 4
// }
// var token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data)+"somesecret").toString()
// }
// token.data.hash = SHA256(JSON.stringify(data)).toString()
// var result = SHA256(JSON.stringify(token.data)+ "somesecret").toString()
//
// if(result === token.hash){
//   console.log("data wasn't mnupilated")
// }else{
//   console.log("data is chamged, dont't trust it")
// }
