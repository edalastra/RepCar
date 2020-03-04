const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
hosts = require('./hosts');
const {ORIGIN_HOST}  = hosts;



app.use(cors({origin: ORIGIN_HOST,optionsSuccessStatus: 200}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  next();
});

module.exports = app;


