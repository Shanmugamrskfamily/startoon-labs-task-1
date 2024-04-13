import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function UserDashboard() {
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const navigate=useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(!token){
            toast.warning('Your not authoraised to view this page!');
            navigate('/');
        }

        if (token) {
            // Fetch user information using the token
            axios.get('http://localhost:5000/user/get-user', {
                headers: {
                    'x-auth-token': token
                }
            })
            .then(response => {
                if(response.status===401){
                    toast.warning('Your Not Authoraized!');
                    navigate('/');
                }
                const { userName, email } = response.data;
                setUserName(userName);
                setUserEmail(email);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
    },[]);
    

    return (
        <div className="flex flex-col md:flex-row">
            {/* Image - hidden on smaller screens */}
            <div className="hidden md:flex items-center justify-center flex-1">
                <img src='./images/main.png' alt="Dashboard" className="max-w-xs" />
            </div>

            {/* Greetings */}
            <div className="flex-1 flex items-center justify-center">
                <div className="max-w-md text-center w-full px-4 py-8  shadow-md rounded-lg">
                    <h2 className="text-2xl mb-4">Welcome, {userName}!</h2>
                    <p className="mb-4">Your email: {userEmail}</p>
                    <div className='text-center'>
                    <Link to="/change-password" className="btn btn-primary text-white">
                        Change Password
                    </Link>
                    </div>
                </div>
            </div>

            {/* Image */}
            <div className="md:hidden flex items-center justify-center flex-1">
                <img src='./images/main.png' alt="Dashboard" className="max-w-xs" />
            </div>
        </div>
    );
}

export default UserDashboard;
