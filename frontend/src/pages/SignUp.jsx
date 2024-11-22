import { useState } from "react"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import Input from "../components/Input"
import Subheading from "../components/Subheading"
import axios from 'axios'


function SignUp(){
    const [firstname,setFirstname]= useState("")
    const [lastname,setLastname]= useState("")
    const [username,setUsername]= useState("")
    const [password,setPassword]= useState("")
  return<>
  <div className='bg-slate-300 h-screen  flex justify-center items-center'>
    
    {/* <div className="bg-white w-80 h-3/4 flex flex-col justify-center rounded-lg"> */}
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
    <Heading label={"Sign up"}/>
    <Subheading lable={"Enter your information to create an account"}/>
    <Input onChange={(e)=>{
        setFirstname(e.target.value)
    }} label={"First Name"} placeholder={"First Name"}/>
    <Input onChange={(e)=>{
        setLastname(e.target.value)
    }} label={"Last Name"} placeholder={"Last Name"}/>
    <Input onChange={(e)=>{
        setUsername(e.target.value)
    }} label={"Email"} placeholder={"Email"}/>
    <Input onChange={(e)=>{
        setPassword(e.target.value)
    }} label={"Password"} placeholder={"password"}/>
    <Button label={"SignUp"} onClick={ async ()=>{
        await axios.post("http://localhost:3000/api/v1/user/signup",{
            username,
            firstname,
            lastname,
            password
        })
    }}/>
    <BottomWarning label={"Already have an account?"} buttonText={"Signin"} to={"/signin"}/>
    </div>
  </div>

  </>
}

export default SignUp