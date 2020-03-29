# COVID Evolution

I created this app only for study purposes _(data comes from [COVID-19 Api](https://covid19api.com/))_

## Main tools
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Vue.js](https://vuejs.org/)
- [Karma](https://karma-runner.github.io/latest/index.html)
- [Jasmine](https://jasmine.github.io/)

## Requirements

### NodeJS and NPM

- Node: 13.11
- NPM: 6.14

## Development

### Install dependencies

```
npm i
```

##### Optional: install [PM2](https://pm2.keymetrics.io/)
```
npm i pm2@4.2.3 -g
```

### Run the app

##### Without PM2

- Run `npm start`
- Access `localhost:3000` in the browser

##### With PM2

- Run `npm run pm2-start` to start
- Access `localhost:3000` in the browser
- Run `npm run pm2-stop` to stop/delete

### Run the tests
##### All tests
```
npm test
```

##### Only client side unit tests (_you will need to have Chrome, Firefox and Safari to run these tests_)
```
npm run client-side-test
```


##### Only unit tests
```
npm run unit-test
```


##### Only API tests
```
npm run isolated-test
```
