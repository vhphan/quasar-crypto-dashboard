// a basic Express router

const express = require('express');
const router = express.Router();
const controller = require('#src/controllers/main');
const apiCache = require('apicache-plus');
router.use(apiCache('5 minutes'))

const binanceApiKey = process.env.BINANCE_API_KEY;
const binanceApiSecret = process.env.BINANCE_API_SECRET;

router.use(controller.devModeStaticApi);

router.get('/', controller.index);

router.get('/topGainers24Hours', controller.topGainers24Hours);

router.get('/topCoins', controller.topCoins);

router.get('/getCandles', controller.getCandles);

router.get('/getExchangeInfo', controller.getExchangeInfo);

module.exports = router;