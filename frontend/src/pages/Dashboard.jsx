import AppBar from "../components/AppBar"
import Balance from "../components/Balance"
import Users from "../components/Users"


function Dashboard(){
    return <>
    <div className="flex flex-col w-full my-4">
        <AppBar/>
        <Balance balance={10000}/>
        <Users/>
    </div>
    </>
}

export default Dashboard