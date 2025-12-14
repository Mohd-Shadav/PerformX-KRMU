const studentSchema = require("../models/studentSchema")
const Router = require('Router')

const studentAllData = async(req,res)=>{

    try{
        const result = await studentSchema.find();
        console.log("calling")
        res.status(200).send(result)
    }catch(err){

        res.status(404).send("Something Went Wrong")

    }

}

module.exports=studentAllData;