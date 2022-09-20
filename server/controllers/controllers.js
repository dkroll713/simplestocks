const tickers = require('./tickers.js')

module.exports.getTickers = tickers.getTickers;
module.exports.getBasicInfo = tickers.getBasicInfo;
module.exports.addTicker = tickers.addTicker;
module.exports.chart = tickers.chart;
module.exports.tickerInfo = tickers.tickerInfo;
module.exports.finstats = tickers.finstats;