module.exports.createChartObject = (data) => {
  let obj = {};
  obj.labels = [];
  obj.prices = [];
  console.log(data);

  for (let x = data.length - 1; x >= 0; x--) {
    let day = data[x];
    let openObj = {};
    let closeObj = {};
    openObj.y = day.open;
    openObj.x = x;
    openObj.name = "open";
    closeObj.y = day.close;
    closeObj.x = x;
    closeObj.name = "close";
    // priceObj.close = day.close;
    obj.labels.push(day.label)
    obj.prices.push(openObj)
    obj.prices.push(closeObj)
  }

  return obj;
}