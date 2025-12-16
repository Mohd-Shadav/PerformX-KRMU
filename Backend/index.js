const express = require('express')
const app = express()
require('dotenv').config();
const connectDB = require('./config/db')
const studentRoutes = require('./Routes/studentRoutes')
const authRoutes = require('./Routes/authRoutes')
const trainerRoutes = require('./Routes/trainerRoutes')
const cors = require('cors')
const cookieParser = require('cookie-parser')



connectDB();

 app.use(express.json({ limit: '10mb' }));
 app.use(express.urlencoded({ limit: '10mb', extended: true }))
 app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173'
}));



 app.get('/',(req,res)=>{
  res.send('backend running')
  
 })


app.use('/student',studentRoutes);
app.use('/api',authRoutes)
app.use('/trainer',trainerRoutes)


 app.listen(5000,()=>{
    console.log('Port Running')

 })