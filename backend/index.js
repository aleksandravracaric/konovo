const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const KONOVO_BASE_URL = 'https://zadatak.konovo.rs'

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
        const response = await axios.post(`${KONOVO_BASE_URL}/login`, {
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

app.get('/api/products', async (req, res) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== API_KEY) {
        return res.status(401).json({ error: 'Invalid API key' });
    }

    const authHeader = req.headers['authorization'];

    try {
        const response = await axios.get(`${KONOVO_BASE_URL}/products`, {
            headers: {
                Authorization: `${authHeader}`
            }
        })

        let products = response.data;

        products = products.map((product) => {
            if (product.categoryName && product.categoryName.trim().toLowerCase() === 'monitori') {
                product.price = +(product.price * 1.1).toFixed(2);
            }

            if (product.description) {
                product.description = product.description.replace(/brzina/gi, 'performanse');
            }
            return product;
        });

        const { category, search } = req.query;


        if (category && category.trim() !== '') {
            products = products.filter((p) =>
                p.categoryName?.toLowerCase() === category.toLowerCase()
            );
        }

        if (search && search.trim() !== '') {
            products = products.filter((p) =>
                p.naziv?.toLowerCase().includes(search.toLowerCase()));
        }

        res.json(products);
        return res.status(200).json(response.data);

    } catch (error) {
        return res.status(400).json({ error: error })
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});