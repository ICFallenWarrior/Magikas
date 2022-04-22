const res = require('express/lib/response');
var pool = require('./connection.js')

module.exports.getSlotByNameOrTopCard = async function (parameters) {
  try {
    if (!parameters.name && !parameters.topcard) {
      return { status: 400, result: { msg: "No filters defined (name or topcard)" } };
    }
    let nparam = 1;
    let values = [];
    let sql = `Select slot_id,slot_name, crd_name as slot_topcard 
                from slots, card where slot_topcard_id = crd_id`

    if (parameters.name) {
      sql += ` and slot_name ILIKE $${nparam}`;
      values.push("%"+parameters.name+"%");
      nparam++;
    }
    if (parameters.topcard) {
      sql += ` and slot_name ILIKE $${nparam}`;
      sql += ` slot_topcard LIKE $${nparam}`;
      values.push(parameters.topcard);
      nparam++;
    }
    let result = await pool.query(sql, values);
    let rooms = result.rows;
    return { status: 200, result: rooms };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}  


module.exports.getAllSlots = async function() {
  try {
    let sql = `Select slot_id,slot_name, crd_name as slot_topcard 
    from slots, card where slot_topcard_id = crd_id`;
    let result = await pool.query(sql);
    let rooms = result.rows;
    return { status: 200, result: rooms};
  } catch (err) {
    console.log(err);
    return { status: 500, result: err};
  }
}

module.exports.getSlotById = async function (id) {
  try {
    let sql = `Select slot_id,slot_name, crd_name as slot_topcard 
    from slots, card where slot_topcard_id = crd_id and slot_id = $1`;
    let result = await pool.query(sql, [id]);
    if (result.rows.length > 0) {
      let room = result.rows[0];
      return { status: 200, result: room };
    } else {
      return { status: 404, result: { msg: "No slot with that id" } };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.play = async function (id, value) {
  try {
    if (!parseInt(id)) {
      return { status: 400, result: { msg: "Slot id must be a number" } };      
    }
    let sql = `select * from slot, card, cardwcard
                where slots.slot_id = $1 and
                slots.slot_topcard_id = cardwcard.cwc_clooses_id and
                card.crd_id = cardwcard.cwc_cwins_id and
                card.crd_name ILIKE $2;`
    let result = await pool.query(sql, [id,value]);
    if (result.rows.length == 0) {
      let sqlr = `select * from slot, card where slots.slot_id = $1 
                  and slots.slot_topcard_id = card.crd_id`;
      let resultr = await pool.query(sqlr, [id]);
      let room = resultr.rows[0];
      if (!room) {
        return { status: 404, result: { msg: "No slot with that id" } };
      } else {
        return {
          status: 200,
          result: {
            victory: false,
            msg: "You Lost! That card does not beat the top card.",
            current_topcard: room.crd_name         
          }
        };
      }
    }
    let card_id =  result.rows[0].crd_id;
    let card_name = result.rows[0].crd_name;
    let sql2 = "UPDATE slots SET roo_topcard_id = $1 WHERE slot_id = $2";
    let result2 = await pool.query(sql2, [  card_id, id  ]);
    if (result2.rowCount == 0) {
      return { status: 500, 
               result: { msg: "Not able to update. Many possible reasons (ex: slot was deleted during play)" } };
    }
    return {
      status: 200,
      result: {
        victory: true,
        msg: "You Won!",
        current_topcard: card_name
      }
    };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}

module.exports.FindSlot = async function (id){
  let sql = `select slots.slot_id from slots, player where 
              slots.slot_is_full = FALSE and 
              slots.slot_id not in (select player_to_room.roo_id from player_to_room where player_to_room.ply_id = $1)
              group by room.roo_id`;

  try{

    let result = await pool.query(sql, [id]);

    if (result.rows.length > 0) {
      const roomId = result.rows[0].roo_id;
      
      sql = `insert into player_to_room (ply_id, roo_id) VALUES($1,$2);`;
      result = await pool.query(sql, [id, roomId]);

      sql = `select count(*) as playernum from player_to_room where roo_id = $1`;
      result = await pool.query(sql, [roomId]);

      if(result.rows[0].playernum == 2) {
        
        sql = `UPDATE room SET room_is_full = true where roo_id = $1`;
        result = await pool.query(sql, [roomId]);
      }

      return { status: 200, 
        result: { result: roomId } };
      } 
      
      else{
        return { status: 404, 
          result: { result: -1 } };
        }
      
      
  }catch(err){
    console.log(err);
    return { status: 500, result: err };
  }
}