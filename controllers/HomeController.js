const asyncHandler = require('express-async-handler');
const express = require('express');
const app = express();
const DataCreater = require('../utils/Home_templating');
const connectDB = require('../config/dbConnection');
app.set('view engine', 'ejs');
const mime = require('mime');

const GetInfo = asyncHandler(async (req, res) => {
  const sql = 'SELECT * from accidents JOIN localisation ON accidents.local_ID=localisation.local_ID where id_user=3';
  const sql2 = 'SELECT * from team';
  const userId = req.params.iduser;
  const message = req.params.unite;
  console.log("this is unite", message);

  try {
    const results = await new Promise((resolve, reject) => {
      connectDB.query(sql, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    const reports = results.length;
    const DataShown = await DataCreater.PushToArray(results, reports);
    console.log(DataShown[1][11]);
    res.render('ade_resp_home.ejs', { DataShown });
  } catch (err) {
    console.log(err);
  }
});

module.exports = { GetInfo };