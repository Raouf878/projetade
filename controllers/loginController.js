const asyncHandler=require("express-async-handler");
const bcrypt=require('bcrypt')
const connectDB = require('../config/dbConnection');
const express=require('express');
const jwt=require('jsonwebtoken')
const app=express();
const mime = require('mime');
app.set('view engine', 'ejs');
const RegisterUser = asyncHandler(async (req, res) => {
  try {
    const {
      firstname,
      email,
      password,
      unit,
      role
    } = req.body;
    
    if (role === 'équipe ADE') {
      const lowercaseStr = firstname.toLowerCase();
      const selectSql = "SELECT COUNT(*) AS userCount FROM users WHERE full_name = ? AND role = 'equipeade'";
      const updateSql = "UPDATE users SET email = ?, password = ? WHERE full_name = ? AND role = 'equipeade'";

      // Execute the select query to check if the user exists
      connectDB.query(selectSql, [lowercaseStr], async (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          // Check the userCount from the result
          const userCount = result[0].userCount;
          if (userCount === 0) {
            res.status(400).json({
              success: false,
              error: 'No user found with the provided full name.'
            });
          } else {
            // User exists, proceed with the update query
            const salt = await bcrypt.genSalt();
            const hashPass = await bcrypt.hash(password, salt);
            const updateValues = [email, hashPass, lowercaseStr];

            connectDB.query(updateSql, updateValues, (updateErr, updateResult) => {
              if (updateErr) {
                console.log(updateErr);
                res.status(500).send('Internal Server Error');
              } else {
                res.status(200).json({
                  success: true
                });
              }
            });
          }
        }
      });
    } else {
      const salt = await bcrypt.genSalt();
      const hashPass = await bcrypt.hash(password, salt);
      const sql = 'INSERT INTO users (full_name, unit, email, password, role) VALUES (?, ?, ?, ?, ?)';
      const RolelowercaseStr = role.toLowerCase();
      const values = [firstname, unit, email, hashPass, RolelowercaseStr];

      await connectDB.query(sql, values, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).json({
            success: true
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const values = [email];
    connectDB.query(sql, values, async function(err, result, fields) {
      if (err) throw err;

      if (result.length === 0) {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
      } else {
        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          
          res.status(400).json({ success: false, message: 'Invalid email or password' });
        } else {
          const token = jwt.sign({ id: user.id_user }, process.env.JWT_SECRET);
          res.status(200).json({message:user.unit,id:user.id_user,role:user.role})  
        }
      }
    });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});
module.exports={LoginUser,RegisterUser};