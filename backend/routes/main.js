// a basic Express router

const express = require('express');
const router = express.Router();
const controller = require('#src/controllers/main');
const apiCache = require('apicache-plus');
router.use(apiCache('5 minutes'))


// router.use(controller.devModeStaticApi);

router.get('/', controller.index);

router.get('/topGainers24Hours', controller.topGainers24Hours);

router.get('/topCoins', controller.topCoins);

router.get('/getCandles', controller.getCandles);

router.get('/getExchangeInfo', controller.getExchangeInfo);

router.get('/getCryptoNews', controller.getCryptoNews);

router.get('/getCryptoNewsDescription', controller.getCryptoNewsDescription);

module.exports = router;