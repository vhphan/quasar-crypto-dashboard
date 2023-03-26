// a basic Express router

const express = require('express');
const router = express.Router();
const apiCache = require('apicache-plus');
router.use(apiCache('5 minutes'))

// read binance api key
const binanceApiKey = process.env.BINANCE_API_KEY;
const binanceApiSecret = process.env.BINANCE_API_SECRET;

// import the controller
const controller = require('#src/controllers/main');

// define the routes
router.get('/', controller.index);

router.get('/topGainers24Hours', controller.topGainers24Hours);

// export the router
module.exports = router;