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

app.use(bodyParser())

app.options('*', cors());

app.use(express.static(path.join(__dirname, "../public",)));

app.post('/api/getUser', controllers.getUser);

app.get('/api/validTickers', controllers.getValidTickers);

app.get('/api/news*', controllers.getNews);

app.post('/api/tickers', controllers.getTickers)

app.post('/api/tickers/*', controllers.addTicker);

app.get('/api/ticker/*', controllers.getBasicInfo);

app.get('/api/price/*', controllers.price);

app.get('/api/chart/*', controllers.chart);

app.get('/api/info/*', controllers.tickerInfo)

app.get('/api/quote/*', controllers.quote)

app.get('/api/iexStats/*', controllers.iexStats)

app.get(`/api/financials/*`, controllers.financials)

app.get('/api/finstats/*', controllers.finstats)

app.get('/api/bsDesc', controllers.bs);

app.get('/api/balanceSheetSmall/*', controllers.bsSmall)

app.get('/api/balanceSheetBig/*', controllers.bsBig);

app.get('/api/isDesc', controllers.is);

app.get('/api/cfDesc', controllers.cf);

app.get('/api/mtDesc', controllers.mt)

// sec-related endpoints
app.get('/api/cik/*', controllers.CIK)

app.get('/api/float/*', controllers.float);

app.get('/api/insiders/*', controllers.insiders)

app.listen(port, () => {
  console.log(`saved choice server listening on port ${port}`)
})