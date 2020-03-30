const covidClient = require('../client/covid-client');
const debug = require('debug')('covid-evolution:covid-client');

const covidService = {
    async summary() {
        debug('Making HTTP request to get COVID-19 summary');

        const response = await covidClient('summary').json();

        const countriesSummary = new Map(response['Countries']
            .map(country => [
                country['Slug'],
                {
                    name: country['Country'],
                    totalConfirmed: country['TotalConfirmed'],
                    totalDeaths: country['TotalDeaths'],
                    totalRecovered: country['TotalRecovered'],
                }
            ]));

        return [...countriesSummary.values()].filter(country => country.totalConfirmed > 0);
    }
};

module.exports = covidService;
