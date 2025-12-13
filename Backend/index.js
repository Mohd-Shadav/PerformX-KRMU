const express = require('express')
const app = express()
require('dotenv').config();
const connectDB = require('./config/db')

connectDB();



 app.get('/',(req,res)=>{
    res.send('hello lala')
 })


 app.listen(5000,()=>{
    console.log('Port Running')

 })