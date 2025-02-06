require('dotenv').config()
var createError = require('http-errors');
var express = require('express');

const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const { Client } = require('@elastic/elasticsearch');

const isLocalClient = false;
const node = isLocalClient ? process.env.ELASTICSEARCH_DOCKER_URL: process.env.ELASTICSEARCH_URL;
const apiKey = isLocalClient ? process.env.ELASTIC_DOCKER_API_KEY: process.env.ELASTIC_API_KEY;

const client = new Client({
    node: node,
    auth: {
        apiKey: apiKey
    }
});

var app = express();
const corsOptions = {
    origin: [
        'https://gray-smoke-064726800.4.azurestaticapps.net',
        'http://localhost:3001',
        'http://localhost:5000'
      ],
        optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/test', async (req, res) => {
  const resp = await client.info();
  res.send('Express API is running');
});

app.get('/faqs', async (req, res) => {
  const search = req.query.search;
  let query = {};
  let results = [];
  if (search) {
      const searchResult = await client.search({
          index: 'faqs',
          q: search
      });
      
      results = searchResult.hits.hits.map(hit => {
          return hit;
      });
  }else{
      const allFaqs = await client.search({
          index: 'faqs',
          body: {
              query: {
                  match_all: {}
              }
          }
      });
      results = allFaqs.hits.hits.map(hit => {
          return hit;
      });
  }

  res.json(results);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
