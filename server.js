const express=require('express');
const dotenv=require("dotenv").config();
const app=express();
const mime = require('mime');
const path =require('path');

app.use(express.json());
app.use(express.urlencoded({extended: false}))
var dir = path.join(__dirname, 'views');

app.use(express.static(dir));

app.set('view engine', 'ejs');
const connectDB = require('./config/dbConnection');
connectDB;
const port=process.env.PORT||5000;
app.get('/Login.css', function(req, res) {
    res.setHeader('Content-Type', mime.getType('Login.css'));
    res.sendFile(__dirname + '/views/Login.css');
  });
 
  
app.get('/Login',(req,res)=>{
    res.render('Login')

});


app.use('/home',require('./routes/home-routes'))
app.use('/Generate',require('./routes/report-routes'))

app.get('/register',(req,res)=>{
    res.render('register')

})
app.use('/report',require('./routes/report-routes'))
app.use('/adereport',require('./routes/ade-report-routes'))
app.use('/Team',require('./routes/report-routes'))
app.use('/register',require('./routes/login-route'))
app.use('/LLogin',require('./routes/login-route'))
app.use('/map',require('./routes/map-route.js'))
app.use('/ade',require('./routes/ade-team-route.js'))
app.use('/aade/seller',require('./routes/ade-seller-routes'))
app.use('/aade',require('./routes/ade-seller-routes'))


app.listen(port,()=>{
    console.log(`server running ${port}`);
});
