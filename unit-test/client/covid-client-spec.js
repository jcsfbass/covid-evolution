const mock = require('mock-require');

const covidClientSpy = jasmine.createSpy('covidClient');
const extendSpy = jasmine.createSpy('extend').and.returnValue(covidClientSpy);
mock('got', {
    extend: extendSpy
});

mock('../../package', {
    name: 'sample-app-name',
    version: '0.0.0'
});

describe('covid-client', () => {
    const covidClient = require('../../app/client/covid-client');

    it('should set the config', () => expect(extendSpy).toHaveBeenCalledWith({
        prefixUrl: 'https://api.covid19api.com',
        headers: {'user-agent': 'sample-app-name/0.0.0'}
    }));

    it('should retrieve the client', () => expect(covidClient).toBe(covidClientSpy));
});