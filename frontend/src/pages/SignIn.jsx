import { useState } from "react"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import Input from "../components/Input"
import Subheading from "../components/Subheading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { userAtom } from "../store.js/atom"
import {SigninSchema} from "../zodValidation"
import { toast } from "react-toastify"

function SignIn(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()
  const setUserAtom = useSetRecoilState(userAtom)
  const [error,setError] = useState(null)

  const handleSubmit = async ()=>{

    const inputData = {
        username:email,
        password
       }

      const parsed = SigninSchema.safeParse(inputData)

       if(!parsed.success){
        // console.log(parsed.error.formErrors.fieldErrors)
         setError(parsed.error.formErrors.fieldErrors)
         return
    }

     try {
       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/signin`,inputData)
       if(response.status === 200){
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('currentUser',JSON.stringify(response.data.isUserExist))
        setUserAtom(response.data.isUserExist.firstname)
        toast.success('Logged in successfully..!')
        navigate("/dashboard")
       }
     } catch (error) {
       // console.log(error.response.data.message)
       toast.error(error.response.data.message)
       throw new Error(error.message)
     }

    }
   
    return <>
    <div>
    <div className='bg-slate-300 h-screen  flex justify-center items-center'>
    {/* <div className="bg-white w-80 h-3/4 flex flex-col justify-center rounded-lg"> */}
    <div className="rounded-lg bg-white w-96 p-2 h-max  px-8 py-6">

    <Heading label={"Sign In"}/>

    <Subheading lable={"Enter your credentials to access your account"}/>

    <Input onChange={(e)=>{
      setEmail(e.target.value)
    }} label={"Email"} placeholder={"Email"}/>
      <div>
        {error?.username && <p className="text-xs text-red-600" >{error?.username[0]}</p>}
    </div>

    <Input onChange={(e)=>{
      setPassword(e.target.value)
    }} label={"Password"} placeholder={"password"} type={"password"} />

    <Button label={"SignIn"} onClick={handleSubmit}/>

    <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}/>

    </div>
  </div>
    </div>
    </>
}

export default SignIn