import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Send from './pages/Send'
import PrivateRout from './components/PrivateRout'
import TransactionStatus from './components/TransactionStatus'


function App() {

  return (
    <div>
       <BrowserRouter future={{v7_startTransition:true,v7_relativeSplatPath:true}}>
       <Routes>
        {/* <Route path='/' element={<PrivateRout />}> */}
        <Route path='/dashboard' element={<PrivateRout>
          <Dashboard/>
          </PrivateRout>} />
        <Route path='/send' element={<PrivateRout><Send/></PrivateRout>} />
        <Route path='/transaction' element={<PrivateRout><TransactionStatus/></PrivateRout> } />  
        {/* </Route> */}

        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/' element={<SignIn/>} />
        
       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
