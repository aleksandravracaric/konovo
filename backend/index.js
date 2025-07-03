const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());

// Nije moguce gadjati api konovo.rs/login sa fronta zbog CORS-a
app.post('/api/login', async (req, res) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== API_KEY) {
        return res.status(401).json({ error: 'Invalid API key' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    }

    try {
        const response = await axios.post('https://zadatak.konovo.rs/login', {
            username,
            password
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Login error:', error.message);

        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        } else {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});