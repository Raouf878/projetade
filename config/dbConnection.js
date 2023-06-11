
const mysql=require("mysql");
const dotenv=require("dotenv").config();
var dbconn=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});
dbconn.connect(function(err){
    if(err){
        throw err
    }
    console.log("connected to mysql")

});
module.exports=dbconn;