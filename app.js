require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/playersRoutes');
var roomsRouter = require('./routes/roomsRoutes');
var slotsRouter = require('./routes/slotsRoutes');

var app = express();
var cardsRouter = require('./routes/cardsRoutes');
var cookieParser = require('cookie-parser');


            
app.use(cookieParser('VERY SECRET SECRET')); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/cards',cardsRouter);
app.use('/api/slots',slotsRouter);

module.exports = app;
