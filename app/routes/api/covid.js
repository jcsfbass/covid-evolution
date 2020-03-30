const router = require('express').Router();

const covidService = require('../../service/covid-service');

router
    .get('/summary', async (req, res, next) => {
        try {
            const countriesSummary = await covidService.summary();

            res.json(countriesSummary);
        } catch (error) {
            next({message: 'It was not possible to access COVID-19 API, try again later', cause: error}, req, res);
        }
    });

module.exports = router;
