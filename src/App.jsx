
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './Pages/Auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
        <BrowserRouter>
        <ToastContainer/>
          <Routes>
            <Route path="/" element={<Auth/>}/>
          </Routes>
        </BrowserRouter>
  )
}

export default App
