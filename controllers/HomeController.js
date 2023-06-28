const asyncHandler = require('express-async-handler');
const express = require('express');
const app = express();
const DataCreater = require('../utils/Home_templating');
const connectDB = require('../config/dbConnection');
app.set('view engine', 'ejs');
const mime = require('mime');

const GetInfo = asyncHandler(async (req, res) => {
  const sql = 'SELECT * from accidents JOIN localisation ON accidents.local_ID=localisation.local_ID where id_user=?';
  const sql2 = 'SELECT * from team where team_unit=?';
  const sql3='SELECT SUM(accidents.accident_cost) AS total_cost FROM accidents JOIN team ON accidents.team_ID=team.team_ID where team.team_unit=? AND accidents.id_user=?;'
  const userId = req.params.iduser;
  const message = req.params.unite;
values=[userId]
values2=[message]
values3=[message,userId]
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
      connectDB.query(sql3,values3, (err, results) => {
        if (err) {
          reject(err);
        } else {
          
          resolve(results);
        }
      });
    });

    const reports = results.length;
    if(reports===0){
      const deconstructedData = results2.map(obj => Object.values(obj));
      const deconstructedData2 = results3.map(obj => Object.values(obj));
      res.render('ade_resp_home.ejs', { DataShown: [],deconstructedData,deconstructedData2 })

    }
    else{
    const DataShown = await DataCreater.PushToArray(results, reports);
    const deconstructedData = results2.map(obj => Object.values(obj));
    const deconstructedData2 = results3.map(obj => Object.values(obj));
    console.log(DataShown);
    res.render('ade_resp_home.ejs', { DataShown,deconstructedData,deconstructedData2 });}
  } catch (err) {
    console.log(err);
  }
});
const downloadPDF=asyncHandler(async(req,res)=>{
  const date = new Date();
  const puppeteer = require('puppeteer');
  const ejs = require('ejs');
  const fs = require('fs');
  const path = require('path');
  let Id=req.params.id
  async function generatePDF(dat) {
    // Get the absolute path of the template file
    const templatePath = path.join(__dirname, '..', 'views', 'ade_pdf.ejs');
  
    // Render the EJS template with the provided data
    const template = fs.readFileSync(templatePath, 'utf8');
    const html = ejs.render(template, {dat:dat});
    const day = date.getDate().toString().padStart(2, '0');
    const max = 1000;
    const randomInt = Math.floor(Math.random() * max);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    // Set the content of the page to the rendered HTML
    await page.setContent(html);
    await page.waitForSelector('.map', { timeout: 75000 })
    const map1Screenshot = await page.$('.map');
    await map1Screenshot.screenshot({ path: 'map.png' });
    const outputPath = path.join('C:\\Users\\pc\\OneDrive - Association Cesi Viacesi mail\\Bureau', 'pdf', `${Id}${randomInt}${day}.pdf`); // Update the path as per your requirement
    await page.pdf({ path: outputPath, format: 'A4' });
    await browser.close();
  }
  
  // Example data
 sql='SELECT accidents.accident_start_date, accidents.accident_name, localisation.longtitude, localisation.latitude, localisation.address, users.full_name, team.team_name FROM accidents JOIN users ON accidents.id_user = users.id_user JOIN localisation ON accidents.local_ID = localisation.LOCAL_ID JOIN team ON accidents.team_ID = team.team_ID WHERE accidents.acc_ID = ?'
 values=[Id]
 await connectDB.query(sql, values, (err, results) => {
  if (err) {
    console.log(err);
  } else {
    const dat = results.map(obj => Object.values(obj));
    console.log(dat);
    generatePDF(dat);
  }
})
})
module.exports = { GetInfo,downloadPDF };