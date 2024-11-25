
import Button from "../components/Button"
import Heading from "../components/Heading"
import Input from "../components/Input"
import { useSearchParams,useNavigate, useLocation , Link} from "react-router-dom"
import { useState } from "react"

function TransactionStatus(){
    const location = useLocation()
    const message = location.state

    return<>
    
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
            <Heading label={"Transaction Status"} />
            <div className="font-semibold text-center"> 
            {message ? <div>{message} ✅</div> : ""}
                <div>
                    <Link to={"/dashboard"}>Go To Home</Link>
                </div>
            </div>

          
        </div>
    </div>
    </>
}
export default TransactionStatus