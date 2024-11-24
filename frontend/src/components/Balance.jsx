import axios from "axios"
import { useEffect, useState } from "react"


function Balance(){
const [balance,setBalance] =  useState("")

  const fetchBalance = async () =>{
    console.log("this is balance compo")
  const response =  await axios.get("http://localhost:3000/api/v1/account/balance",{
      headers:{
        authorization: "Bearer " + localStorage.getItem('token') , 
        // ContentType: 'application/json'
      }
    })
    if(response.status == 200){
      console.log("balance--",response)
      setBalance(response.data.balance)
    }
  }

  useEffect(()=>{
    fetchBalance()
  },[])
    return <>
      <div className="flex justify-start gap-2 font-bold my-4 mx-14">
        <div>Your Balance</div>
        <div>Rs {parseFloat(balance).toFixed(2)}</div>
        </div>
    </>
}

export default Balance