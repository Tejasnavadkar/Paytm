import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import Input from "../components/Input"
import Subheading from "../components/Subheading"

function SignIn(){
   
    return <>
    <div>
    <div className='bg-slate-300 h-screen  flex justify-center items-center'>
    {/* <div className="bg-white w-80 h-3/4 flex flex-col justify-center rounded-lg"> */}
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
    <Heading label={"Sign In"}/>
    <Subheading lable={"Enter your credentials to access your account"}/>
    <Input  label={"Email"} placeholder={"Email"}/>
    <Input label={"Password"} placeholder={"password"}/>
    <Button label={"SignUp"} onClick={()=>{console.log("hey")}}/>
    <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}/>
    </div>
  </div>
    </div>
    </>
}

export default SignIn