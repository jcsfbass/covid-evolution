const router = require('express').Router();

const covidClient = require('../../config/covid-client');

router
    .get('/summary', async (req, res) => {
        const response = await covidClient('summary').json();

        res.json(response);
    });

module.exports = router;
