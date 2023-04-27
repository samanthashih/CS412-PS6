var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var axios = require('axios');
var redis = require('redis');
var util = require('util');
var config = require('./config');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var port = process.env.PORT || 3000;


// Redis Client
const redisClient = redis.createClient({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
});

const redisGetAsync = util.promisify(redisClient.get).bind(redisClient);
const redisSetAsync = util.promisify(redisClient.setex).bind(redisClient);

app.use(express.json());

// Routes
app.post('/weather', async (req, res) => {
  const { cityName } = req.body;

  try {
    // Check Redis cache
    const cachedData = await redisGetAsync(cityName);
    if (cachedData) {
      console.log('Got data from cache');
      return res.status(200).json({ source: 'cache', data: JSON.parse(cachedData) });
    }

    // Make API request
    const API_KEY = config.API_KEY;
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;

    const response = await axios.get(API_URL);

    // Cache API response for 60 seconds
    await redisSetAsync(cityName, 60, JSON.stringify(response.data));

    console.log('Got data from API');
    return res.status(200).json({ source: 'api', data: response.data });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error retrieving weather data');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
