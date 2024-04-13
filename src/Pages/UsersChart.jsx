import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const UsersChart = () => {
  const [loginActivity, setLoginActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/admin/get-login-activity', {
          headers: {
            'x-auth-token': token
          }
        });
        setLoginActivity(response.data.loginActivity);
      } catch (error) {
        console.error('Error fetching login activity:', error);
      }
    };

    fetchData();
  }, []);

  // Extracting dates and counts for chart data
  const dates = loginActivity.map(activity => activity.date);
  const counts = loginActivity.map(activity => activity.totalLoginCounts);

  // Creating data object for the chart
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Total Logins',
        data: counts,
        backgroundColor: 'rgb(75, 192, 192)',
      }
    ]
  };

  

  return (
    <div className="w-full max-w-screen-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">User Login Activity</h2>
      <div className="bg-white p-4 rounded shadow">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default UsersChart;
