const got = require('got');

const pkg = require('../../package');

const covidClient = got.extend({
    prefixUrl: 'https://api.covid19api.com',
    headers: {'user-agent': `${pkg.name}/${pkg.version}`}
});

module.exports = covidClient;