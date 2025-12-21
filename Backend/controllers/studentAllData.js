const studentSchema = require("../models/studentSchema")


const studentAllData = async(req,res)=>{

    const offset = parseInt(req.query.offset) || 0;
    const limit = 20;

    try{
        const students = await studentSchema.find().skip(offset).limit(limit);
const total = await studentSchema.countDocuments();
res.status(200).json({
  data: students,
  hasMore: offset + students.length < total
});
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