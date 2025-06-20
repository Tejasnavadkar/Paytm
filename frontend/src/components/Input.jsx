

function Input({label,placeholder,onChange,type = "text"}){
    return<>
    <div className="">
       <div className="font-medium text-left py-2"> 
        <label htmlFor="">{label}</label>
       </div>
       <div className="w-full">
       <input type={type} onChange={onChange} placeholder={placeholder} className="w-full py-1 px-2 border rounded border-slate-200"/>
       </div>
       
    </div>
    </>
}
export default Input