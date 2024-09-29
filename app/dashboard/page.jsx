// components/BarChart.js
"use client"
import React, { useEffect, useState } from 'react';
import Detail from './_components/Detail';
import Cookies from 'js-cookie';
import axios from 'axios';
import Chart from './_components/Chart';

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};



export default function Dashboard() {

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Read _id from the cookie
                const userId = Cookies.get('_id');

                if (!userId) {
                    throw new Error('User ID not found in cookies');
                }

                // Send a GET request to the API with the _id
                const response = await axios.get(`http://localhost:3000/api/userId`, {
                    params: { id: userId }, // Send _id as query parameter
                });
                console.log("response.data", response.data)

                // Store the user data in state
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!userData) {
        return <p>Loading...</p>;
    }



    return (
        <div >
            {/* <div>{JSON.stringify(userName.name)}</div> */}
            <Detail user={userData} />
            {/* // <div style={{ width: '100%', height: 400 }}> */}
            <Chart user={userData} />
            {/* // </div> */}
        </div>
    );
};
