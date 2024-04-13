import React, { useEffect, useState } from 'react';
import AdminDashboard from '../Forms/AdminDashboard';
import UserDashboard from '../Forms/UserDashboard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Dashboard() {
    const [userRole, setUserRole] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    // If token is not available, redirect to login page
                    toast.error('Session Expired! Please Login Again.');
                    navigate('/');
                    return;
                }
                
                const response = await axios.get('https://startoon-labs-web-be.onrender.com/user/get-user', {
                    headers: {
                        'x-auth-token': token
                    }
                });

                if (response.status >= 400) {
                    // If error status returned, log out user and redirect to login page
                    toast.error('Session Expired! Please Login Again.');
                    navigate('/');
                    return;
                }

                const { role } = response.data;
                setUserRole(role);
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error, maybe display a toast message
            }
        };
        getUserData();
    }, [navigate]); // Added navigate to the dependency array to prevent stale closure issues

    return (
        <div>
            {userRole === 'Admin' ? <AdminDashboard /> : <UserDashboard />}
        </div>
    );
}

export default Dashboard;
