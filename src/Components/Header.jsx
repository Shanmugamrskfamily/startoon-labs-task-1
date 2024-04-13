import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');

    const isAdmin = userRole === 'Admin';

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        toast.success('Logout Done!');
        navigate('/');
    };

    return (
        <nav className="p-4 flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
                {location.pathname == '/' && (
                    <Link to="/" className="text-black btn btn-active hover:bg-pink-400 hover:text-white">
                        Home
                    </Link>
                )}
                {location.pathname !== '/' && (
                    <Link to="/dashboard" className="text-black btn btn-active hover:bg-pink-400 hover:text-white">
                        Dashboard
                    </Link>
                )}
                {isAdmin && location.pathname !== '/' && (
                    <Link to="/chart" className="text-black btn btn-active hover:bg-pink-400 hover:text-white">
                        Chart
                    </Link>
                )}
            </div>
            {location.pathname !== '/' && (
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
