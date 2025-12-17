const studentSchema = require('../models/studentSchema');
const trainerSchema = require('../models/trainerSchema');


const getTrainerData = async(req,res)=>{
  try{

    const {id} = req.params;


    let data = await trainerSchema.findOne({_id:id});



    res.status(200).send(data)

  }catch(err){
    res.status(500).send("Server Error")
  }
}

const MarksEntry = async(req,res)=>{

     try {
    const updates = req.body;
  



    if (!Array.isArray(updates)) {
      return res.status(400).json({ message: 'Invalid payload format' });
    }

const bulkOps = updates.map(s => ({updateOne: {
        filter: { _id: s._id},
        update: {
          $set: {
            technicalAssessment: s.technicalAssessment,
            aptitudeAssessment: s.aptitudeAssessment,
             totalMarks:
      s.technicalAssessment.mock +
      s.technicalAssessment.oops +
      s.technicalAssessment.dbms +
      s.technicalAssessment.problemSolving +
      s.technicalAssessment.os +
      s.aptitudeAssessment.aptitudeTest +
      s.aptitudeAssessment.cocubesAmcat
  
          }
        },
        upsert: false
      }
    }));

    const result = await studentSchema.bulkWrite(bulkOps, { ordered: false });
    

    
    res.status(200).json({
      message: 'Marks overridden successfully',
    });
  } catch (error) {
  
    res.status(500).json({
      message: 'Failed to update marks',
    });
  }

}

module.exports = {MarksEntry,getTrainerData};