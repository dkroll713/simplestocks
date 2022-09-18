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
app.use(cors())

app.options('*', cors());

app.use(express.static(path.join(__dirname,"../public",)));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname,"../public", "bundle.js"))
// })

app.get('/tickers', controllers.getTickers)

app.post('/tickers*', controllers.addTicker);

app.listen(port, () => {
  console.log(`saved choice server listening on port ${port}`)
})