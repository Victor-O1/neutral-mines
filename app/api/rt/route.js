// server.js
const axios = require('axios');
const cors = require('cors');



export const GET = async (request) => {
    try {
        app.use(cors()); // Enable CORS for all routes
        // const data = await axios.get('/api/methane-emission-data');
        const response = await axios.get('https://nasa-ammos.github.io/MMGIS/', {
            headers: {
                Authorization: `Bearer tF4acrnVHHwMzDTE5oHDVcbj2YWGHYJQYBR7Zwqf`,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
}

