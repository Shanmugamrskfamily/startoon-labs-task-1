
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './Pages/Auth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard';
import UsersChart from './Pages/UsersChart';
import ChangePassword from './Pages/ChangePassword';
import Header from './Components/Header';

function App() {

  return (
        <BrowserRouter>
        <ToastContainer/>
        <Header/>
          <Routes>
            <Route path="/" element={<Auth/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/chart" element={<UsersChart/>}/>
            <Route path="/change-password" element={<ChangePassword/>}/>
          </Routes>
        </BrowserRouter>
  )
}

export default App
