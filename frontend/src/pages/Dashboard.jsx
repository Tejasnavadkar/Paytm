import { useLocation } from "react-router-dom"
import AppBar from "../components/AppBar"
import Balance from "../components/Balance"
import Users from "../components/Users"


function Dashboard(){
   const location = useLocation()
   const user = location.state
   console.log("dashboard--",user)
    return <>
    <div className="flex flex-col w-full my-4">
        <AppBar user={user}/>
        <Balance/>
        <Users/>
    </div>
    </>
}
 
export default Dashboard