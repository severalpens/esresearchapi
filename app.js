require('dotenv').config()
var createError = require('http-errors');
var express = require('express');

const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api/index');
var faqsRouter = require('./routes/api/faqs');
var embedRouter = require('./routes/api/embed');

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
app.use('/api', apiRouter);
app.use('/api/faqs', faqsRouter);
app.use('/api/embed', embedRouter);

app.get('/test', async (req, res) => {
  const resp = await client.info();
  res.send('Express API is running');
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
