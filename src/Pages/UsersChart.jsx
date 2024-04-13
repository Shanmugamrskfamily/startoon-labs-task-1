import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function UsersChart() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [cumulativeTotalLoginCounts, setCumulativeTotalLoginCounts] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/admin/get-login-activity', {
                    headers: {
                        'x-auth-token': token
                    }
                });

                const dates = response.data.loginActivity.map(item => item._id);
                const counts = response.data.loginActivity.map(item => item.totalLoginCounts);

                const ctx = document.getElementById('canvas').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: dates,
                        datasets: [{
                            label: 'Counts',
                            data: counts,
                            backgroundColor: 'rgb(27, 74, 202)'
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            },
                            x: {
                                maxRotation: 0,
                                minRotation: 0,
                                autoSkip: false,
                                ticks: {
                                    maxRotation: 0,
                                    minRotation: 0
                                }
                            }
                        }
                    }
                });

                // Fetch total users and cumulative total login counts
                const statsResponse = await axios.get('https://startoon-labs-web-be.onrender.com/admin/get-user-stats', {
                    headers: {
                        'x-auth-token': token
                    }
                });
                setTotalUsers(statsResponse.data.totalUsers);
                setCumulativeTotalLoginCounts(statsResponse.data.cumulativeTotalLoginCounts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto mb-8">
            <h1 className="text-4xl text-center mb-8">Users Activity Chart</h1>
            <div className="flex justify-between mb-4">
                <div className="p-4 border rounded-md ml-8 bg-blue-600 text-white text-bold hover:cursor-pointer text-center hover:text-yellow-400">
                    <h2 className="text-lg font-semibold mb-2">Total Users</h2>
                    <p className="text-xl">{totalUsers}</p>
                </div>
                <div className="p-4 border rounded-md mr-8 bg-blue-600 text-white text-bold hover:cursor-pointer text-center hover:text-yellow-400">
                    <h2 className="text-lg font-semibold mb-2">Total Login Counts</h2>
                    <p className="text-xl">{cumulativeTotalLoginCounts}</p>
                </div>
            </div>
            <canvas id="canvas" className="w-full h-64 md:h-80 lg:h-96"></canvas>
        </div>
    );
}

export default UsersChart;
