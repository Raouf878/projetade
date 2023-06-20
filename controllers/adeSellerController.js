const asyncHandler=require("express-async-handler");
const bcrypt=require('bcrypt')
const connectDB = require('../config/dbConnection');
const express=require('express');
const jwt=require('jsonwebtoken')
const app=express();
const mime = require('mime');
const CreateProduct=asyncHandler(async(req,res)=>{
    const{
        product_price,
        product_name,

    }=req.body
    sql='INSERT INTO materials (material_name,material_cost) VALUES(?,?)'
    values=[product_name,product_price]
    connectDB.query(sql,values, (err, results) => {
        if (err) {res.status(409).send(); console.log(err);}
        else{
        res.status(200).send();}
       
      });


})
const GetProduct=asyncHandler(async(req,res)=>{
    sql='SELECT * FROM materials'
    connectDB.query(sql, (err, results) => {
        if (err) {throw err}
        else{
        const deconstructedData = results.map(obj => Object.values(obj));
        res.render('ade-seller.ejs',  {deconstructedData} );}
       
      });

})
module.exports={CreateProduct,GetProduct}