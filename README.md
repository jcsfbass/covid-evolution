# COVID Evolution

I created this app only for study purposes

## Requirements

### NodeJS e NPM

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

```
npm test
```

##### Only client side unit tests
```
npm run client-side-test
```
