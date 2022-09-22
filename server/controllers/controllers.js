const tickers = require('./tickers.js')

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