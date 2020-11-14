import { NextFunction, Response } from 'express';
import { Cache, ICartItem, IProduct } from '../types/db';

import { CustomRequest, ExpressFunc } from '../types/express';

export function addProduct(cache: Cache): ExpressFunc {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const products = cache.get('products') as IProduct[];
        const cart = cache.get('cart') as ICartItem[];

        if (products && req.body.product && req.params.id) {
            const id = parseInt(req.params.id);
            const productToAdd = products.find(p => p.id === id);

            if (productToAdd) {
                const hasProduct = Boolean(cart.find(c => c.id === id));

                if (hasProduct) {
                    const productIndex = cart.findIndex(c => c.id === id);

                    cart[productIndex].amount = cart[productIndex].amount + 1;
                } else {
                    // If this is the first in the cart, push the new product to the cart.
                    cart.push({...productToAdd, amount: 1});
                }

                // Add the cart to the cache
                cache.put('cart', cart);

                // Stringify and send our cart back.
                res.status(200).send(JSON.stringify(cart));
            } else {
                res.status(400).send({ error: 'Product not found in DB.' });
            }            
        } else {
            res.status(400).send({error: 'Product not sent in body.'});
        }

        next();
    }
}

export function removeProduct(cache: Cache): ExpressFunc {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const products = cache.get('products') as IProduct[];
        const cart = cache.get('cart') as ICartItem[];

        if (products && req.body.product && req.params.id) {
            const id = parseInt(req.params.id);
            const productToAdd = products.find(p => p.id === id);

            if (productToAdd) {
                const hasProduct = Boolean(cart.find(c => c.id === id));

                if (hasProduct) {
                    const productIndex = cart.findIndex(c => c.id === id);
                    const amount = cart[productIndex].amount;

                    // If our amount is greater than 1 just decrement the count else remove the item entirely.
                    amount > 1 ? cart[productIndex].amount - 1 : cart.splice(productIndex, 1);
                }

                // Add the cart to the cache
                cache.put('cart', cart);

                // Stringify and send our cart back.
                res.status(200).send(JSON.stringify(cart));
            } else {
                res.status(400).send({ error: 'Product not found in DB.' });
            }            
        } else {
            res.status(400).send({error: 'Product not sent in body.'});
        }

        next();
    }
}

export function clearCart(cache: Cache): ExpressFunc {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        // Clear the cart in cache
        cache.put('cart', []);

        // Stringify and send our cart back.
        res.status(200).send(JSON.stringify([]));

        next();
    }
}

export function listCart(cache: Cache): ExpressFunc {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const cart = cache.get('cart') as ICartItem[];

        // Stringify and send our cart back.
        res.status(200).send(JSON.stringify(cart));

        next();
    }
}


