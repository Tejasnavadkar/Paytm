const mongoose = require("mongoose")
// const { Schema } = mongoose;

mongoose.connect(process.env.DB_URL)

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

const accountSchema = new mongoose.Schema({
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
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