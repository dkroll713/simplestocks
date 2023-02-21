const cf = require('../../config.js')

const {Pool} = require('pg');
const pool = new Pool({
  user: cf.user,
  password: cf.password,
  host: cf.host,
  port: cf.db_port,
  database: cf.db
})

module.exports.getUser = (req, res) => {
  let user = req.body;
  // console.log(user.user);
  let query = `select * from users u where u.nickname='${user.user.nickname}'`
  pool.query(query).then((results) => {
    if (results.rows.length === 0) {
      query = `insert into "users" (nickname) values('${user.user.nickname}') returning user_id`
      pool.query(query).then((results) => {
        res.send(results.rows[0])
      })
      // res.send(`need to create user entry for ${user.nickname}`)
    } else {
      // console.log(results.rows[0]);
      res.send(results.rows[0]);
    }
  })
}