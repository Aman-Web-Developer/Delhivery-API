const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = 5000;

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Your Delhivery API credentials
const DELHIVERY_API_URL = process.env.API_URL;
const DELHIVERY_API_KEY = process.env.API_KEY;

// Endpoint to handle tracking requests
app.get('/track', async (req, res) => {
    const { trackingId } = req.query;

    if (!trackingId) {
        return res.status(400).json({ error: 'Tracking ID is required' });
    }

    try {
        const response = await axios.get(`${DELHIVERY_API_URL}?waybill=${trackingId}`, {
            headers: {
                'Authorization': `Bearer ${DELHIVERY_API_KEY}`
            }
        });

        res.json(response.data);  // Return the tracking data
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tracking details' });
    }
});

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello World!\n');
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
