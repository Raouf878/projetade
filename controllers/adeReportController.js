const asyncHandler = require('express-async-handler');
const express = require('express');
const app = express();
const connectDB = require('../config/dbConnection');
app.set('view engine', 'ejs');

const GetReports=asyncHandler(async(req,res)=>{
    const sql = 'SELECT * from accidents where id_user=?';
    const sql3 = 'SELECT * from materials';
    const sql2 = "SELECT team.team_name ,team.team_ID,  SUM(accidents.estimated_time)AS total_estimated_time from team_members JOIN team  ON team_members.team_ID=Team.team_ID LEFT JOIN accidents ON accidents.team_ID = team.team_ID where team.team_unit=(?) GROUP BY team.team_ID, team.team_name "
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
              console.log('this teeeeam',results);
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
  const TeamName=`${(message[0]+message[1]+message[2]+randomInt+year+month+day).toUpperCase()}`
  console.log('name generated',TeamName);
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
      estimated_time,
    } = req.body;
  
    // Check if teamName already exists
    const teamExists = await new Promise((resolve, reject) => {
      const sqlCheckTeam = `SELECT COUNT(*) AS teamCount FROM accidents where accident_name = ?`;
      console.log(teamName);
      connectDB.query(sqlCheckTeam, [teamName], (err, results) => {
        if (err) {
          reject(err);
        } else {
          const teamCount = results[0].teamCount;
          const exists = teamCount > 0;
          resolve(exists);
        }
      });
    });
  
    if (teamExists) {
      // Redirect to another route if teamName already exists
      ReportUpdate(req, res);
      return; // Exit the function
    }
  
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
        estimated_time
      ];
      console.log('Total cooooooost is', date);
      const sql1 =
        'INSERT INTO accidents (accident_name, accident_start_time, accident_start_date, accident_status, population_affected, accident_cost, local_ID, team_ID, id_user, accident_title,estimated_time) VALUES (?, ?, ?, "INITIATED", ?, ?, ?, ?, ?, ?,?)';
  
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
      const sql = "UPDATE accidents SET accident_end_date = ?, accident_end_time = ?, accident_status='ENDED' WHERE acc_ID = ?";
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
  const DeleteReport=asyncHandler(async(req,res)=>{
    const{
      acc_ID
    }=req.body
    const sql="DELETE  from accidents where acc_ID=?"
    const sql2=`UPDATE materialperaccident SET acc_ID=NULL where acc_ID = ?`;
    console.log(acc_ID);
    values=[acc_ID]
    try{
      connectDB.query(sql2,values, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          connectDB.query(sql,values, (err, results) => {
            if (err) {
              console.log(err);
            } else {
              console.log('member deleted');
              res.status(204).send()
            }
          });
        }
      })
      

      
      }
  catch(err){
      console.log(err);
  }

  })
  const GetReportForUpdate=asyncHandler(async(req,res)=>{
    const {
      report_id
    }=req.body
    sql='SELECT accidents.acc_ID,accidents.accident_name,accidents.estimated_time,accidents.population_affected,accidents.accident_title,localisation.longtitude,localisation.latitude,localisation.address,team.team_name from accidents JOIN localisation ON accidents.local_ID=localisation.local_ID LEFT JOIN team ON team.team_ID=accidents.team_ID where accidents.acc_ID=?'
    sql2='SELECT materials.material_name,materialperaccident.total  from materials JOIN materialperaccident ON materials.id_material=materialperaccident.id_material where materialperaccident.acc_ID=?'
    values=[report_id]
    const result=new Promise((resolve,reject)=>{
      connectDB.query(sql,values, (err, results) => {
        if (err) {
          reject(err)
        } else {
          const transformedResult = results.map(row => ({ ...row }));
          resolve(transformedResult)
          
        }
      });
    })
    result
    .then(firstresult=>{
      connectDB.query(sql2,values, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          const transformedResult2 = results.map(row => ({ ...row }));
          console.log(transformedResult2);
          res.status(201).send({results,firstresult});
        }
      });

    })

    })
    const ReportUpdate = asyncHandler(async (req, res) => {
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
        estimated_time,
      } = req.body;
    
      const valuessimple = [
        incidentAffected,
        TotalPrice.TOTALPRICE,
        incidentTitle,
        estimated_time,
        teamName,
      ];
    
      const sqlsimple =
        'UPDATE accidents SET population_affected = ?, accident_cost = ?, accident_title = ?, estimated_time = ? WHERE accident_name = ?';
        connectDB.query(sqlsimple, valuessimple, (err, results) => {
          if (err) {
            console.log('Rejected sql5');
          } else {
            console.log('success')
          }
        });
      const sql_insert5 = new Promise((resolve, reject) => {
        values = [teamName];
        sql5 = `SELECT local_ID FROM accidents WHERE accident_name = ?`;
        connectDB.query(sql5, values, (err, results) => {
          if (err) {
            reject(err);
            console.log('Rejected sql5');
          } else {
            const localid = results.map(obj => Object.values(obj));
            resolve(localid);
          }
        });
      });
    
      const sql_insert4 = new Promise((resolve, reject) => {
        values = [selectElement];
        sql5 = `SELECT team_ID FROM team WHERE team_name = ?`;
        connectDB.query(sql5, values, (err, results) => {
          if (err) {
            reject(err);
            console.log('Rejected sql4');
          } else {
            const teamId = results.map(row => row.team_ID)[0];
            resolve(teamId);
          }
        });
      });
    
      const sql_acc = new Promise((resolve, reject) => {
        values = [teamName];
        sql5 = `SELECT acc_ID FROM accidents WHERE accident_name = ?`;
    
        connectDB.query(sql5, values, (err, results) => {
          if (err) {
            reject(err);
            console.log('Rejected sql4');
          } else {
            const accId = results.map(row => row.acc_ID)[0];
            resolve(accId);
          }
        });
      });
    
      const sql_insert2 = new Promise((resolve, reject) => {
        const materialPromises = selectedMaterials.map(([material]) => {
          const values = [material.name];
          const sql2 = 'SELECT id_material FROM materials WHERE material_name = ?';
    
          return new Promise((resolve, reject) => {
            connectDB.query(sql2, values, (err, results) => {
              if (err) {
                reject(err);
              } else {
                console.log(results);
                const materialId = results.map(row => row.id_material)[0];
                console.log('Material result', materialId);
                resolve(materialId);
              }
            });
          });
        });
    
        Promise.all(materialPromises)
          .then((materialIds) => {
            console.log('MaterialIds', materialIds);
            resolve(materialIds);
          })
          .catch(reject);
      });
    
      try {
        const teamid = await sql_insert4;
    
        values = [teamid, teamName];
        sql6 = 'UPDATE accidents SET team_ID = ? WHERE accident_name = ?';
        await new Promise((resolve, reject) => {
          connectDB.query(sql6, values, (err, results) => {
            if (err) {
              reject(err);
            } else {
              console.log('Team updated');
              resolve();
            }
          });
        });
    
        const locald = await sql_insert5;
    
        values = [incidentAddress, incidentLan, incidentLat, locald];
        sql6 = 'UPDATE localisation SET address = ?, longtitude = ?, latitude = ? WHERE local_ID = ?';
        await new Promise((resolve, reject) => {
          connectDB.query(sql6, values, (err, results) => {
            if (err) {
              reject(err);
            } else {
              console.log('Location updated');
              resolve();
            }
          });
        });
    
        const acc_ID = await sql_acc;
    
        await new Promise((resolve, reject) => {
          values = [acc_ID];
          sql5 = `DELETE FROM materialperaccident WHERE acc_ID = ?`;
    
          connectDB.query(sql5, values, (err, results) => {
            if (err) {
              reject(err);
              console.log('Rejected sql4');
            } else {
              console.log('deleted');
              resolve();
            }
          });
        });
    
        const materialid = await sql_insert2;
    
        const sqlPromises = [];
        for (let i = 0; i < materialid.length; i++) {
          sql1 = `INSERT INTO MaterialPerAccident VALUES (?, ?, ?)`;
          const sqlParams = [acc_ID, materialid[i], selectedMaterials[i][0].value];
    
          sqlPromises.push(
            new Promise((resolve, reject) => {
              connectDB.query(sql1, sqlParams, (err, results) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            })
          );
        }
    
        await Promise.all(sqlPromises);
    
        console.log('Finished');
        
    
        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    });
    
module.exports = { GetReports,GetReportName,CreateReport,EndReport,DeleteReport,GetReportForUpdate,ReportUpdate };