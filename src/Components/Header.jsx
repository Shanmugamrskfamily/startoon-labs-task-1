import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
    const location = useLocation();
    const navigate=useNavigate();

    const logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        toast.success('Logout Done!');
        navigate('/');
    }

    return (
        <nav className="p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                {location.pathname === '/' ? (
                    <Link to="/" className="text-white hover:text-amber-400">
                    Home
                </Link>
            ):null}                
                {location.pathname === '/'? null : (
                    <>
                        <Link to="/dashboard" className="text-white hover:text-amber-400">
                            Dashboard
                        </Link>
                        <Link to="/chart" className="text-white hover:text-amber-400">
                            Chart
                        </Link>
                    </>
                )}
            </div>
            {location.pathname === '/' ? null : (
                <button
                    onClick={logout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                    Logout
                    <i className="fa-solid fa-right-from-bracket ml-2"></i>
                </button>
            )}
        </nav>
    );
};

export default Header;
