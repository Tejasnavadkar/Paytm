const express = require("express")
const router = express.Router()
const {SignupSchema,SigninSchema,updateBody} = require("../zodValidation") 
const {User,Account} = require("../db")
const jwt = require("jsonwebtoken")
const {JWTSecret} = require("../config")
const AuthMiddleware = require("../middleware")
router.post("/Signup",async (req,res)=>{
    const userData = req.body
    const {success} = SignupSchema.safeParse(userData)

    if(!success){
        res.status(411).json({message:"Email already taken/invalid input"})
    }

    const isExist = await User.findOne({
        username:userData.username
    })
    
    if(isExist){
        res.status(411).json({message:"Email already taken/invalid input"})
    }

   const newUser = await User.create({
        username:userData.username,
        firstname:userData.firstname,
        lastname:userData.lastname,
        password:userData.password
    })
    const userId = newUser._id

     // --------------------add-dumy-balance----------------------------------------------------

     await Account.create({
        userId,
        balance:1+Math.random()*10000
    })
    //------------------------------------------------------------------------------
    
    const token = jwt.sign({userId},JWTSecret)
    res.status(200).json({
        message:"user created successfully..!",
        token:token
    })

   

    
})

router.post("/Signin",async (req,res)=>{
   const userData = req.body
   const {success} =SigninSchema.safeParse(userData)

   if(!success){
    res.status(411).json({message:"invalid credential"})
   }

  const isUserExist = await User.findOne({
    userData:userData.username,
    password:userData.password
   })
   if(isUserExist){
    const userId = isUserExist._id
    const token = jwt.sign({userId},JWTSecret)
    res.json({token:token})
    return
   }
   res.status(411).json({message: "Error while logging in"})
 
})

router.put("/",AuthMiddleware,async (req,res)=>{
   const userData = req.body
  const {success} = updateBody.safeParse(userData)
  if(!success){
    res.status(411).json({message: "Error while updating information"})
  }
    await User.updateOne({_id:req.userId},userData)
    res.json({message:"updated successfully"})


})

router.get("/bulk",async(req,res)=>{
  const filter =  req.query.params || "";  // if params abscent return all users
const users = await User.find({  // here we can get users by searching there name 
    $or:[{
        firstname:{
            "$regex":filter
        },
        lastname:{
            "$regex":filter
        }
    }]
  })

  res.json({
    users:users.map((user)=>({  //if use () no need to return here we did not return password
        username:user.username,
        firstname:user.firstname,
        lastname:user.lastname,
        _id:user._id

    }))
  })

//   res.json({  this will also work 
//     users:users.map((user)=>{
//         return {
//         username:user.username,
//         firstname:user.firstname,
//         lastname:user.lastname,
//         _id:user._id
 //        }
//     })
//   })
})


module.exports = router