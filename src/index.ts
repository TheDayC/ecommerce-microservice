import express, { Request, Response } from 'express';
import * as products from './db/products.json';
import {cache} from './middleware/cache';

require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Before we even serve a route, load our products into a cache so they can be manipulated.
cache('products', products.items, 100);

// Fetch root automatically to display something on load
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the ecommerce microservice!');
});

// Set Express to list to our port provided in the dotenv config file.
app.listen(port, () => {
    console.log(`Express started at http://localhost:${port}`)
});