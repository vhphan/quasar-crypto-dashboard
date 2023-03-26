
const needle = require('needle');

const index = (req, res) => {
    res.json({
        message: 'Welcome to the v1 API',
    });
};
const topGainers24Hours = (req, res) => {
    // read json file as object
    const jsonFile = global.__basedir + '/data/24hPriceChange.json';
    console.log(jsonFile);
    const fs = require('fs');
    const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    const sortedData = data.sort((a, b) => {
            return b["priceChangePercent"] - a["priceChangePercent"];
        }
    );
    res.json({
        data: sortedData.slice(0, 50),
        success: true,
    })
};

//
// export function binance() {
//     const binanceUrl = 'https://api.binance.com/api/v3/ticker/price';
//     return async (req, res, next) => {
//         try {
//             const params = new URLSearchParams({
//
//             });
//
//             const apiRes = await needle('get', `${binanceUrl}?${params}`);
//             const data = apiRes.body;
//
//             res.status(200).send(data)
//         } catch (error) {
//             next(error)
//         }
//     };
// }

module.exports = {
    index,
    topGainers24Hours,
};