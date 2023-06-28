const asyncHandler=require('express-async-handler');
const express=require('express');
const app = express();
const connectDB = require('../config/dbConnection');
app.set('view engine', 'ejs');
const getMarkers=asyncHandler(async(req,res)=>{
    const sql = `SELECT acc_ID,accident_start_time,accident_end_time,accident_start_date,accident_end_date,accident_status,population_affected,accident_cost,accident_title,team_name,longtitude,latitude,address,full_name,accident_name FROM accidents JOIN team ON accidents.team_ID  = team.team_ID JOIN localisation ON accidents.local_ID= localisation.local_ID JOIN users ON accidents.id_user=users.id_user `;
    try{
    connectDB.query(sql, (err, results) => {
        if (err) throw err;
        const reports = results.length;
        const deconstructedData = results.map(obj => Object.values(obj));
        console.log(deconstructedData);
        res.render('ade_resp_map.ejs',  {deconstructedData} );
      });
  }
  catch(err){
    console.log(err);
  }
});
module.exports={getMarkers};