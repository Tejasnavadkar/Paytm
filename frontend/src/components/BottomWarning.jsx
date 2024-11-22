import { Link } from "react-router-dom"


function BottomWarning({label,buttonText,to}){
    return<>
    <div className="flex justify-center text-sm font-medium pb-2">
    <div>{label}</div>
    <Link className="underline cursur-pointer pl-1" to={to}>{buttonText}</Link>
    </div>
    </>
}

export default BottomWarning