const axios = require('axios');

const {createSharadarObject, createInfoObject} = require('./sharadar.js')
const {createChartObject} = require('./iex.js');

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

// gets price
module.exports.price = (req, res) => {
  let ticker = req.url.split('/')[2];
  let url = `https://cloud.iexapis.com/stable/stock/${ticker}/price?token=${cf.iex}`
  axios.get(url)
  .then((result) => {
    console.log(result.data);
    res.send(`${result.data}`);
  })
  .catch(err => {
    res.send(err);
  })
}

// retrieves single ticker from db
module.exports.getBasicInfo = (req, res) => {
  let ticker = req.url.split('/')[2]
  console.log(ticker.toUpperCase());
  let query = `
    select c.ticker, i.name, i.sector, i.industry, i.scalemarketcap, i.scalerevenue
    from chosen c, information i
    where c.ticker = $1 and c.ticker = i.ticker
    order by c.ticker asc;
  `
  let values = [`${ticker}`]

  pool.query(query, values)
  .then(result => {
    res.send(result.rows[0]);
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

// submit ticker to db - multi step process
module.exports.addTicker = (req, res) => {
  if (req.url.includes('tickers')) {
    console.log(req.url);
    let ticker = req.url.split('/')[2]
    console.log(ticker.toUpperCase());
    let timestamp = Date.now()
    console.log(timestamp)
    let query = `insert into "chosen"(date,ticker) values($1, $2)`
    let values = [timestamp, `${ticker}`]
    // submit ticker to db
    pool.query(
      query, values
    ).then(() => {
      let url = `https://data.nasdaq.com/api/v3/datatables/SHARADAR/SF1?calendardate=2021-12-31&dimension=MRY&ticker=${ticker}&api_key=${cf.sharadar}`
      axios.get(url)
      .then(result => {
        let data = createSharadarObject(result.data.datatable);
        let query = `
          insert into "financials"(ticker, date, accoci, assets, assetsavg, assetsc, assetsnc,
            assetturnover, bvps, capex, cashneq, cashnequsd, cor, consolinc, currentratio,
            de, debt, debtc, debtnc, debtusd, deferredrev, depamor, deposits, divyield, dps,
            ebit, ebitda, ebitdamargin, ebitdausd, ebitusd, ebt, eps, epsdil, epsusd, equity,
            equityavg, equityusd, ev, evebit, evebitda, fcf, fcfps, fxusd, gp, grossmargin, intangibles,
            intexp, invcap, invcapavg, inventory, investments, investmentsc, investmentsnc, liabilities,
            liabilitiesc, liabilitiesnc, marketcap, ncf, ncfbus, ncfcommon, ncfdebt, ncfdiv,
            ncff, ncfi, ncfinv, ncfo, ncfx, netinc, netinccmn, netinccmnusd, netincdis,
            netincnci, netmargin, opex, opinc, payables, payoutratio, pb, pe, pe1, ppnenet,
            prefdivis, price, ps, ps1, receivables, retearn, revenue, revenueusd, rnd, roa,
            roe, roic, ros, sbcomp, sgna, sharefactor, sharesbas, shareswa, shareswadil,
            sps, tangibles, taxassets, taxexp, taxliabilities, tbvps, workingcapital)
            values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
            $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32,
            $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48,
            $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64,
            $65, $66, $67, $68, $69, $70, $71, $72, $73, $74, $75, $76, $77, $78, $79, $80,
            $81, $82, $83, $84, $85, $86, $87, $88, $89, $90, $91, $92, $93, $94, $95, $96,
            $97, $98, $99, $100, $101, $102, $103, $104, $105, $106, $107)
        `
        let values = [];
        for (let key in data) {
          values.push(data[key]);
        }
        // then submit financials to db
        pool.query(query, values)
        .then(() => {
          res.send(data)
        })
        .catch(err => {
          console.log(err);
          res.status(400).send(data);
        })
      })
      .catch(err => {
        res.status(400).send(err);
      })
    })
    .catch((err) => {
      console.log(`error adding ${ticker} to db; error: ${err}`)
      res.status(400).send(`error adding ${ticker} to db; error: ${err}`)
    })
  }
}

module.exports.chart = (req, res) => {
  let ticker = req.url.split('/')[2].toUpperCase();
  console.log(ticker);
  // for chart.js - simple line
  const {Client} = require("iexjs");
    const client = new Client({api_token: cf.iex, version: "v1"});
    client.chart({symbol: ticker, range: "1m"}).then((response) => {
        let data = createChartObject(response)
        res.send(data);
});
}

module.exports.tickerInfo = (req, res) => {
  let ticker = req.url.split('/')[2].toUpperCase();
  url = `https://data.nasdaq.com/api/v3/datatables/SHARADAR/TICKERS.json?ticker=${ticker}&api_key=${cf.sharadar}`
  axios.get(url)
  .then((result) => {
    let data = createInfoObject(result.data)
    res.send(data);
  })
  .catch(err => {
    res.status(400).send(err)
  })
}

module.exports.iexStats = (req, res) => {
  // console.log(req.url.split('/'))
  let ticker = req.url.split('/')[2];
  if (req.url.split('/').length > 3) {
    let stat = req.url.split('/')[4]
    let url = `https://cloud.iexapis.com/stable/stock/${ticker}/stats/${stat}?token=${cf.iex}`
    axios.get(url)
    .then((result) => {
      // console.log(stat);
      res.send(String(result.data));
    })
    .catch(err => {
      res.status(500).send(err);
    })
  } else {
    let url = `https://cloud.iexapis.com/stable/stock/${ticker}/stats?token=${cf.iex}`
    axios.get(url)
    .then((result) => {
      // console.log(result.data);
      res.send(result.data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  }
}

module.exports.quote = (req, res) => {
  let ticker = req.url.split('/')[2];
  let url = `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${cf.iex}`
  axios.get(url)
    .then((result) => {
      // console.log(result.data);
      res.send(result.data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
}

module.exports.financials = (req, res) => {
  let ticker = req.url.split('/')[2].toUpperCase();
  console.log(`looking up financial statements for ${ticker}`)
  let query = `
    select * from financials f where f.ticker = $1
  `
  let values = [ticker]
  pool.query(query, values)
  .then(response => {
    res.send(response.rows[0])
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

module.exports.finstats = (req, res) => {
  let ticker = req.url.split('/')[2].toUpperCase();
  console.log(`looking up financial statements for ${ticker}`)
  let url = `https://data.nasdaq.com/api/v3/datatables/SHARADAR/SF1?calendardate=2021-12-31&dimension=MRY&ticker=${ticker}&api_key=${cf.sharadar}`
  axios.get(url)
  .then(result => {
    let data = createSharadarObject(result.data.datatable);
    let query = `
      insert into "financials"(ticker, date, accoci, assets, assetsavg, assetsc, assetsnc,
        assetturnover, bvps, capex, cashneq, cashnequsd, cor, consolinc, currentratio,
        de, debt, debtc, debtnc, debtusd, deferredrev, depamor, deposits, divyield, dps,
        ebit, ebitda, ebitdamargin, ebitdausd, ebitusd, ebt, eps, epsdil, epsusd, equity,
        equityavg, equityusd, ev, evebit, evebitda, fcf, fcfps, fxusd, gp, grossmargin, intangibles,
        intexp, invcap, invcapavg, inventory, investments, investmentsc, investmentsnc, liabilities,
        liabilitiesc, liabilitiesnc, marketcap, ncf, ncfbus, ncfcommon, ncfdebt, ncfdiv,
        ncff, ncfi, ncfinv, ncfo, ncfx, netinc, netinccmn, netinccmnusd, netincdis,
        netincnci, netmargin, opex, opinc, payables, payoutratio, pb, pe, pe1, ppnenet,
        prefdivis, price, ps, ps1, receivables, retearn, revenue, revenueusd, rnd, roa,
        roe, roic, ros, sbcomp, sgna, sharefactor, sharesbas, shareswa, shareswadil,
        sps, tangibles, taxassets, taxexp, taxliabilities, tbvps, workingcapital)
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
        $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32,
        $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48,
        $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64,
        $65, $66, $67, $68, $69, $70, $71, $72, $73, $74, $75, $76, $77, $78, $79, $80,
        $81, $82, $83, $84, $85, $86, $87, $88, $89, $90, $91, $92, $93, $94, $95, $96,
        $97, $98, $99, $100, $101, $102, $103, $104, $105, $106, $107)
    `
    let values = [];
    for (let key in data) {
      values.push(data[key]);
    }
    pool.query(query, values)
    .then(() => {
      res.send(data)
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(data);
    })
  })
  .catch(err => {
    res.status(400).send(err);
  })
}