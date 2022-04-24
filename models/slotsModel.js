var pool = require('./connection.js')

module.exports.getAllSlots = async function () {
    try {
      let sql = `Select * from slots`;
      let result = await pool.query(sql);
      let cards = result.rows;
      return { status: 200, result: cards };
    } catch (err) {
      console.log(err);
      return { status: 500, result: err };
    }
  }