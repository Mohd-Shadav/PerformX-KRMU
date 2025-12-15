const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    rollno:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    technicalAssessment:{
        mock:{
            type:Number,
            min:0,
            max:30,
            required:true,
            default:0
            
        },
        oops:{
            type:Number,
            min:0,
            max:15,
            required:true,
            default:0
            
        },
        dbms:{
            type:Number,
            min:0,
            max:15,
            required:true,
            default:0
            
        },
        problemSolving:{
            type:Number,
            min:0,
            max:25,
            required:true,
            default:0
            
        },
        os:{
            type:Number,
            min:0,
            max:15,
            required:true,
            default:0
            
        },
       

    },
    aptitudeAssessment:{
        aptitudeTest:{
             type:Number,
            min:0,
            max:50,
            required:true,
            default:0

        },
        cocubesAmcat:{
              type:Number,
            min:0,
            max:50,
            required:true,
            default:0

        }
    },
    totalMarks:{
        type:Number,
        min:0,
        max:200,
        default:0
    }

})

module.exports=mongoose.model("studentschema",studentSchema);


