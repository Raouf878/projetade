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
        console.log(deconstructedData);
        res.render('ade-seller.ejs',  {deconstructedData} );}
       
      });

})
const DeleteProduct=asyncHandler(async(req,res)=>{
    const id=req.params.id
    console.log(id);
    sql='DELETE from materialperaccident where id_material=?'
    sql2='DELETE from materials where id_material=?'
    values=[id]
    connectDB.query(sql,values, (err, results) => {
        if (err) {res.status(409).send(); console.log(err);}
        else{
            connectDB.query(sql2,values, (err, results) => {
                if (err) {res.status(409).send(); console.log(err);}
                else{
                res.status(200).send();}
               
              });
        }
       
      });
})
const UpdateProduct=asyncHandler(async(req,res)=>{
    const {
        product,
        price
    }=req.body
    let id =req.params.id
    sql='UPDATE materials SET material_name=? , material_cost=? where id_material=?'
    console.log(product);
    values=[product,price,id]
    connectDB.query(sql,values, (err, results) => {
                if (err) {res.status(409).send(); console.log(err);}
                else{
                res.status(200).send();}
               
              });
})
module.exports={CreateProduct,GetProduct,DeleteProduct,UpdateProduct}