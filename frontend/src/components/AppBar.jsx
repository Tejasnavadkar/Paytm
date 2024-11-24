import { useNavigate } from "react-router-dom"
import Button from "./Button"


function AppBar({user}){
          const navigate = useNavigate()
          console.log("Appbar--user",user)
    return<>
    <div>

        <nav className="flex h-14 mx-14 px-4 rounded-md justify-between text-sm font-medium shadow-lg">
            <div className="flex flex-col justify-center">
                PayTm App
            </div>

            <div className="flex gap-2 h-full items-center ">
                <div>
                   Hello,{user?.firstname}
                </div>
                <div className="bg-slate-300 h-12 w-12 rounded-full flex justify-center items-center ">
                    <div>
                       {user?.username[0].toUpperCase()}
                    </div>
                </div>
                <div><Button onClick={()=>{
                    localStorage.clear()
                    navigate("/signin")

                }} label={"logout"} /></div>
            </div>
        </nav>

    </div>
    </>
}

export default AppBar