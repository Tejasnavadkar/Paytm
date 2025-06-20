const express = require("express")
const router = express.Router()
const { SignupSchema, SigninSchema, updateBody } = require("../zodValidation")
const { User, Account } = require("../db")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")
const { AuthMiddleware } = require("../middleware")

router.post("/Signup", async (req, res) => {
  const userData = req.body
  console.log("userdata--", userData)
  const parsed = SignupSchema.safeParse(userData)
  //  console.log("/signup endpoint----------")
  console.log("success--", parsed.success)
  if (!parsed.success) {
    return res.status(411).json({ message: "Email already taken/invalid input", errors: parsed.error.errors })
  }

  const isExist = await User.findOne({
    username: userData.username
  })

  if (isExist) {
    return res.status(411).json({ message: "Email already taken/invalid input" })
  }
  
    const newUser = await User.create({
      username: userData.username,
      firstname: userData.firstname,
      lastname: userData.lastname,
      password: userData.password
    })
    const userId = newUser._id
    console.log("userId--",userId)
    // --------------------add-dumy-balance----------------------------------------------------

    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000
    })
  
  //------------------------------------------------------------------------------
   
  const token = jwt.sign({ userId }, JWT_SECRET)
  res.status(200).json({
    message: "user created successfully..!",
    token: token,
    isUserExist:newUser
  })




})

router.post("/Signin", async (req, res) => {
  const userData = req.body
  const { success } = SigninSchema.safeParse(userData)

  if (!success) {
    res.status(411).json({ message: "invalid credential" })
  }

  try {
    
  // const isEmailExist = await User.findOne({
  //   username: userData.username,
  // })

  // if(!isEmailExist){
  //   return res.status(404).json({
  //     message:'wrong credentials'
  //   })
  // }

   const isUserExist = await User.findOne({
    username:userData.username,
    password: userData.password,
  })

  if(!isUserExist){
   return res.status(404).json({
      message:'wrong credentials'
    })
  }

    const userId = isUserExist._id
    const token = jwt.sign({ userId }, JWT_SECRET)
    return res.json({ token: token,isUserExist })

  } catch (error) {
    res.status(411).json({ message: error.message })
  }
  

 

})

router.put("/update", AuthMiddleware, async (req, res) => {
  console.log("update-route-2------")
  const userData = req.body
  const parsed = updateBody.safeParse(userData)
  if (!parsed.success) {
    return res.status(411).json({ message: "Error while updating information", errors: parsed.error.errors })
  }
  try {
    console.log("update-route-2------", userData)
    await User.updateOne({ _id: req.userId }, userData)
    res.json({ message: "updated successfully" })
  } catch (err) {
    console.log("router.put()", err)
    res.status(500).json({ message: "something went wrong" })
  }
})

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";  // if params abscent return all users
  console.log("filter of bulk", filter)
  const users = await User.find({  // here we can get users by searching there name 
    $or: [{
      firstname: {
        "$regex": filter
      },
    }, {
      lastname: {
        "$regex": filter
      }
    }]
  })

  res.status(200).json({
    users: users.map((user) => ({  //if use () no need to return here we did not return password
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id

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