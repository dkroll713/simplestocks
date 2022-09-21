// import { timeParse } from "d3-time-format";
// import { tsv } from "d3-request";
// import { scaleTime } from "d3-scale";
// import { format } from "d3-format";

module.exports.createChartObject = (data) => {


  // console.log(data);

  // for area chart - stockcharts.js
  let arr = [];
  for (let x = 0; x < data.length; x++) {
    let obj = {};
    let inst = data[x];
    console.log(inst);
    obj['date'] = inst.date;
    obj['open'] = inst.open;
    obj['high'] = inst.high;
    obj['low'] = inst.low;
    obj['close'] = inst.close;
    obj['volume'] = inst.volume;
    obj['change'] = inst.change;
    obj['changePercent'] = inst.changePercent;
    arr.push(obj);
  }
  // console.log(arr)

  // // chartjs scatter chart
  // let obj = {};
  // obj.labels = [];
  // obj.prices = [];
  // for (let x = data.length - 1; x >= 0; x--) {
  //   let day = data[x];
  //   let openObj = {};
  //   let closeObj = {};
  //   openObj.y = day.open;
  //   openObj.x = x;
  //   openObj.name = "open";
  //   closeObj.y = day.close;
  //   closeObj.x = x;
  //   closeObj.name = "close";
  //   // priceObj.close = day.close;
  //   obj.labels.push(day.label)
  //   obj.prices.push(openObj)
  //   obj.prices.push(closeObj)
  // }

  return arr;
}