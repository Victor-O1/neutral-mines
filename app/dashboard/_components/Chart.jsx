import axios from 'axios';
import { eachDayOfInterval } from 'date-fns';
import Cookies from 'js-cookie';
import React, { useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LineChart, Line } from 'recharts';



const Chart = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [allDates, setallDates] = useState(null)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Read _id from the cookie
                const userId = Cookies.get('_id'); // Assuming the cookie name is '_id'

                if (!userId) {
                    throw new Error('User ID not found in cookies');
                }

                // Send a GET request with the _id as a query parameter
                const response = await axios.get(`http://localhost:3000/api/userId`, {
                    body: { id: userId }, // Send _id in query params
                    params: {} // Send _id in query params
                });

                // Store the user data in state
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
            }
        };

        fetchUserData();
    }, []);

    // Memoized sorted dashboard
    const sortedDashboard = useMemo(() => {
        if (userData && userData.dashboard) {
            return [...userData.dashboard].sort((a, b) => {
                // Convert dates to Date objects and compare them
                return new Date(a.date[0]) - new Date(b.date[0]);
            });
        }
        return [];
    }, [userData]);


    // Effect to update userData with sorted dashboard
    useEffect(() => {
        if (userData) {
            // Only update if there's a change in sortedDashboard
            if (JSON.stringify(userData.dashboard) !== JSON.stringify(sortedDashboard)) {
                setUserData(prevUserData => ({
                    ...prevUserData,
                    dashboard: sortedDashboard
                }));
            } else {
                console.log("no need to update since dashboard is not changed");

            }

        }
        else {
            console.log("User data was not found");

        }
    }, [userData, sortedDashboard]);







    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!userData) {
        return <p>Loading...</p>;
    }

    const formattedData = userData.dashboard.map((entry) => ({
        date: new Date(entry.date[0]).toLocaleDateString(), // Convert date to readable format
        extraction: entry.emissions.extraction || 0,
        transportation: entry.emissions.transportation || 0,
        processing: entry.emissions.processing || 0,
        blasting: entry.emissions.blasting || 0,
        handling: entry.emissions.handling || 0,
    }));


    const getDateRange = (startDate, endDate) => {
        return eachDayOfInterval({
            start: new Date(startDate),
            end: new Date(endDate),
        }).map(date => date.toLocaleDateString());
    };

    const graphData = () => {
        if (userData && userData.dashboard) {
            // Find the lowest and highest dates
            const allDates = userData.dashboard.flatMap(entry => entry.date);
            const sortedDates = allDates.sort((a, b) => new Date(a) - new Date(b));

            const minDate = sortedDates[0]; // Earliest date
            const maxDate = sortedDates[sortedDates.length - 1]; // Latest date

            // Generate all dates between minDate and maxDate
            const dateRange = getDateRange(minDate, maxDate);

            // Map each generated date to the corresponding emissions data
            return dateRange.map(date => {
                const matchingEntry = userData.dashboard.find(entry =>
                    entry.date.includes(date)
                );
                return {
                    date,
                    extraction: (typeof emissions !== 'undefined') ? emissions.extraction : 0,
                    transportation: matchingEntry?.emissions.transportation || 0,
                    processing: matchingEntry?.emissions.processing || 0,
                    blasting: matchingEntry?.emissions.blasting || 0,
                    handling: matchingEntry?.emissions.handling || 0,
                };
            });
        }

    }











    return (
        <div>
            {/* {JSON.stringify(userData)} */}
            <br />hello<br />
            {/* {JSON.stringify(userData.dashboard.flatMap(entry => entry.date).map(date => new Date(date).toLocaleDateString()))} */}
            <p></p>
            {/* {JSON.stringify(userData.dashboard.map(entry => entry.date).map((el) => [new Date(el[0]).toLocaleDateString(), new Date(el[1]).toLocaleDateString()]))} */}
            {/* {JSON.stringify(userData.dashboard.map(entry => entry.date).map((el) => new Date(el[0]).toLocaleDateString()))} */}
            <p></p><p></p>
            {/* {allDates} */}
            <BarChart width={800} height={400} data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="extraction" fill="#8884d8" />
                <Bar dataKey="transportation" fill="#82ca9d" />
                <Bar dataKey="processing" fill="#ffc658" />
                <Bar dataKey="blasting" fill="#ff7300" />
                <Bar dataKey="handling" fill="#a4de6c" />
            </BarChart>
            {JSON.stringify(graphData())}
            <BarChart width={800} height={400} data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="extraction" fill="#8884d8" />
                <Bar dataKey="transportation" fill="#82ca9d" />
                <Bar dataKey="processing" fill="#ffc658" />
                <Bar dataKey="blasting" fill="#ff7300" />
                <Bar dataKey="handling" fill="#a4de6c" />
            </BarChart>
            {JSON.stringify(formattedData)}
            <LineChart width={800} height={400} data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="extraction" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="transportation" stroke="#82ca9d" />
                <Line type="monotone" dataKey="processing" stroke="#ffc658" />
                <Line type="monotone" dataKey="blasting" stroke="#ff7300" />
                <Line type="monotone" dataKey="handling" stroke="#a4de6c" />
            </LineChart>
        </div>
    );
};

export default Chart;
