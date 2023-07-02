const asyncHandler = require('express-async-handler');
const express = require('express');
const app = express();
const connectDB = require('../config/dbConnection');
app.set('view engine', 'ejs');
const getTeamreport=asyncHandler(async(req,res)=>{
    const idUser=req.params.iduser;
    const Unite=req.params.unite;
    sql=`SELECT team_members.id_member,users.full_name, team_members.member_phone_number, team.team_name,team.team_ID,team.team_unit FROM users JOIN team_members ON users.team_member_id = team_members.id_member JOIN team ON team_members.team_ID = team.team_ID  where users.id_user=?`;
    sql2="SELECT accidents.acc_ID,accidents.accident_name, accidents.accident_start_date,accidents.accident_title,accidents.accident_status,localisation.longtitude,localisation.latitude FROM accidents   JOIN team ON accidents.team_ID=team.team_ID JOIN localisation ON accidents.local_ID=localisation.local_ID where accidents.team_ID=? ";
    
    try{
        const teeeeam_id=await new Promise((resolve, reject) => {
            
            sql5 = `SELECT team.team_ID from team JOIN team_members ON team_members.team_ID = team.team_ID JOIN users ON users.team_member_id=team_members.id_member where users.id_user=? `;
            values=[idUser];
            connectDB.query(sql5, values, (err, results) => {
              if (err) {
                reject(err);
                console.log('Rejected sql4');
              } else {
                const teamd = results.map(obj => Object.values(obj));
                console.log(teamd);
                resolve(teamd);
              }
            });
          });
          const teamd = await teeeeam_id; // Await the promise value
          
          values3 = [teamd];
         
        connectDB.query(sql,values, (err, results) => {
            if (err) throw err;
            const reports = results.length;
            let deconstructedData1 = results.map(obj => Object.values(obj));
            console.log('11',deconstructedData1);
            console.log('fefozief',values3);
            connectDB.query(sql2,values3, (err, results) => {
                if (err) throw err;
                const reports = results.length;
                let deconstructedData = results.map(obj => Object.values(obj));
                console.log(deconstructedData);
                    res.render('ade-team.ejs', { deconstructedData1,deconstructedData });
                
                
               
              });
           
          
        })
          
          
        
          

          

    }
    catch(err){
        console.log(err);
    }
})
const getMaterialInc=asyncHandler(async(req,res)=>{
    const{
        incident_name
    }=req.body
    let incidentCode=req.params.incident;
    sql='SELECT acc_ID from accidents where accident_name=?'
    values=[incidentCode]
    const response1= new Promise((resolve,reject)=>{
        try{
            connectDB.query(sql,values, (err, results) => {
                if (err) {
                  reject(err);
                  console.log('rejectef sql5');
                } else {
                let deconstructedData = results.map(obj => Object.values(obj));
                  resolve(deconstructedData);
                }
              });
        }
        catch(err){
            console.log(err);
        }
    })
    response1.then(ini_id=>{
        sql2='SELECT * from materialperaccident JOIN materials ON materialperaccident.id_material=materials.id_material where materialperaccident.acc_ID=?'
        values=[ini_id];
        connectDB.query(sql2,values, (err, results) => {
            if (err) {res.status(300).send(); ;}
            else{
            
            let FdeconstructedData = results.map(obj => Object.values(obj));
            res.status(200).send(FdeconstructedData);}
           
          });
    })
})
const postReportStatus=asyncHandler(async(req,res)=>{
    const id=req.params.id
    sql='UPDATE accidents SET accident_status="ONGOING" where acc_id=?'
    values=[id]
    connectDB.query(sql,values, (err, results) => {
        if (err) throw err
        else{
        
        res.status(200).send();}
       
      });
})
const postReportStatusEnd=asyncHandler(async(req,res)=>{
    const id=req.params.id
    const currentDate = new Date();
    const date = currentDate.toDateString();
    const time = currentDate.toTimeString();
    const sql = "UPDATE accidents SET accident_end_date = ?, accident_end_time = ?, accident_status='ENDED' WHERE acc_ID = ?";
    values=[date, time, id]
    connectDB.query(sql,values, (err, results) => {
        if (err) throw err
        else{
        
        
        res.status(200).send();}
       
      });
})
module.exports={
    getTeamreport,getMaterialInc,postReportStatus,postReportStatusEnd
}