const express = require('express');
const cors = require('cors');
const {logRequest} = require('#src/middlewares/logger');

const app = express();

// read .env file
require('dotenv').config();

global.__basedir = __dirname;
const baseUrl = '/api';
console.log(global.__basedir);
app.use(cors());

app.use(`${baseUrl}/v1`, logRequest, require('#src/routes/main'));

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

const port = process.env.PORT || 3003;
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
    console.log(process.env.NODE_ENV);
    // check the operating system
    console.log(process.platform);
    // set node env i
    console.log(__dirname);
});
