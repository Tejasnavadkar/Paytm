const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("./config")

const AuthMiddleware = (req,res,next) =>{

   const authHeader = req.headers.authorization
   console.log("authHeader--",authHeader)
   if (!authHeader) {  // startsWith()
    return res.status(403).json({message:"token not authenicate"});
}
  try{ 
   const token = authHeader.split(" ")[1]
//    const token = authHeader.split(" ")[1].replace(/[^a-zA-Z0-9\-_\.]/g, ''); to remove extraspase or in header pass token without ""
   console.log("token--",token)
   const decode = jwt.verify(token,JWT_SECRET)
   req.userId=decode.userId
   next()
    } catch(err){
        return res.status(411).json({err})
   }

}

module.exports = {
    AuthMiddleware
}