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

##### Optional: install PM2
```
npm i pm2@4.2.3 -g
```

### Run the app

##### Without PM2

- Run `npm start`
- Access `localhost:3000` in the browser

##### With PM2

- Run `pm2 start process.yml`
- Access `localhost:3000` in the browser