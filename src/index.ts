import express from 'express';
import memCache from 'memory-cache';

import * as db from './db/index.json';

import {cacheData} from './middleware/cache';
import {index} from './routes';
import { addProduct, removeProduct, clearCart} from './routes/products';

require('dotenv').config();

const app = express();
const port = process.env.PORT;
const cache = new memCache.Cache();
const {products, cart} = db; // Destructure items from temp DB.

// Before we even serve a route, load our products and cart into a cache so they can be manipulated.
// Ideally this should be middleware and abstracted.
cacheData('products', products, 100, cache);
cacheData('cart', cart, 100, cache);

// Fetch root automatically to display something on load
app.get('/', index);

// Add item to cart
app.post('/cart/add/:id', addProduct(cache));

// Remove item from cart
app.post('/cart/remove/:id', removeProduct(cache));

// Remove all items from cart
app.post('/cart/clear', clearCart(cache));

// Set Express to list to our port provided in the dotenv config file.
app.listen(port, () => {
    console.log(`Express started at http://localhost:${port}`)
});

app.on('uncaughtException', (err) => {
    console.log("Uncaught exception: " + err.stack);
})