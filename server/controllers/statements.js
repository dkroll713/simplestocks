const cf = require('../../config.js');

const {Pool} = require('pg');
const pool = new Pool({
  user: cf.user,
  password: cf.password,
  host: cf.host,
  port: cf.db_port,
  database: cf.db
})


// ~36 total fields
module.exports.getBalanceSheetDescrpitons = (req, res) => {
  let query = `
    select *
    from indicators i
    where i.description like '%' || '[Balance Sheet]' || '%'
    or i.description like '%' || '[Assets]' || '%'
    or i.description like '%' || '[Investments]' || '%'
    or i.description like '%' || '[Liabilities]' || '%'
    or i.description like '%' || '[Debt]' || '%'
    or i.description like '%' || '[Equity]' || '%'
  `
  pool.query(query)
  .then((result) => {
    res.send(result.rows);
  })
  .catch(err => {
    res.status(500).send(err);
  })
}

// ~25 total fields
module.exports.getIncomeStatementDescriptions = (req, res) => {
  let query = `
    select i.indicator, i.title, i.description
    from indicators i
    where i.description like '%' || '[Income Statement]' || '%';
  `
  pool.query(query)
  .then((result) => {
    res.send(result.rows);
  })
  .catch(err => {
    res.status(500).send(err);
  })
}

// 13 total fields
module.exports.getCashFlowDescriptions = (req, res) => {
  let query = `
    select i.indicator, i.title, i.description
    from indicators i
    where i.description like '%' || '[Cash Flow Statement]' || '%';
  `
  pool.query(query)
  .then((result) => {
    res.send(result.rows);
  })
  .catch(err => {
    res.status(500).send(err);
  })
}

// ~36 total fields
module.exports.getMetricDescriptions = (req, res) => {
  let query = `
    select i.indicator, i.title, i.description
    from indicators i
    where i.description like '%' || '[Metrics]' || '%';
  `
  pool.query(query)
  .then((result) => {
    res.send(result.rows);
  })
  .catch(err => {
    res.status(500).send(err);
  })
}

// select *
// from indicators i
// where i.description like '%' || '[Assets]' || '%';