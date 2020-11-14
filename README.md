# Ecommerce Microservice [unfinished]
A microservice that serves endpoints to control elements of an ecommerce site.

## Description
The microservice is a strongly typed Express based API. Properly typing request and response values removes any ambiguity when accepting data from a store and delivering it to the frontend or client requesting the data.

## Known issues
Cache doesn't function correctly, ideally I'd replace this with a NoSQL solution like MongoDB. I've written the application as if the caching service updated appropriately.

## Task
### Must haves
- Endpoint for adding an item.
- Endpoint for removing an item.
- Endpoint for clearing the entire basket.
- Endpoint for listing all the items in the basket, must have an ID, a title and a price.

### Bonus
Endpoint which takes a list of item ids, their weight in KG, days it will take to deliver item as input parameters. The end point will return list of item ID’s which can be fit in a single delivery box with a capacity of 10 kilograms and total sum of delivery days as low as possible from the list sent as input. The endpoint will also return sum of delivery days item that can fit in that box.
- All items weights are between 1 and 9 KG and always in full kilograms
- Max weight allowed in the delivery box is 10 KG.
- Must put item in the box if an item weighs less than remaining capacity.
- Example: Input
- ID: Item1, Item2, Item3, Item4, Item5, Item6
- Weight: 1,8,7,4,3,2
- Delivery Days: 4,1,2,10,3,5
- Example: Output (if more than one correct answers, choose any 1)
- ID: Item 2, Item1
- Delivery days sum: 5

## Requirements
- Yarn 1.x
- NodeJs

## Scripts
### `yarn install`
Run this first to install the required dependencies.

### `yarn dev`
When looking to develop the service you can compile the source on the fly using the `yarn dev` command.

### `yarn build`
Before starting the script you must compile it to the `./build` directory.

### `yarn start`
After building you can run the compiled service and hit `http://localhost:3000` to reach it.

## Endpoints
### `/` [GET]
**What does it do?**
Basic index just to center the application around.

**What more could it do?**
Ideally with more time I'd like annotated documentation to this endpoint, maybe something that could be generated inline like [Swagger](https://swagger.io/)

### `/cart` [GET]
**What does it do?**
Endpoint that serves as a base to the cart url pattern and returns all cart items.

**What more could it do?**
Not too much I'd change here, simple functionality that should be consistent.

### `/cart/clear` [GET]
**What does it do?**
Quite simply drops the entire cart from the store.

**What more could it do?**
Not too much I'd change here, simple functionality that should be consistent.

### `/cart/add/:id` [POST]
**What does it do?**
Takes a product id supplied as a parameter and finds it in the product store. Once found it adds that product object + a quantity to the cart if it doesn't exist, else it just increments the quantity of the existing cart item. 

**What more could it do?**
This endpoint is one that I've annotated as needing a proper parsing system. The values that come out of the store need to be parsed from unknown to the proper type to ensure the data quality we're serving up to the client is high. If this gets skipped or cast (like i've done here) we run the risk of submitting an unexpected value.

### `/cart/remove/:id` [POST]
**What does it do?**
Takes a product id supplied as a parameter and finds it in the product store. Once found it either decreases the quanity in the cart OR if the quantity is 1 it'll remove the product from the cart.

**What more could it do?**
Similar to the other POST endpoints I need some value parsing in this endpoint.

## Architecture and Deployment
If I had more time on this project i'd write a script to containerise the application with Docker. I'd build it inside the container and remove as much src post build as possible to keep it extremely light and quick.

The container would ideally be built as part of the CI / CD pipeline and shipped to a Kubernetes Pod to be managed and scaled appropriately.

## Storage
Unfortunately the temporary caching solution I tried to add to this service didn't work as intended but in an ideal world I'd use a NoSQL solution in the form of MongoDB. As we're in Typescript and heavily using JSON objects it makes sense to interact with our data in a similar manner. Mongo's document data structure is extremely close to this, it would require minimal middleware interation to get the data into a usable format for Typescript and, finally, it's data can be typed explicitly for reading, meaning data would only need to be parsed on insertion resulting in a quick fetching to serving end to end process.

## Middleware
As stated above using a storage solution like Mongo means we can strictly type our data on the way into the store. We could identify our input endpoints and in a piece of middleware intercept the data so that we can check it against a typeguard and sanitise where appropriate before it hits our endpoint callback.

## Testing
I don't have too much experience testing microservices so wouldn't know what is most efficient but I believe some basic unit testing per endpoint with [Jest](https://jestjs.io/) for both a happy path and error routes would do the trick to ensure they're working correctly would suffice.

## Code quality
Code quality is of big importance in something that needs to be consistent like a microservce. I'd add the following dependencies to tighten up the code base:
1. JSDoc - this helps with annotation and relays a dev's thought processes. If a dev leaves and another picks it up this is the first line of defence in avoiding confusion and persisting a transition without hiccups.
1. ESLint - enforcing code standards is an extremely good way of esuring developers are consistently working to a set of rules across the board.
1. Prettier - enforcing code styling isn't required but a consistent look and feel to the code makes it much easier on the eye and if a standard is implemented across similar services then developers know what to expect, hopping from one to another is an almost seamless development experience.
1. Husky / linted-staged - Git hooks are important and ensuring a dev's code reaches a level of automated standards and passes tests before it hits a PR is extremely important. We don't want to offload processing to a paid service on a server when a good chunk of it can be done in the dev's CLI.