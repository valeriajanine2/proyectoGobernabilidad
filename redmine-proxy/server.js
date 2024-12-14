const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3002;

// Middleware to parse JSON requests
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

//start
app.get('/', (req, res) => {
    res.send('Proxy server is running. Use POST /api/create-issue to create an issue.');
});


// Route to handle issue creation
app.post('/api/create-issue', async (req, res) => {
    console.log('Proxy received request:', req.body);
    console.log('subject: ', req.body.issue);

    try {
        const response = await axios.post('http://172.17.238.81/redmine/issues.json', {
            issue: {
                project_id: 1,
                subject: req.body.issue.subject,
                description: "Creando una nueva petición desde el frontend",
                priority_id: 1
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Redmine-API-Key': '09c70efcedec95629e1e355531d5288a948622eb'
            }
        });

        console.log('Redmine API response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error from Redmine:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({ error: error.response?.data || error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
