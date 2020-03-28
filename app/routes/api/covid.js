const router = require('express').Router();

const covidService = require('../../service/covid-service');

router
    .get('/summary', async (req, res) => {
        const countriesSummary = await covidService.summary();

        res.json(countriesSummary);
    });

module.exports = router;
