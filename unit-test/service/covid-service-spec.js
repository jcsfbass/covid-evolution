const mock = require('mock-require');

const covidClient = jasmine.createSpy('covidClient').and.returnValue({
    async json() {
        return {
            'Countries': [
                {
                    "Country": "Brazil",
                    "Slug": "brazil",
                    "TotalConfirmed": 3417,
                    "TotalDeaths": 92,
                    "TotalRecovered": 6
                },
                {
                    "Country": "Korea, South",
                    "Slug": "korea-south",
                    "TotalConfirmed": 9332,
                    "TotalDeaths": 139,
                    "TotalRecovered": 4528
                },
                {
                    "Country": "The Bahamas",
                    "Slug": "the-bahamas",
                    "TotalConfirmed": 0,
                    "TotalDeaths": 0,
                    "TotalRecovered": 0
                },
                {
                    "Country": "Republic of Korea",
                    "Slug": "korea-south",
                    "TotalConfirmed": 9332,
                    "TotalDeaths": 139,
                    "TotalRecovered": 4528
                }
            ]
        }
    }
});
mock('../../app/client/covid-client', covidClient);

describe('covidService', () => {
    const covidService = require('../../app/service/covid-service');

    describe('.summary', () => {
        let countriesSummary;

        beforeAll(async () => {
            countriesSummary = await covidService.summary();
        });

        it('should get summary from client', () => expect(covidClient).toHaveBeenCalledWith('summary'));

        it('should get request just one time', () => expect(covidClient).toHaveBeenCalledTimes(1));

        it('should map to a new contract', () => countriesSummary.forEach(country => {
            expect(country.name).toBeDefined();
            expect(country.totalConfirmed).toBeDefined();
            expect(country.totalDeaths).toBeDefined();
            expect(country.totalRecovered).toBeDefined();
        }));

        it('should remove countries with duplicated slug', () => {
            expect(countriesSummary.filter(country => country.name.includes('Korea')).length).toBe(1);
        });

        it('should remove countries with total confirmed as zero', () => {
            expect(countriesSummary.some(country => country.totalConfirmed === 0)).toBeFalsy();
        });
    });
});