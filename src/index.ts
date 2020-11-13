import express from 'express';
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Fetch root automatically to display something on load
app.get('/', (req, res) => {
    res.send('Welcome to the ecommerce microservice!');
});

// Set Express to list to our port provided in the dotenv config file.
app.listen(port, () => {
    console.log(`Express started at http://localhost:${port}`)
});