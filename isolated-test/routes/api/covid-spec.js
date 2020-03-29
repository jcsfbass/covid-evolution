const got = require('got');
const nock = require('nock');
const http = require('http');

const app = require('../../../app/app');

describe('GET /summary', () => {
    let server;

    beforeAll(() => {
        server = http.createServer(app);
        server.listen(3001);
    });

    describe('when the request is made', () => {
        let response;

        beforeAll(async () => {
            nock('https://api.covid19api.com')
                .get('/summary')
                .reply(200, {
                    "Countries": [
                        {
                            "Country": "Brazil",
                            "Slug": "brazil",
                            "NewConfirmed": 487,
                            "TotalConfirmed": 3904,
                            "NewDeaths": 19,
                            "TotalDeaths": 111,
                            "NewRecovered": 0,
                            "TotalRecovered": 6
                        },
                        {
                            "Country": "Germany",
                            "Slug": "germany",
                            "NewConfirmed": 6824,
                            "TotalConfirmed": 57695,
                            "NewDeaths": 91,
                            "TotalDeaths": 433,
                            "NewRecovered": 1823,
                            "TotalRecovered": 8481
                        }
                    ],
                    "Date": "2020-03-29T02:07:26.174102617Z"
                });

            response = await got('http://localhost:3001/api/covid/summary', {responseType: 'json'});
        });

        it('should retrieve 200', () => expect(response.statusCode).toBe(200));

        it('should retrieve only necessary data', () => expect(response.body).toEqual([
            {
                name: 'Brazil',
                totalConfirmed: 3904,
                totalDeaths: 111,
                totalRecovered: 6
            },
            {
                name: 'Germany',
                totalConfirmed: 57695,
                totalDeaths: 433,
                totalRecovered: 8481
            }]));
    });

    afterAll(() => server.close());
});