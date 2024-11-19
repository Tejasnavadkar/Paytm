const express = require("express")
const router = express.Router()
const {SignupSchema,SigninSchema,updateBody} = require("../zodValidation") 
const User = require("../db")
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


module.exports = router