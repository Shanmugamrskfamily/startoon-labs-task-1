import React, { useEffect, useState } from 'react';
import axios from 'axios';

function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', options);
}

function AdminDashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/admin/get-users', {
                    headers: {
                        'x-auth-token': token
                    }
                });
                const updatedUsers = response.data.users.map(user => ({
                    ...user,
                    cumulativeCounts: user.loginCounts.reduce((total, login) => total + login.count, 0),
                    lastLogin: formatDate(user.lastLogin),
                }));
                setUsers(updatedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <table className="table-auto mr-2 ml-2 w-full border-collapse">
                <thead>
                    <tr>
                        <th className="px-4 py-2">S.No</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Gender</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Counts</th>
                        <th className="px-4 py-2">Last Login</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id} className="hover:bg-gray-100 hover:cursor-pointer">
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.gender}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.cumulativeCounts}</td>
                            <td className="border px-4 py-2">{user.lastLogin}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;
