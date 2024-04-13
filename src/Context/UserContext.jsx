import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { Chart as ChartJs, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';


const UserContext = createContext();

const UserProvider = ({ children }) => {

    ChartJs.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

    const [loginActivity, setLoginActivity] = useState([]);

    useEffect(() => {
        const fetchLoginActivity = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://startoon-labs-web-be.onrender.com/admin/get-login-activity', {
                    headers: {
                        'x-auth-token': token
                    }
                });
                setLoginActivity(response.data.loginActivity);
                
            } catch (error) {
                console.error('Error fetching login activity:', error);
            }
        };

        fetchLoginActivity();
    }, []);
    

    return (
        <UserContext.Provider value={{ loginActivity }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
