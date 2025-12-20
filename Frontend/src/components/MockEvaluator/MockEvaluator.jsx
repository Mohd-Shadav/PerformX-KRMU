import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import axios from 'axios';



const MockEvaluator = () => {
 
    const [mockStudentsData,setStudentsData] = useState([])
    const [activeMock, setActiveMock] = useState(1);
    const [loading, setLoading] = useState(false);
    const [saveMessage, setSaveMessage] = useState(null);
    const [expandedRemarksId, setExpandedRemarksId] = useState(null);

    // Initialize marks and remarks state
    const [mock1Data, setMock1Data] = useState([]);

    const [mock2Data, setMock2Data] = useState([]);



    const fetchStudentsData = async()=>{
        // Fetch or load student data here and update state
        try{
            let res = await axios.get("http://localhost:5000/student/allstudentdata");
           
            if(res.status===200)
            {
                setStudentsData(res.data);
                setMock1Data(
                    res.data.map((student) => ({
                        ...student,
                        programming: student.mockEvaluator.mock1.programming || 0,
                        coreConcepts: student.mockEvaluator.mock1.coreConcepts || 0,
                        problemSolving: student.mockEvaluator.mock1.problemSolving || 0,
                        domainExpertise: student.mockEvaluator.mock1.domainExpertise || 0,
                        remarks: student.mockEvaluator.mock1.remarks||"",
                    }))
                );

                setMock2Data(
                    res.data.map((student) => ({
                        ...student,
                        coreConcepts: student.mockEvaluator.mock2.coreConcepts || 0,
                        programmingAndProblemSolving: student.mockEvaluator.mock2.programmingAndProblemSolving || 0 ,
                        domainExpertise: student.mockEvaluator.mock2.domainExpertise || 0,
                        hrInteractionSkills: student.mockEvaluator.mock2.hrInteractionSkills || 0,
                        remarks: student.mockEvaluator.mock2.remarks || '',
                    }))
                );
            }

        }catch(err){
            alert("Something Went Wrong while fetching student data")
        }
    }

    useEffect(()=>{
        fetchStudentsData();
    },[])

    // Get current data based on active mock
    const currentData = activeMock === 1 ? mock1Data : mock2Data;
    const setCurrentData = activeMock === 1 ? setMock1Data : setMock2Data;

    // Calculate total marks for Mock 1
    const calculateTotal1 = (student) => {
        return (
            (student.programming || 0) +
            (student.coreConcepts || 0) +
            (student.problemSolving || 0) +
            (student.domainExpertise || 0)
        );
    };

    // Calculate total marks for Mock 2
    const calculateTotal2 = (student) => {
        return (
            (student.coreConcepts || 0) +
            (student.programmingAndProblemSolving|| 0) +
            
            (student.domainExpertise || 0) +
            (student.hrInteractionSkills || 0)
        );
    };

    // Handle input change
    const handleInputChange = (studentId, field, value) => {
        const updatedData = currentData.map((student) =>
            student._id === studentId ? { ...student, [field]: value } : student
        );
        setCurrentData(updatedData);
    };

    // Handle save
    const handleSave = async () => {
        setLoading(true);
    
        

   const buildPayload = () => {
  return mockStudentsData.map(student => {
    const mock1 = mock1Data.find(s => s._id === student._id);
    const mock2 = mock2Data.find(s => s._id === student._id);

    return {
    
      studentId: student._id,
      rollno: student.rollno,
      name: student.name,
      mockEvaluator: {
        mock1: {
          programming: mock1?.programming|| 0,
          coreConcepts: mock1?.coreConcepts || 0,
          problemSolving: mock1?.problemSolving || 0,
          domainExpertise: mock1?.domainExpertise || 0,
          totalMarks1: calculateTotal1(mock1 || {}),
          remarks: mock1?.remarks || ""
        },
        mock2: {
         
          coreConcepts: mock2?.coreConcepts || 0,
          programmingAndProblemSolving: mock2?.programmingAndProblemSolving || 0,
          domainExpertise: mock2?.domainExpertise || 0,
          hrInteractionSkills: mock2?.hrInteractionSkills || 0,
          totalMarks2: calculateTotal2(mock2 || {}),
          remarks: mock2?.remarks || ""
        }
      }
    };
  });
};
const payload = buildPayload();



try{

    let res = await axios.put("http://localhost:5000/trainer/updatemockevaluationmarks",payload,{
        headers:{
            'Content-Type':'application/json'
        }
    });

 

}catch(err){
    alert("Error while saving mock evaluator data");
}

   
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSaveMessage(`Mock Evaluator Marks saved successfully!`);
            setTimeout(() => setSaveMessage(null), 4000);
        }, 1200);
    };

    // Mock 1 Table Columns
    const renderMock1Row = (student, index) => (
        <tr
            key={student._id}
            className={`border-b transition-colors ${
                index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
            } hover:bg-indigo-50`}
        >
            <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-white">
                {student.rollno}
            </td>
            <td className="px-4 py-3 text-sm text-gray-700">{student.name}</td>
            <td className="px-4 py-3 text-sm text-gray-700">{student.section}</td>
            <td className="px-4 py-3 text-sm text-gray-600">{student.email}</td>
            <td className="px-4 py-3">
                <input
                    type="number"
                    min="0"
                    max="10"
                    value={student.programming}
                    onChange={(e) =>
                        handleInputChange(
                            student._id,
                            'programming',
                             e.target.value === '' ? '' : Number(e.target.value)
                        )
                    }
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </td>
            <td className="px-4 py-3">
                <input
                    type="number"
                    min="0"
                    max="10"
                    value={student.coreConcepts}
                    onChange={(e) =>
                        handleInputChange(
                            student._id,
                            'coreConcepts',
                             e.target.value === '' ? '' : Number(e.target.value)
                        )
                    }
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </td>
            <td className="px-4 py-3">
                <input
                    type="number"
                    min="0"
                    max="10"
                    value={student.problemSolving}
                    onChange={(e) =>
                        handleInputChange(
                            student._id,
                            'problemSolving',
                             e.target.value === '' ? '' : Number(e.target.value)
                        )
                    }
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </td>
            <td className="px-4 py-3">
                <input
                    type="number"
                    min="0"
                    max="10"
                    value={student.domainExpertise}
                    onChange={(e) =>
                        handleInputChange(
                            student._id,
                            'domainExpertise',
                             e.target.value === '' ? '' : Number(e.target.value)
                        )
                    }
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </td>
            <td className="px-4 py-3 text-sm font-semibold text-indigo-600">
                {calculateTotal1(student)}
            </td>
            <td className="px-4 py-3">
                <button
                    onClick={() =>
                        setExpandedRemarksId(
                            expandedRemarksId === student._id ? null : student._id
                        )
                    }
                    className="px-2 py-1 text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                    {student.remarks ? 'Edit' : 'Add'} Remarks
                </button>
            </td>
        </tr>
    );

    // Mock 2 Table Columns
    const renderMock2Row = (student, index) => (
        <tr
            key={student._id}
            className={`border-b transition-colors ${
                index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
            } hover:bg-indigo-50`}
        >
            <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-white">
                {student.rollno}
            </td>
            <td className="px-4 py-3 text-sm text-gray-700">{student.name}</td>
            <td className="px-4 py-3 text-sm text-gray-700">{student.section}</td>
            <td className="px-4 py-3 text-sm text-gray-600">{student.email}</td>
            <td className="px-4 py-3">
                <input
                    type="number"
                    min="0"
                    max="10"
                    value={student.coreConcepts}
                    onChange={(e) =>
                        handleInputChange(
                            student._id,
                            'coreConcepts',
                             e.target.value === '' ? '' : Number(e.target.value)
                        )
                    }
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </td>
            <td className="px-4 py-3">
                <input
                    type="number"
                    min="0"
                    max="10"
                    value={student.programmingAndProblemSolving}
                    onChange={(e) =>
                        handleInputChange(
                            student._id,
                            'programmingAndProblemSolving',
                             e.target.value === '' ? '' : Number(e.target.value)
                        )
                    }
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </td>
            {/* <td className="px-4 py-3">
                <input
                    type="number"
                    min="0"
                    max="10"
                    value={student.programmingSkills}
                    onChange={(e) =>
                        handleInputChange(
                            student._id,
                            'programmingSkills',
                             e.target.value === '' ? '' : Number(e.target.value)
                        )
                    }
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </td> */}
            <td className="px-4 py-3">
                <input
                    type="number"
                    min="0"
                    max="10"
                    value={student.domainExpertise}
                    onChange={(e) =>
                        handleInputChange(
                            student._id,
                            'domainExpertise',
                             e.target.value === '' ? '' : Number(e.target.value)
                        )
                    }
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </td>
            <td className="px-4 py-3">
                <input
                    type="number"
                    min="0"
                    max="10"
                    value={student.hrInteractionSkills}
                    onChange={(e) =>
                        handleInputChange(
                            student._id,
                            'hrInteractionSkills',
                             e.target.value === '' ? '' : Number(e.target.value)
                        )
                    }
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </td>
            <td className="px-4 py-3 text-sm font-semibold text-indigo-600">
                {calculateTotal2(student)}
            </td>
            <td className="px-4 py-3">
                <button
                    onClick={() =>
                        setExpandedRemarksId(
                            expandedRemarksId === student._id ? null : student._id
                        )
                    }
                    className="px-2 py-1 text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                    {student.remarks ? 'Edit' : 'Add'} Remarks
                </button>
            </td>
        </tr>
    );

    return (
        <div className="min-h-screen bg-white p-4 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Mock Evaluation
                </h1>
                <p className="text-gray-600 text-base">
                    Evaluate student performance across mock interviews
                </p>
            </div>

            {/* Success Message */}
            {saveMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm animate-fade-in">
                    {saveMessage}
                </div>
            )}

            {/* Mock Switcher Tabs */}
           <div className="flex items-center justify-between">
             <div className="mb-8 flex gap-3">
                {[1, 2].map((mockNum) => (
                    <button
                        key={mockNum}
                        onClick={() => {
                            setActiveMock(mockNum);
                            setExpandedRemarksId(null);
                            setSaveMessage(null);
                        }}
                        className={`px-6 py-2 font-medium rounded-lg transition-all duration-200 ${
                            activeMock === mockNum
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Mock Evaluator {mockNum}
                    </button>
                ))}
            </div>

              <div className="mb-5 flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className={`px-8 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                        loading
                            ? 'bg-indigo-400 text-white cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
                    }`}
                >
                    {loading ? 'Saving...' : `Save Mock Evaluator ${activeMock}`}
                </button>
            </div>
           </div>

            {/* Table Container */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm">
                        {/* Table Header */}
                        <thead className="sticky top-0 bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-white">
                                    Roll No
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                    Section
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                                    Email
                                </th>
                                {activeMock === 1 ? (
                                    <>
                                        <th className="px-4 py-3 text-center font-semibold text-gray-700">
                                            Programming
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold text-gray-700">
                                            Core Concepts
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold text-gray-700">
                                            Problem Solving
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold text-gray-700">
                                            Domain Expertise
                                        </th>
                                    </>
                                ) : (
                                    <>
                                        <th className="px-4 py-3 text-center font-semibold text-gray-700">
                                            Core Concepts
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold text-gray-700">
                                          Programming & Problem Solving
                                        </th>
                                      
                                        <th className="px-4 py-3 text-center font-semibold text-gray-700">
                                            Domain Expertise
                                        </th>
                                        <th className="px-4 py-3 text-center font-semibold text-gray-700">
                                            HR Interaction
                                        </th>
                                    </>
                                )}
                                <th className="px-4 py-3 text-center font-semibold text-indigo-700">
                                    Total
                                </th>
                                <th className="px-4 py-3 text-center font-semibold text-gray-700">
                                    Remarks
                                </th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {currentData.map((student, index) =>
                                activeMock === 1
                                    ? renderMock1Row(student, index)
                                    : renderMock2Row(student, index)
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4 p-4">
                    {currentData.map((student, index) => (
                        <div
                            key={student._id}
                            className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
                        >
                            {/* Header Info */}
                            <div className="border-b border-gray-200 pb-4 mb-4">
                                <p className="text-xs text-gray-600 font-medium">
                                    ROLL NO: {student.rollno}
                                </p>
                                <h3 className="text-base font-semibold text-gray-900 mt-1">
                                    {student.name}
                                </h3>
                                <p className="text-xs text-gray-600 mt-1">{student.email}</p>
                                <p className="text-xs text-gray-600">Section: {student.section}</p>
                            </div>

                            {/* Marks Section */}
                            <div className="space-y-3 mb-4">
                                {activeMock === 1 ? (
                                    <>
                                        {[
                                            {
                                                label: 'Programming',
                                                field: 'programming',
                                            },
                                            { label: 'Core Concepts', field: 'coreConcepts' },
                                            {
                                                label: 'Problem Solving',
                                                field: 'problemSolving',
                                            },
                                            { label: 'Domain Expertise', field: 'domainExpertise' },
                                        ].map(({ label, field }) => (
                                            <div key={field}>
                                                <label className="text-xs font-medium text-gray-700 block mb-1">
                                                    {label}
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="10"
                                                    value={student[field]}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            student._id,
                                                            field,
                                                             e.target.value === '' ? '' : Number(e.target.value)
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        {[
                                            { label: 'Core Concepts', field: 'coreConcepts' },
                                            {
                                                label: 'Programming & Problem Solving',
                                                field: 'programmingAndProblemSolving',
                                            },
                                            { label: 'Domain Expertise', field: 'domainExpertise' },
                                            {
                                                label: 'HR Interaction Skills',
                                                field: 'hrInteractionSkills',
                                            },
                                        ].map(({ label, field }) => (
                                            <div key={field}>
                                                <label className="text-xs font-medium text-gray-700 block mb-1">
                                                    {label}
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="10"
                                                    value={student[field]}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            student.id,
                                                            field,
                                                             e.target.value === '' ? '' : Number(e.target.value)
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </div>
                                        ))}
                                    </>
                                )}

                                {/* Total Marks */}
                                <div className="bg-indigo-50 p-3 rounded-md">
                                    <p className="text-xs font-medium text-gray-600 mb-1">
                                        Total Marks
                                    </p>
                                    <p className="text-lg font-bold text-indigo-600">
                                        {activeMock === 1
                                            ? calculateTotal1(student)
                                            : calculateTotal2(student)}
                                    </p>
                                </div>
                            </div>

                            {/* Remarks Section */}
                            <div>
                                <label className="text-xs font-medium text-gray-700 block mb-2">
                                    Remarks
                                </label>
                                <textarea
                                    value={student.remarks}
                                    onChange={(e) =>
                                        handleInputChange(student._id, 'remarks', e.target.value)
                                    }
                                    placeholder="Add evaluation remarks..."
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Remarks Modal for Desktop */}
              {expandedRemarksId && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    {/* Modal Box */}
    <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative animate-scaleIn">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Remarks for{' '}
          {currentData.find(s => s._id === expandedRemarksId)?.name}
        </h3>
        <button
          onClick={() => setExpandedRemarksId(null)}
          className="text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ✕
        </button>
      </div>

      {/* Textarea */}
      <textarea
        rows="5"
        value={
          currentData.find(s => s._id === expandedRemarksId)?.remarks || ''
        }
        onChange={(e) =>
          handleInputChange(
            expandedRemarksId,
            'remarks',
            e.target.value
          )
        }
        placeholder="Enter evaluation remarks..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
      />

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={() => setExpandedRemarksId(null)}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={() => setExpandedRemarksId(null)}
          className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
        >
          Done
        </button>
      </div>
    </div>
  </div>
)}

            </div>

            {/* Save Button */}
          
        </div>
    );
};

export default MockEvaluator;