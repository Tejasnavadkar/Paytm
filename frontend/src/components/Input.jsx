

function Input({label,placeholder,onChange}){
    return<>
    <div className="">
       <div className="font-medium text-left py-2"> 
        <label htmlFor="">{label}</label>
       </div>
       <div className="w-full">
       <input type="text" onChange={onChange} placeholder={placeholder} className="w-full py-1 border rounded border-slate-200"/>
       </div>
       
    </div>
    </>
}
export default Input