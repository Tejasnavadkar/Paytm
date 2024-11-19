const mongoose = require("mongoose")
// const { Schema } = mongoose;
mongoose.connect("mongodb+srv://tejas12:p2u8qcBJ04TpAJKb@cluster0.3qgh0ao.mongodb.net/Paytm")

//schema for users table

// const userSchema = new mongoose.Schema({
//     username:String,
//     password:String,
//     firstname:String,
//     lastname:String
// })

//add constraints
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true, // no whitespace
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    }

})

const accountSchema = new mongoose({
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:User,
            required:true
         },
         balance:{
            type:Number,
            required:true
         }
    
})

const User = mongoose.model("User",userSchema)
const Account = mongoose.model("Account",accountSchema)

module.exports = {
    User,
    Account
}