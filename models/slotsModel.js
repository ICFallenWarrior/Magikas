const res = require('express/lib/response');
var pool = require('./connection.js')

module.exports.getSlotByTypeOrTopCard = async function (parameters) {
  try {
    if (!parameters.type && !parameters.topcard) {
      return { status: 400, result: { msg: "No filters defined (type or topcard)" } };
    }
    let nparam = 1;
    let values = [];
    let sql = `Select slot_id,slot_type, crd_name as slot_topcard 
                from slots, card where slot_topcard_id = crd_id`

    if (parameters.type) {
      sql += ` and slot_type ILIKE $${nparam}`;
      values.push("%"+parameters.type+"%");
      nparam++;
    }
    if (parameters.topcard) {
      sql += ` and slot_type ILIKE $${nparam}`;
      sql += ` slot_topcard LIKE $${nparam}`;
      values.push(parameters.topcard);
      nparam++;
    }
    let result = await pool.query(sql, values);
    let slots = result.rows;
    return { status: 200, result: slots };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
}  


module.exports.getAllSlots = async function() {
  try {
    let sql = `Select slot_id,slot_type, crd_name as slot_topcard 
    from slots, card where slot_topcard_id = crd_id`;
    let result = await pool.query(sql);
    let slots = result.rows;
    return { status: 200, result: slots};
  } catch (err) {
    console.log(err);
    return { status: 500, result: err};
  }
}

module.exports.getSlotById = async function (id) {
  try {
    let sql = `Select slot_id,slot_type, crd_name as slot_topcard 
    from slots, card where slot_topcard_id = crd_id and slot_id = $1`;
    let result = await pool.query(sql, [id]);
    if (result.rows.length > 0) {
      let slot = result.rows[0];
      return { status: 200, result: slot };
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
      let slot = resultr.rows[0];
      if (!slot) {
        return { status: 404, result: { msg: "No slot with that id" } };
      } else {
        return {
          status: 200,
          result: {
            victory: false,
            msg: "You Lost! That card does not beat the top card.",
            current_topcard: slot.crd_name         
          }
        };
      }
    }
    let card_id =  result.rows[0].crd_id;
    let card_name = result.rows[0].crd_name;
    let sql2 = "UPDATE slots SET slot_topcard_id = $1 WHERE slot_id = $2";
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
  let sql = `select slots.slot_id from slots, card where 
              slots.slot_is_full = FALSE and 
              slots.slot_id not in (select card_to_slot.slot_id from card_to_slot where card_to_slot.slot_id = $1)
              group by slots.slot_id`;

  try{

    let result = await pool.query(sql, [id]);

    if (result.rows.length > 0) {
      const slotId = result.rows[0].slot_id;
      
      sql = `insert into card_to_slot (ply_id, slot_id) VALUES($1,$2);`;
      result = await pool.query(sql, [id, slotId]);

      sql = `select count(*) as slotnum from card_to_slot where slot_id = $1`;
      result = await pool.query(sql, [slotId]);

      if(result.rows[0].cardnum == 1) {
        
        sql = `UPDATE slots SET slot_is_full = true where slot_id = $1`;
        result = await pool.query(sql, [slotId]);
      }

      return { status: 200, 
        result: { result: slotId } };
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