const tickers = require('./tickers.js')
const statements = require('./statements.js')
const sec = require('./sec.js');

module.exports.getTickers = tickers.getTickers;
module.exports.price = tickers.price;
module.exports.getBasicInfo = tickers.getBasicInfo;
module.exports.addTicker = tickers.addTicker;
module.exports.chart = tickers.chart;
module.exports.tickerInfo = tickers.tickerInfo;
module.exports.quote = tickers.quote;
module.exports.iexStats = tickers.iexStats;
module.exports.financials = tickers.financials;
module.exports.finstats = tickers.finstats;
module.exports.getValidTickers = tickers.getValidTickers;
module.exports.getNews = tickers.getNews;

module.exports.bs = statements.getBalanceSheetDescrpitons;
module.exports.bsSmall = statements.balanceSheetSmall;
module.exports.bsBig = statements.balanceSheetBig;
module.exports.is = statements.getIncomeStatementDescriptions;
module.exports.cf = statements.getCashFlowDescriptions;
module.exports.mt = statements.getMetricDescriptions;

module.exports.CIK = sec.getCIK;
module.exports.float = sec.getFloat;