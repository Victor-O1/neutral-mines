"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MethaneEmissionData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const api_url = "https://nasa-ammos.github.io/MMGIS/"; // Replace with actual API URL
    const token = "tF4acrnVHHwMzDTE5oHDVcbj2YWGHYJQYBR7Zwqf"; // Replace with actual token

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(api_url, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Replace token mechanism if different
                    },
                });
                setData(response.data); // Assuming response contains the methane emission data
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [api_url, token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Methane Emission Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default MethaneEmissionData;