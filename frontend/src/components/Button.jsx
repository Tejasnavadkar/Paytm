

function Button({label,onClick}){
    return<>
    <div className="w-full px-2 py-4">
    <button type="button" onClick={onClick} className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{label}</button>
    </div>
    
    </>
}

export default Button