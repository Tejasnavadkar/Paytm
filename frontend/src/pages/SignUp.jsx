import { useState } from "react"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import Input from "../components/Input"
import Subheading from "../components/Subheading"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { userAtom } from "../store.js/atom"
import { useSetRecoilState } from "recoil"
import {SignupSchema} from "../zodValidation"

function SignUp(){
    const [firstname,setFirstname]= useState("")
    const [lastname,setLastname]= useState("")
    const [username,setUsername]= useState("")
    const [password,setPassword]= useState("")
    const [error,setError] = useState(null)
    const navigate =useNavigate()
   const setUserAtom = useSetRecoilState(userAtom)

   const handlSubmit = async ()=>{

    const inputData = {
            username,
            firstname,
            lastname,
            password
    }

    const parsed = SignupSchema.safeParse(inputData)
     console.log('inputdata--',inputData)
    console.log('parsed--',parsed)

    if(!parsed.success){
        // console.log(parsed.error.formErrors.fieldErrors)
         setError(parsed.error.formErrors.fieldErrors)
         return
    }
     
       try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/signup`,inputData)
        console.log("response--",response)

        if(response.status == 200){
            localStorage.setItem('token',response.data.token)
            // localStorage.setItem('username',response.data.firstname)
            localStorage.setItem('currentUser',JSON.stringify(response.data.isUserExist))
            setUserAtom(response.data.isUserExist.firstname)
            navigate("/dashboard")
        }
       } catch (error) {
        alert(error.response.data.message)
       }
      
    }
    
  return<>
  <div className='bg-slate-300 h-screen  flex justify-center items-center'>
    
    {/* <div className="bg-white w-80 h-3/4 flex flex-col justify-center rounded-lg"> */}
    <div className="rounded-lg bg-white w-96 p-2 h-max px-8 py-6">

    <Heading label={"Sign up"}/>

    <Subheading lable={"Enter your information to create an account"}/>

    <Input onChange={(e)=>{
        setFirstname(e.target.value)
    }} label={"First Name"} placeholder={"First Name"}/>
    <div>
        {error?.firstname && <p className="text-xs text-red-600" >{error?.firstname[0]}</p>}
    </div>

    <Input onChange={(e)=>{
        setLastname(e.target.value)
    }} label={"Last Name"} placeholder={"Last Name"}/>
    <div>
        {error?.lastname && <p className="text-xs text-red-600" >{error?.lastname[0]}</p>}
    </div>

    <Input onChange={(e)=>{
        setUsername(e.target.value)
    }} label={"Email"} placeholder={"Email"}/>
    <div>
        {error?.username && <p className="text-xs text-red-600" >{error?.username[0]}</p>}
    </div>
    
    <Input onChange={(e)=>{
        setPassword(e.target.value)
    }} label={"Password"} placeholder={"password"} type={"password"}/>
    <div>
        {error?.password && <p className="text-xs text-red-600" >{error?.password[0]}</p>}
    </div>

    <Button label={"SignUp"} onClick={handlSubmit}/>

    <BottomWarning label={"Already have an account?"} buttonText={"Signin"} to={"/signin"}/>

    </div>
  </div>

  </>
}

export default SignUp