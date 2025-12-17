const studentSchema = require("../models/studentSchema")


const studentAllData = async(req,res)=>{

    try{
        const result = await studentSchema.find();
        
       
        res.status(200).send(result)
    }catch(err){

        res.status(404).send("Something Went Wrong")

    }

}

const getStudent = async(req,res)=>{

    try{
        let {id}=req.params

        if(!id) return res.status(404).send("User Not Found");

        let data = await studentSchema.findOne({_id:id});

        if(!data) return res.status(404).send("User Not Found");

        res.status(200).send(data);

    }catch(err)
    {
        res.status(500).send("Server Error",err)
    }

}

module.exports={studentAllData,getStudent};