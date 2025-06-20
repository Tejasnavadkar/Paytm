import Heading from "../components/Heading"
import { useLocation , Link} from "react-router-dom"

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
                    <Link className="underline text-blue-700" to={"/dashboard"}>Go To Home</Link>
                </div>
            </div>

          
        </div>
    </div>
    </>
}
export default TransactionStatus