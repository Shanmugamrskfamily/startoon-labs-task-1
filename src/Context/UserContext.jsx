import { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState();
    const [userRole, setUserRole] = useState();
    const [userEmail, setUserEmail] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            // Fetch user information using the token
            axios.get('http://localhost:5000/user/get-user', {
                headers: {
                    'x-auth-token': token
                }
            })
            .then(response => {
                const { userName, role, email } = response.data;
                setUserName(userName);
                setUserRole(role);
                setUserEmail(email);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
    },[]);

    return (
        <UserContext.Provider value={{ userName, userRole, userEmail }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
