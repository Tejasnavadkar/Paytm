import { useState } from "react"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import Input from "../components/Input"
import Subheading from "../components/Subheading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function SignIn(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()
   
    return <>
    <div>
    <div className='bg-slate-300 h-screen  flex justify-center items-center'>
    {/* <div className="bg-white w-80 h-3/4 flex flex-col justify-center rounded-lg"> */}
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
    <Heading label={"Sign In"}/>
    <Subheading lable={"Enter your credentials to access your account"}/>
    <Input onChange={(e)=>{
      setEmail(e.target.value)
    }} label={"Email"} placeholder={"Email"}/>
    <Input onChange={(e)=>{
      setPassword(e.target.value)
    }} label={"Password"} placeholder={"password"}/>
    <Button label={"SignIn"} onClick={async ()=>{
      const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
        username:email,
        password
       })
       if(response.status == 200){
        console.log(response)
        localStorage.setItem('token',response.data.token)
            navigate("/dashboard",{state:response.data.isUserExist})
       }
      else alert("wrong credentials")

    }}/>
    <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}/>
    </div>
  </div>
    </div>
    </>
}

export default SignIn