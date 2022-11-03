const axios = require('axios');

const cf = require('../../config.js');

const {Pool} = require('pg');
const pool = new Pool({
  user: cf.user,
  password: cf.password,
  host: cf.host,
  port: cf.db_port,
  database: cf.db
})

module.exports.getCIK = (req, res) => {
  let ticker = req.url.split('/')[2].toLowerCase();
  let query = `
  select cik
  from ciks
  where ticker=$1
  `
  let values = [ticker]
  pool.query(query, values)
  .then(result => {
    console.log(result.rows);
    let cik = result.rows[0].cik;
    res.send(result.rows[0])
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

module.exports.getFloat = (req, res) => {
  let ticker = req.url.split('/')[2].toLowerCase();
  let query = `
  select cik
  from ciks
  where ticker=$1
  `
  let values = [ticker]
  pool.query(query, values)
  .then(result => {
    console.log(result.rows);
    let cik = String(result.rows[0].cik).split('')
    console.log(cik, cik.length)
    while (cik.length < 10) {
      cik.unshift('0')
    }
    cik = cik.join('');
    console.log(cik, cik.length)
    axios.get(`https://data.sec.gov/api/xbrl/companyconcept/CIK${cik}/dei/EntityPublicFloat.json`)
    .then((response) => {
      let arr = response.data.units.USD;
      console.log(arr[arr.length-1]);
      arr[arr.length-1].description = response.data.description
      res.send(arr[arr.length-1]);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

module.exports.insiders = (req, res) => {
  let ticker = req.url.split('/')[2].toLowerCase();
  let url = `http://openinsider.com/search?q=${ticker}`

  axios.get(url)
  .then(response => {
    console.log(response.data)
    let data = response.data;
    data = data.split('tbody')
    data.map(chunk => {
      console.log(chunk);
    })
    res.send(data[3]);
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(err);
  })
}