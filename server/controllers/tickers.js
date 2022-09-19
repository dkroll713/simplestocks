const cf = require('../../config.js');

const {Pool} = require('pg');
const pool = new Pool({
  user: cf.user,
  password: cf.password,
  host: cf.host,
  port: cf.db_port,
  database: cf.db
})


// get tickers from db
module.exports.getTickers = (req, res) => {
  if (req.url.includes('tickers')) {
    pool.query(
      `select * from chosen c order by c.ticker asc`
    )
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows)
    })
    .catch((err) => {
      res.send('error fetching data')
    })
  }
}

// submit ticker to db
module.exports.addTicker = (req, res) => {
  if (req.url.includes('tickers')) {
    console.log(req.url);
    let ticker = req.url.split('/')[2]
    console.log(ticker.toUpperCase());
    let query = `insert into "chosen"(date,ticker) values($1, $2)`
    let values = ['current_timestamp', `${ticker}`]
    pool.query(
      query, values
    ).then(() => {
        res.send(`adding ${ticker} to db`)
    })
    .catch((err) => {
      console.log(`error adding ${ticker} to db; error: ${err}`)
      res.status(400).send(`error adding ${ticker} to db; error: ${err}`)
    })
  }
}