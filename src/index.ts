import express, { Request, Response } from 'express';
import memCache from 'memory-cache';

import * as products from './db/products.json';

import {cacheData, loadProducts} from './middleware/cache';
import {index} from './routes';
import {addProduct} from './routes/products';

require('dotenv').config();

const app = express();
const port = process.env.PORT;
const cache = new memCache.Cache();

// Before we even serve a route, load our products into a cache so they can be manipulated.
cacheData('products', products.items, 100);

// Fetch root automatically to display something on load
app.get('/', index);

// Add item
app.post('/products/add', loadProducts('products', cache), addProduct);

// Set Express to list to our port provided in the dotenv config file.
app.listen(port, () => {
    console.log(`Express started at http://localhost:${port}`)
});