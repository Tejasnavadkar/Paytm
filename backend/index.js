require('dotenv').config()
const express = require("express");
const rootRouter = require("./routes/index")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json()); // bodyparser middleware

app.use("/api/v1",rootRouter) //all the requests that starts with /api/v1 go to rootRouter eg /api/v1/users
// app.use("/api/v1/user",userRouter) this is also work you directly go frpm here





app.listen(port,(err)=>{
    if(err) console.log("err",err)
    console.log("server runing in 3000 port")
})


