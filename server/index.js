const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cf = require('../config.js')
const port = cf.port;

const controllers = require('./controllers/controllers.js');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

app.options('*', cors());

app.use(express.static(path.join(__dirname,"../public",)));

app.get('/tickers', controllers.getTickers)

app.post('/tickers/*', controllers.addTicker);

app.get('/ticker/*', controllers.getBasicInfo);

app.get('/price/*', controllers.price);

app.get('/chart/*', controllers.chart);

app.get('/info/*', controllers.tickerInfo)

app.get('/quote/*', controllers.quote)

app.get('/iexStats/*', controllers.iexStats)

app.get(`/financials/*`, controllers.financials)

app.get('/finstats/*', controllers.finstats)

app.get('/bsDesc', controllers.bs);

app.get('/isDesc', controllers.is);

app.get('/cfDesc', controllers.cf);

app.get('/mtDesc', controllers.mt)

app.listen(port, () => {
  console.log(`saved choice server listening on port ${port}`)
})