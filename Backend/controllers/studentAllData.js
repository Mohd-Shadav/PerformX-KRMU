const studentSchema = require("../models/studentSchema")


const studentAllData = async(req,res)=>{

    try{
        const result = await studentSchema.find();
       
        res.status(200).send(result)
    }catch(err){

        res.status(404).send("Something Went Wrong")

    }

}

module.exports=studentAllData;