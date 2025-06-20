import { useLocation } from "react-router-dom"
import AppBar from "../components/AppBar"
import Balance from "../components/Balance"
import Users from "../components/Users"
// import { userAtom } from "../store.js/atom"


function Dashboard(){
   const location = useLocation()
   const user = location.state
   console.log("dashboard--",user)
//    const username = useRecoilValue(userAtom)
    return <>
    <div className="flex flex-col w-full my-4">
        <AppBar/>
        <Balance/>
        <Users/>
    </div>
    </>
}
 
export default Dashboard