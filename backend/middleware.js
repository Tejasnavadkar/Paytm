const JWT = require("jsonwebtoken")
const JWT_SECRET = require("./config")

const AuthMiddleware = (req,res,next) =>{

   const authHeader = req.headers.Authorization
   if (!authHeader || !authHeader.startsWith('Bearer ')) {  // startsWith()
    return res.status(403).json({});
}
  try{ const token = authHeader.split(' ')[1]
   const decode = JWT.verify(token,JWT_SECRET)
   req.userId=decode.userId
   next()} catch(err){
        return res.status(411).json({})
   }

}

module.exports = {
    AuthMiddleware
}