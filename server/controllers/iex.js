module.exports.createChartObject = (data) => {

  //apexcharts candlestick chart
  let arr = [];
  for (let x = 0; x < data.length; x++) {
    let obj = {};
    let arr2 = [];
    let instance = data[x];
    obj.x = instance.date;
    arr2.push(instance.open);
    arr2.push(instance.high);
    arr2.push(instance.low);
    arr2.push(instance.close);
    obj.y = arr2;
    arr.push(obj);
  }


  return arr;
}