const asyncHandler = require('express-async-handler');
const express = require('express');
const app = express();
const connectDB = require('../config/dbConnection');
app.set('view engine', 'ejs');

const GetReports=asyncHandler(async(req,res)=>{
    const sql = 'SELECT * from accidents where id_user=?';
    const sql3 = 'SELECT * from materials';
    const sql2 = 'SELECT team_name from team_members JOIN team ON team_members.team_ID=Team.team_ID where team.team_unit=(?)'
    const userId = req.params.iduser;
    const unite = req.params.unite;
    values=[userId]
    values2=[unite]
    try {
        const results = await new Promise((resolve, reject) => {
          connectDB.query(sql,values, (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
        
        const results2 = await new Promise((resolve, reject) => {
          connectDB.query(sql2,values2, (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
        const results3 = await new Promise((resolve, reject) => {
          connectDB.query(sql3, (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
          
          
        const DataShown = results.map(obj => Object.values(obj));
        
        const Team = results2.map(obj => Object.values(obj));
        const Materials = results3.map(obj => Object.values(obj));
        console.log(DataShown);
        res.render('ade_resp_reports.ejs', { DataShown,Team,Materials });
      } catch (err) {
        console.log(err);
      }
})
const GetReportName=asyncHandler(async (req,res)=>{
  const userId = req.params.iduser;
 
  const message = req.params.unite;
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const max = 1000;
  const randomInt = Math.floor(Math.random() * max);
  const TeamName=`#${(message[0]+message[1]+message[2]+randomInt+year+month+day).toUpperCase()}`
  res.status(200).json({message:TeamName})
  } )
  const CreateReport = asyncHandler(async (req, res) => {
    const userId = req.params.iduser;
    const {
      teamName,
      incidentAddress,
      incidentAffected,
      incidentLan,
      incidentLat,
      selectedMaterials,
      TotalPrice,
      incidentTitle,
      selectElement,
    } = req.body;
  
    const currentDate = new Date();
    const date = currentDate.toDateString();
    const time = currentDate.toTimeString();
  
    console.log('raouof');
  
    const sql_insert5 = await new Promise((resolve, reject) => {
      sql5 = `INSERT INTO localisation (longtitude, latitude, address) VALUES (${incidentLan}, ${incidentLat}, '${incidentAddress}')`;
      connectDB.query(sql5, (err, results) => {
        if (err) {
          reject(err);
          console.log('rejectef sql5');
        } else {
          const insertedId = results.insertId;
          console.log(insertedId);
          resolve(insertedId);
        }
      });
    });
  
    const sql_insert4 = await new Promise((resolve, reject) => {
      sql4 = `SELECT team_members.team_ID FROM team JOIN team_members ON team_members.team_ID = team.team_ID WHERE team.team_name = '${selectElement}'`;
      connectDB.query(sql4, (err, results) => {
        if (err) {
          reject(err);
          console.log('rejectef sql4');
        } else {
          const teamId = results.map((row) => row.team_ID)[0];
          resolve(teamId);
          console.log('sql insert 5', teamId);
        }
      });
    });
  
    const sql_insert1 = await Promise.all([sql_insert4, sql_insert5]).then(([ID_TEAM, ID_LOCAL]) => {
      values = [
        teamName,
        time,
        date,
        incidentAffected,
        TotalPrice.TOTALPRICE,
        ID_LOCAL,
        ID_TEAM,
        userId,
        incidentTitle,
      ];
      console.log('Total cooooooost is', date);
      const sql1 =
        'INSERT INTO accidents (accident_name, accident_start_time, accident_start_date, accident_status, population_affected, accident_cost, local_ID, team_ID, id_user, accident_title) VALUES (?, ?, ?, "ONGOING", ?, ?, ?, ?, ?, ?)';
  
      return new Promise((resolve, reject) => {
        connectDB.query(sql1, values, (err, results) => {
          if (err) {
            reject(err);
            console.log('rejectef sql1');
          } else {
            const insertedId = results.insertId;
            resolve(insertedId);
          }
        });
      });
    });
  
    const sql_insert2 = await new Promise((resolve, reject) => {
      const materialPromises = selectedMaterials.map(([material]) => {
        const values = [material.name];
        const sql2 = 'SELECT id_material FROM materials WHERE material_name = ?';
  
        return new Promise((resolve, reject) => {
          connectDB.query(sql2, values, (err, results) => {
            if (err) {
              reject(err);
            } else {
              const materialId = results.map((row) => row.id_material)[0];
              console.log('material result', materialId);
              resolve(materialId);
            }
          });
        });
      });
  
      Promise.all(materialPromises)
        .then((materialIds) => {
          console.log('materialIds', materialIds);
          resolve(materialIds);
        })
        .catch(reject);
    });
   /**/
     Promise.all([sql_insert1, sql_insert2]).then(([accidentid,materialid])=>{
    for(let i=0;i<materialid.length;i++){
    sql1=`INSERT INTO MaterialPerAccident values(${accidentid},${materialid[i]},${selectedMaterials[i][0].value})`;
    connectDB.query(sql1, values, (err, results) => {
      if (err) {
        throw(err)
      } else {
        
        console.log('ffinished')
      }
      
    });}


     });
    });
    const EndReport = asyncHandler(async (req, res) => {
      const { acc_ID } = req.body;
      const currentDate = new Date();
      const date = currentDate.toDateString();
      const time = currentDate.toTimeString();
      const sql = "UPDATE accidents SET accident_end_date = ?, accident_end_time = ? WHERE acc_ID = ?";
      const values = [date, time, acc_ID];
      
      try {
        await new Promise((resolve, reject) => {
          connectDB.query(sql, values, (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
        
        res.status(200).json({ message: "Update successful" });
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });
module.exports = { GetReports,GetReportName,CreateReport,EndReport };