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
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<PrivateRout />}>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/send' element={<Send/>} />
        <Route path='/transaction' element={<TransactionStatus/> } />  
        </Route>

        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>} />
        
       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
