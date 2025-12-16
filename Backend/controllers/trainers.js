const studentSchema = require('../models/studentSchema')
const MarksEntry = async(req,res)=>{

     try {
    const updates = req.body;

    if (!Array.isArray(updates)) {
      return res.status(400).json({ message: 'Invalid payload format' });
    }

    const bulkOps = updates.map((s) => ({
        
      updateOne: {
        filter: { _id: s.studentId },
        update: {
          $set: {
            technicalAssessment: s.technicalAssessment,
            aptitudeAssessment: s.aptitudeAssessment,
            updatedAt: new Date(),
          },
        },
      },
    }));

    await studentSchema.bulkWrite(bulkOps);

    res.status(200).json({
      message: 'Marks overridden successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to update marks',
    });
  }

}

module.exports = MarksEntry;