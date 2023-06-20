const asyncHandler=require("express-async-handler");
const bcrypt=require('bcrypt')
const connectDB = require('../config/dbConnection');
const express=require('express');
const jwt=require('jsonwebtoken')
const app=express();
const mime = require('mime');
app.set('view engine', 'ejs');
const RegisterUser=asyncHandler(async(req,res) => {
  try{
        const {
            firstname,
            lastname,
            email,
            password,
            unit
        }=req.body;
        const salt=await bcrypt.genSalt();
        const HashPass= await bcrypt.hash(password,salt )
        const sql =('INSERT INTO users (first_name, last_name, unit, email, password) VALUES (?, ?, ?, ?,?)');
        const values=[firstname,lastname,unit,email,HashPass]
        await connectDB.query(sql,values, (err, result) => {
                    if (err) {
                      console.log(err);
                      res.status(500).send('Internal Server Error');
                    } else {
                        res.status(200).json({
                            success: true
                          });
                    }
                  });
    }catch(err){
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
          res.status(200).json({message:user.unit,id:user.id_user})  
        }
      }
    });
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});
module.exports={LoginUser,RegisterUser};