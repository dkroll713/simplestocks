const tickers = require('./tickers.js')

const statements = require('./statements.js')

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

module.exports.bs = statements.getBalanceSheetDescrpitons;
module.exports.is = statements.getIncomeStatementDescriptions;
module.exports.cf = statements.getCashFlowDescriptions;
module.exports.mt = statements.getMetricDescriptions;