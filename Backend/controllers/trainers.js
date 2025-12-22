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

const mockEvaluatorMarksEntry = async (req, res) => {
  try {
    const updates = req.body;

 

    if (!Array.isArray(updates)) {
      return res.status(400).json({ message: "Invalid payload format" });
    }

    const bulkOps = updates.map(s => {
           const mock1Total =
        (s.mockEvaluator.mock1.programming || 0) +
        (s.mockEvaluator.mock1.problemSolving || 0) +
        (s.mockEvaluator.mock1.domainExpertise || 0) +
        (s.mockEvaluator.mock1.coreConcepts || 0);

      const mock2Total =
        (s.mockEvaluator.mock2.programming || 0) +
        (s.mockEvaluator.mock2.coreConcepts || 0) +
        (s.mockEvaluator.mock2.programmingAndProblemSolving || 0) +
        (s.mockEvaluator.mock2.domainExpertise || 0) +
        (s.mockEvaluator.mock2.hrInteractionSkills || 0);


      // console.log(s.mockEvaluator.mock1)

      return {
        updateOne: {
          filter: { _id: s.studentId}, 
          update: {
            $set: {
              technicalAssessment:{
                ...s.technicalAssessment,
                mock: mock1Total + mock2Total
              },
              mockEvaluator: {
                mock1: {
                  ...s.mockEvaluator.mock1,
                 
                },
                mock2: {
                  ...s.mockEvaluator.mock2,
                 
                },
                totalMockMarks: mock1Total + mock2Total
              },
             
            }
          }
        }
      };
    });

    const result = await studentSchema.bulkWrite(bulkOps, {
      ordered: false
    });

    res.status(200).json({
      message: "Mock evaluation saved successfully",
      result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update marks"
    });
  }
};


module.exports = {MarksEntry,getTrainerData,mockEvaluatorMarksEntry};