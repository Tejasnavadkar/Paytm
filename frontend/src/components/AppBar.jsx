import { useNavigate } from "react-router-dom"
import Button from "./Button"
// import { useRecoilValue } from "recoil"
// import { userAtom } from "../store.js/atom"
import { useEffect, useState,memo } from "react"



function AppBar(){
          const navigate = useNavigate()
          const [user,setUser] = useState(null)
         //  const username = useRecoilValue(userAtom)
         //  console.log("userAtom--",username)

         useEffect(()=>{
           const user = JSON.parse(localStorage.getItem('currentUser'))
           if(user){
            setUser(user)
           }
         },[])

    return<>
    <div>

        <nav className="flex h-14 mx-14 px-4 rounded-md justify-between text-sm font-medium shadow-lg">
            <div className="flex flex-col justify-center">
                PayFlow
            </div>

            <div className="flex gap-2 h-full items-center ">
                <div>
                   Hello,{user?.firstname?.charAt(0).toUpperCase() + user?.firstname?.slice(1) || "Guest"}
                </div>
                <div className="bg-slate-300 h-12 w-12 rounded-full flex justify-center items-center ">
                    <div>
                       {/* {user && user.length > 0 ? user.firstname[0].toUpperCase() : "U"} */}
                       {user ? user?.firstname[0]?.toUpperCase() : "U"}
                    </div>
                </div>
                <div><Button onClick={()=>{
                    localStorage.clear()
                    navigate("/")

                }} label={"logout"} /></div>
            </div>
        </nav>

    </div>
    </>
}

export default memo(AppBar)