const express = require('express')
const app = express()
require('dotenv').config();
const connectDB = require('./config/db')
const studentRoutes = require('./Routes/studentRoutes')
const cors = require('cors')



connectDB();

 app.use(express.json());
 app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin: 'http://localhost:5173'
}));



 app.get('/',(req,res)=>{
  res.send('backend running')
  
 })

app.use('/student',studentRoutes);



 app.listen(5000,()=>{
    console.log('Port Running')

 })