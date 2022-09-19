
// takes results of sharadar data and transforms it into a formatted object for
// submission to the database
module.exports.createSharadarObject = (data) => {
  let obj = {};

  let columns = data.columns;
  data = data.data[0]
  obj[columns[0].name]  = data[0];
  obj[columns[2].name] = data[2];
  for (let x = 6; x < data.length; x++) {
    obj[columns[x].name] = data[x];
  }

  // console.log('obj', obj);
  return obj;
}