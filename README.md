# Gasly💨: an Ethereum gas statistics RESTful API
**The Problem:**
Any Ethereum dApp or smart contract is going to have, as one of its primary concerns, finding an efficient and cost-effective way to reduce gas expenditure. Having access to an up-to-date and easy-to-use Ethereum gas API is crucial if you want to have the information necessary to make wise choices regarding transactions and gas prices.

**The Solution:**
We can use an existing Ethereum Gas price API, namely the one on Etherscan, in order to create our own custom API which can be extended according to our specific use case. In this particular instance, our API will periodically poll the Etherscan API to retrieve current gas prices, save the information to our own database and expose 3 primary API endpoints:
 - `GET /gas` returns the current gas price tiers along with the current block number.
 - `GET /gas:blockNum` returns the gas price tiers for the block specified by blockNum.
 - `GET /average?fromTime=toTime=` returns the average gas price within the timeframe specified by `fromTime` and `toTime`, inclusively.

# Getting Started
1. You'll need to have Docker installed on your machine. I recommend installing Docker Desktop which comes with Docker Compose which allows you to run multiple Docker containers simultaneously, with ease. You can find instructions and download links for Docker [here](https://docs.docker.com/get-docker/).

2. You'll also need an Etherscan API key which you can get, for free, [here](https://etherscan.io/myapikey).

3. Clone this GitHub repository using `git clone https://github.com/sadministrator/gasly.git`.

4. Create a .env file in the root directory which will hold your environment variables:
   - `ETHERSCAN_API_KEY=<your Etherscan API key>`
   - `ETHERSCAN_GAS_ENDPOINT=https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=`
   - `PORT=3000`
   - `SERVER=server`
   - `DB=mongo`

5. Run `npm install` to install the project dependencies.

6. Having installed Docker Desktop (with comes pre-installed with Docker Compose) run `docker-compose up -d`. The `up` command will start up the Docker containers and the `-d` detaches the process from the current command line interface. Docker will have to download some files the first time you run this command so you'll have to wait until that is done before proceeding to the next step.

7. Now you can send HTTP requests to our API. You can do this a number of different ways; I recommend using Postman for the ease in creating and saving requests, but you can also use the command line utility `curl` if you don't want to install any additional software. An example of a curl GET request: `curl --request GET 'localhost:3000/gas' --header 'Content-Type: application/json'`

8. Finally, to shut down the Docker containers, make sure to run `docker-compose down`.

# Tradeoffs
## REST vs Websocket
A Websocket offers full-duplex communication, which is great for real-time applications, like chat apps, but in the context of our API may be excessive, considering clients will only require gas information at most about every 15 seconds (the average Ethereum block time). This means we can save resources during idle time. Additionally, Websocket protocol is stateful while REST protocol is stateless. This means that, with REST, the client doesn't need to know about the server and the server doesn't need to know about the client. This is ideal for our API considering gas information does not change depending on the client or server state.

## Node.js vs Other Backend Languages
For this project I considered using Go, Python, and Node with Typescript. I chose Node because it operates on a single-thread event loop using non-blocking I/O calls allowing it to support thousands of concurrent connections without having to maintain multiple threads. I believe this makes Node excellent for developing REST APIs as it allows large numbers of users to make requests without having to expend the resources necessary to maintain concurrent threads for each one. This allows our API to scale efficiently, in contrast to Go, which *is* fast but its concurrency is better suited for applications which utilize networking more heavily. I didn't choose Python because, although it is very versatile and readable, it is not as popular of a language for writing web servers so there is less documentation and support.

## MongoDB vs Other DBs
The first decision to make here is to choose between an SQL or a noSQL database. I chose to go with a noSQL DB because my use case aligns more with the focus of noSQL: easy scaling, rapid development, flexible data models allowing for frequent application changes, and simplifying development. Having picked noSQL, now I had to decide on which specific implementation to choose. I decided to go with MongoDB, a document-oriented DB, because it has a lot of detailed documentation and a high level of adoption which makes development and debugging much easier.

## Etherscan vs EthGasStation
Choosing between the specific Ethereum gas API to fetch my data from was not as technical of a decision. I chose Etherscan because its API response object was much smaller and simpler, so it would use less bandwidth and storage space. The return object naming conventions for Etherscan's API were also more straightforward, as EthGasStation uses terms which could lead to confusion or programming errors if one isn't careful.

## Remaining To-dos
I would like to refactor my API data retrieval function to be event-based, every time a new Ethereum block is mined, instead of on a timer because the inconsistency of Ethereum block times can occasionally cause the function to 'miss' a block due to timing mismatch and network latency. I would also like to implement rate limits for requests to protect against Denial-of-Service attacks.

## What I would Do Differently if I Rewrote this Project from Scratch
If I rewrote this project I would start off by designing the API using Swagger's developer tools which can later be used to easily produce the API documentation. I would also choose the EthGasStation API instead of Etherscan's because it contains much more information which can be stored in the DB and later used to extend the API's functionality. I  might also implement it in Golang to get some experience with the language, given its rising popularity and particular use cases make it an advantageous language to know.
