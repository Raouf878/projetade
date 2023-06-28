const asyncHandler = require('express-async-handler');
const express = require('express');
const app = express();
const connectDB = require('../config/dbConnection');
const DataCreater=require('../utils/Report_templating')
app.set('view engine', 'ejs');
const GetReports = asyncHandler(async (req, res) => { 
  const sql = `SELECT team_members.id_member,users.full_name, team_members.member_phone_number, team.team_name,team.team_ID FROM users JOIN team_members ON users.team_member_id = team_members.id_member JOIN team ON team_members.team_ID = team.team_ID`;
  try{
    await connectDB.query(sql, (err, results) => {
        if (err) throw err;
        const reports = results.length;
        const DataShown=DataCreater.PushToArray(results,reports);
        
        
        res.render('ade_resp_teams.ejs',  {DataShown} );
        
      });
  }
  catch(err){
    console.log(err);
  }
});
const GetTeamName=asyncHandler(async (req,res)=>{

const message = req.params.unite;
const date = new Date();
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');
const max = 1000;
const randomInt = Math.floor(Math.random() * max);
const TeamName=`${(message[0]+message[1]+message[2]+year+month+day+randomInt).toUpperCase()}`
res.status(200).json({message:TeamName})
} )
const CreateUser = asyncHandler(async (req, res) => {
  var name=[]
  var phone = [];
  for (var i = 1; i < req.body.length; i++) {
    name.push(req.body[i].name.toLowerCase());
    phone.push(req.body[i].phone);
  }
  const team_name = req.body[0];
  console.log("naaadzdenme",req.body);
  const message = req.params.unite;
  const user = req.params.iduser;

  const sql = 'INSERT INTO team (team_name, team_unit) VALUES (?, ?);';
  const values = [team_name, message];
  console.log("team name",team_name);
  const sql_insert = new Promise((resolve, reject) => {
    connectDB.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log('last insert',results.insertId);
        resolve(results.insertId);
        
      }
    });
  });

  sql_insert
    .then(lastInsertedId => {
      let memberAddedCount = 0;
      const memberInsertCallback = () => {
        memberAddedCount++;
        if (memberAddedCount === name.length) {
          console.log('link to redirect');
          res.status(201)
          res.redirect(`/report/${user}/${message}`);
        }
      };

      for (let i = 0; i < name.length; i++) {
        console.log('for',lastInsertedId);
        const sql =
          'INSERT INTO team_members (member_phone_number,team_ID) VALUES (?,?);';
        let values = [phone[i],lastInsertedId];
        let last=connectDB.query(sql, values, (err, results) => {
          if (err) {
            console.log(err);
          } else {
            const insertedMemberId = results.insertId;
            let sql55='INSERT INTO users (full_name,unit,role,team_member_id)values(?,?,"equipeade",?)'
            let values2=[name[i],message,insertedMemberId]
           
            connectDB.query(sql55, values2, (err, results) => {
              if (err) {
                console.log(err);
              } else {
                memberInsertCallback();
              }
            });
          }
        });
      }
    })
    .catch(error => {
      console.error('Error inserting data:', error);
    });
});
const DeleteUser=asyncHandler(async(req,res)=>{
  const id_user=req.params.iduser
  const unite=req.params.message;
  const teamid=req.params.idteam
  const sql='DELETE FROM team_members WHERE team_ID = (?)';
  const sql1='DELETE FROM team WHERE team_ID = (?)'
  const sql4='UPDATE accidents SET team_ID=NULL where team_ID = ?'
  const values=[teamid]
  const Query=new Promise((resolve,reject)=>{
    connectDB.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      reject(err)
    } else {
      console.log('member added')
      resolve()
    }
  });
});
  Query
  .then(()=>{
    connectDB.query(sql4, values, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        connectDB.query(sql1, values, (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.log('member added');
            res.status(204).send()
          }
        })
      }
    })
   
    
    
  })
  .catch(err=>{
    console.log(err);
  })

  
})
module.exports = { GetReports,GetTeamName,CreateUser,DeleteUser };