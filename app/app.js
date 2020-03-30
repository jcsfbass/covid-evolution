const path = require('path');
const express = require('express');

const debug = require('debug')('covid-evolution:app');

const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const covidApiRouter = require('./routes/api/covid');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/covid', covidApiRouter);

app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    debug({req: {headers: req.headers, path: req.path}, err});

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
