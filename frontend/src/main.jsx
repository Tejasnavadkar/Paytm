import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import {ToastContainer} from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
    <App />
    <ToastContainer />
    </RecoilRoot>
  </React.StrictMode>,
)
