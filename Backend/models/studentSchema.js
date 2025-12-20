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
    role:{
        type:String,
         required:true
    },
    specialization:{
        type:String,
        required:true
    },
    program:{
        type:String,
        required:true
    },

    technicalAssessment:{
        mock:{
            type:Number,
            min:0,
            max:40,
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
    mockEvaluator:{
        mock1:{
            programming:{
                type:Number,
                min:0,
                max:5},
            coreConcepts:{
                type:Number,
                min:0,
                max:5},
            problemSolving:{
                type:Number,
                min:0,
                max:5},
            domainExpertise:{
                type:Number,
                min:0,
                max:5},
            totalMarks1:{
                type:Number,
                min:0,
                max:20},
            remarks:{
                type:String
            }
        },
        mock2:{
            coreConcepts:{
                type:Number,
                min:0,
                max:5},
            programmingAndProblemSolving:{
                type:Number,
                min:0,
                max:5},
          
            domainExpertise:{
                type:Number,
                min:0,
                max:5},
            hrInteractionSkills:{
                type:Number,
                min:0,
                max:5},
            totalMarks2:{
                type:Number,
                min:0,
                max:20},
            remarks:{
                type:String
            }
        },

        totalMockMarks:{
            type:Number,
            min:0,
            max:40
        }
              
        },
    
    totalMarks:{
        type:Number,
        min:0,
        max:200,
        default:0
    },
    password:{
        type:String
    }

})

module.exports=mongoose.model("studentschema",studentSchema);


