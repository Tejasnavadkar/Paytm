import axios from "axios";
import Button from "./Button"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { memo } from "react";


function Users() {
    const [users, setUsers] = useState([]);
    const [filter,setFilter] = useState("")
    const [currentUser,setUser] = useState("")
    const [isLoading,setLoading] = useState(true)

   
console.log('users-',users)
    const FetchData = async () =>{
       try {
         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/bulk?filter=` + filter)
        
        if(response.status === 200){
            setUsers(response.data.users)
            setLoading(false)
        }
       } catch (error) {
        setLoading(false)
        throw new Error(`error while fetching users: ${error.message}`)
       }
       
    }
    // function Debounce(callback,delay){  this works in js
    //     let timeId
    //    return function (){
    //     clearTimeout(timeId)
    //      timeId =  setTimeout(()=>{
    //           callback()
    //       },delay)
    //    }
    // }
    // const betterFunction = Debounce(FetchData,2000)

    useEffect(()=>{
        const timeId = setTimeout(()=>{
            FetchData()
        },2000)
        setUser(JSON.parse(localStorage.getItem('currentUser')))

        return () => clearTimeout(timeId)
        
    },[filter])

    if(isLoading) return <div className="font-bold w-full py-16 flex justify-center items-center">Fetching users...</div>

    return <>
        <div className="mx-16">
            <div className="font-bold">Users</div>
            <div className="my-2 ">
                <input type="text" onChange={(e)=> setFilter(e.target.value)} placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
            </div>
            <div>
                { users.length > 0 ? (users.filter((user)=>user._id !== currentUser._id).map((user)=> (<User key={user._id} user={user} />))) : (<div className="font-bold text-2xl text-center mt-5" >No users have registered yet..!</div>) }
            </div>
        </div>
    </>
}


export default memo(Users)


function User({user}) {
    const navigate = useNavigate()
    return <>

        <div className="flex justify-between">
            <div className="flex items-center gap-2"> 
                <div className="bg-slate-300 h-12 w-12 rounded-full flex justify-center items-center ">
                    <div>
                        {user?.firstname[0].toUpperCase()}
                    </div>
                </div>
                <div className="font-medium">
                    {user?.firstname} {user?.lastname}
                </div>
            </div>
            <div><Button onClick={()=>{
                navigate("/send?id=" + user?._id + "&username=" + user?.firstname)
            }} label={"Send Money"}/></div>
        </div>

    </>
}
