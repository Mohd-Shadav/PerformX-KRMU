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
    department:{
        type:String
    },
    designation:{
         type:String,
        required:true
    },
    DOJ:{
        type:Date,
        required:true
    },
    password:{
        type:String
    }
})

module.exports = mongoose.model("trainerschema",trainerSchema);