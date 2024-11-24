// import { Route,redirect } from "react-router-dom"

import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"


// function PrivateRout({children,...rest}){
//     const auth = { 'token': false }

//     return <>
    
//     <Route {...rest}>
//         {auth.token ? children : <redirect to ="/signin"/>}
//     </Route>

//     </>

// }

// export default PrivateRout

// const useAuth =()=>{
//    const [isAuthenticated,setisAuthenticated] = useState(false)
//     useEffect(()=>{
//      const token = localStorage.getItem('token')
//      if(token){
//         setisAuthenticated(true)
//      }
//     },[])

//     return isAuthenticated
// }

function PrivateRout({children}){

// const [isAuthenticated,setisAuthenticated] = useState("")

// useEffect(()=>{
//  const token = localStorage.getItem('token')
//  if(token){
//     setisAuthenticated(token)
//  }
//  console.log("token in PrivateRout--",isAuthenticated)
// },[])
// // console.log("token in PrivateRout outside effect--",token)
//    if(!isAuthenticated){
//       console.log("inside isAuthenticated--",isAuthenticated)
//     return <Navigate to="/signin" />
//    }

//     return <Outlet/>

const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null to signify loading state

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    setIsAuthenticated(true);
  } else {
    setIsAuthenticated(false);
  }
}, []);

// While the state is loading, return nothing or a loader
if (isAuthenticated === null) {
  return <div>Loading...</div>; // Or return null to indicate no content during loading
}

// If not authenticated, redirect to sign-in
if (!isAuthenticated) {
  return <Navigate to="/signin" />;
}

// Otherwise, render the children or an outlet for nested routes
return <Outlet />;
}

export default PrivateRout

