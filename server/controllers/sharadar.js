
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

module.exports.createInfoObject = (data) => {
  let obj = {};

  let columns = data.datatable.columns;
  data = data.datatable.data[0];
  // console.log(columns);
  // console.log(data)

  obj[columns[1].name] = data[1];
  obj[columns[2].name] = data[2];
  obj[columns[3].name] = data[3];
  obj[columns[4].name] = data[4];
  obj[columns[5].name] = data[5];
  obj[columns[6].name] = data[6];
  obj[columns[9].name] = data[9];
  obj[columns[10].name] = data[10];
  obj[columns[11].name] = data[11];
  obj[columns[12].name] = data[12];
  obj[columns[13].name] = data[13];
  obj[columns[14].name] = data[14];
  obj[columns[15].name] = data[15];
  obj[columns[16].name] = data[16];

  console.log(obj)
  return obj;
}