const pool = require("../db/db");
let middlewareObject = {};

middlewareObject.instock = async (req, res, next) => {
    const {id} = req.body
    try {
      const stockdata = await pool.query(`SELECT instock FROM books WHERE id=$1`,[id])
      if(stockdata.rows[0].instock > 0){
        next()
      }else{
        res.json({message:"Out of Stock"})
      }
    } catch (error) {
      console.log(error)
    }
  };

  middlewareObject.OrderSucess = async(quantity,req,res,next)=>{
    console.log( quantity )
    return
  }
  
  module.exports = middlewareObject;