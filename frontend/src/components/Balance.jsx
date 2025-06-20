import axios from "axios"
import { useEffect, useState } from "react"


function Balance(){
const [balance,setBalance] =  useState("")

  const fetchBalance = async () =>{
    console.log("this is balance compo")
    try {
      const response =  await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/account/balance`,{
      headers:{
        authorization: "Bearer " + localStorage.getItem('token') , 
        // ContentType: 'application/json'
      }
    })
    if(response.status == 200){
      console.log("balance--",response)
      setBalance(response.data.balance)
    }
    } catch (error) {
      throw new error(`error while fetching balance: ${error.message}`)
    }
  }

  useEffect(()=>{
    fetchBalance()
  },[])
    return <>
      <div className="flex justify-start gap-2 font-bold my-4 mx-14">
        <div>Your Balance:</div>
        <div>{!isNaN(balance) ? `Rs ${parseFloat(balance)?.toFixed(2)}` : (<div className="text-red-600" >unable to fetch balance</div>)}</div>
        </div>
    </>
}

export default Balance