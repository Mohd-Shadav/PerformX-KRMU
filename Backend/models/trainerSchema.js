const mongoose = require('mongoose')

const trainerSchema = mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    name:{
         type:String,
        required:true

    },
    employeeID:{
         type:String,
        required:true
    },
    email:{
         type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    designation:{
         type:String,
        required:true
    },
    DOJ:{
        type:Date,
        required:true
    }
})

module.exports = mongoose.model("trainerschema",trainerSchema);