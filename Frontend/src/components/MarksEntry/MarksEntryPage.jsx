import React, { useState, useMemo } from 'react';
import { ChevronDown, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';
import axios from 'axios';




const MarksEntryPage = () => {
  
  const [mockStudents,setMockStudents] = useState([])
  const [students, setStudents] = useState([]);
  const [selectedSection, setSelectedSection] = useState('All');
  const userType = JSON.parse(localStorage.getItem("USER"))
  const [section,setSection] = useState([])

  const [userRole] = useState(userType.role); 
  const [saveStatus, setSaveStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter students by section
  const filteredStudents = useMemo(() => {
    if (selectedSection === 'All') return students;
    return students.filter((s) => s.section === selectedSection);
  }, [students, selectedSection]);

 
 const fetchStudentData = async () => {


  try {
    const res = await axios.get(
      `http://localhost:5000/student/allstudentdata`
    );

    if (res.status === 200) {
      setStudents(prev => {
        const updated = [...prev, ...res.data];
        setSection([...new Set(updated.map(s => s.section))]);
        return updated;
      });

   
    }
  } catch (err) {
    console.error(err);
  } 
};

  useEffect(()=>{


    fetchStudentData()

  },[saveStatus])







  // Handle input change
const handleInputChange = (e, studentId) => {
  
  const { name, value } = e.target;

  setStudents((prev) =>
    prev.map((student) => {
      if (student._id !== studentId) return student;

      // TECHNICAL
      if (student?.technicalAssessment?.hasOwnProperty(name)) {
        return {
          ...student,
          technicalAssessment: {
            ...student.technicalAssessment,
            [name]: value === '' ? '' : Number(value),
          },
        };
      }

      // APTITUDE
      if (student.aptitudeAssessment?.hasOwnProperty(name)) {
        return {
          ...student,
          aptitudeAssessment: {
            ...student.aptitudeAssessment,
            [name]: value === '' ? '' : Number(value),
          },
        };
      }

      return student;
    })
  );
};


  // Check if field is editable
  const isFieldEditable = (field) => {
    const technicalFields = [
      'mock',
      'oops',
      'dbms',
      'problemSolving',
      'os',
    ];
    const aptitudeFields = ['aptitudeTest', 'cocubes'];

    if (userRole === 'Technical Trainer') {
      return technicalFields.includes(field);
    } else {
      return aptitudeFields.includes(field);
    }
  };

  // Save marks handler
  const handleSaveMarks = async () => {
    setIsLoading(true);
    setSaveStatus(null);
   

    let isValid = students.every((student) => {
     
      return student.technicalAssessment.mock <= 40 &&
             student.technicalAssessment.oops <= 15 &&
             student.technicalAssessment.dbms <= 15 &&
             student.technicalAssessment.problemSolving <= 20 &&
             student.technicalAssessment.os <= 10 &&
             student.aptitudeAssessment.aptitudeTest <= 50 &&
             student.aptitudeAssessment.cocubesAmcat <= 50
      
    });

  


    if(isValid){
    try{
      let res = await axios.put('http://localhost:5000/trainer/updatemarks',students,{
        headers:{
          "Content-Type":"application/json"
        }
      })

    

    }catch(err){
      alert('Error in saving marks. Please try again.')

    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 4000);
   
    }, 1500);
  }
else{
    setTimeout(() => {
      setIsLoading(false);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 4000);
   
    }, 1500);
 
}


  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-8 sm:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Marks Entry</h1>
        <p className="mt-2 text-base text-gray-600">
          Enter and manage student assessment marks
        </p>


      </div>

      {/* Main Content */}
      <div className="px-6 py-8 sm:px-8">
        {/* Filter Section */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold text-gray-700">
              Filter by Section:
            </label>
            <div className="relative">
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-700 transition duration-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              >

                {/* {
                  section.map((sec)=>(
                    <option key={sec} value={sec}>{`Section ${sec}`}</option>
                  ))
                } */}
                <option value="All">All Sections</option>
                <option value="SectionA">Section A</option>
                <option value="SectionB">Section B</option>
                <option value="SectionC">Section C</option>
                <option value="SectionD">Section D</option>
                 <option value="SectionE">Section E</option>
                <option value="SectionF">Section F</option>
                <option value="SectionG">Section G</option>
            
                
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
        </div>

        {/* Save Status */}
         <div className="my-8 flex justify-end">
          <button
            onClick={handleSaveMarks}
            disabled={isLoading}
            className="flex items-center gap-2 cursor-pointer rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:opacity-75"
          >
            <Save className="h-5 w-5" />
            {isLoading ? 'Saving...' : 'Save Marks'}
          </button>
        </div>
        {saveStatus === 'success' ? (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 fixed top-25 right-10">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-green-800">
              Marks saved successfully!
            </p>
          </div>
        ):saveStatus==='error' && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 fixed top-25 right-10">
            <CheckCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm font-medium text-red-800">
              Error : Marks exceed maximum allowed values.
            </p>
          </div>
        )}

        {/* Table Container */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">

 
          <table className="w-full text-sm">
            {/* Header Row 1 - Main Columns */}
            <thead>
              <tr className="border-b border-gray-200 bg-indigo-50">
                <th className="sticky left-0 z-10 bg-indigo-50 px-4 py-3 text-left font-semibold text-gray-900">
                  Roll No
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900">
                  Section
                </th>
                <th
                  colSpan="5"
                  className="border-l border-gray-300 bg-indigo-100 px-4 py-3 text-center font-semibold text-gray-900"
                >
                  Technical Assessment (100)
                </th>
                <th
                  colSpan="2"
                  className="border-l border-gray-300 bg-blue-100 px-4 py-3 text-center font-semibold text-gray-900"
                >
                  Aptitude Assessment (100)
                </th>
                <th className="border-l border-gray-300 px-4 py-3 text-center font-semibold text-gray-900">
                  Total
                </th>
              </tr>

              {/* Header Row 2 - Sub Columns */}
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="sticky left-0 z-10 bg-gray-50 px-4 py-2 text-left font-medium text-gray-700"></th>
                <th className="px-4 py-2 text-left font-medium text-gray-700"></th>
                <th className="px-4 py-2 text-left font-medium text-gray-700"></th>
                <th className="px-4 py-2 text-left font-medium text-gray-700"></th>
                <th className="border-l border-gray-300 px-4 py-2 text-center font-medium text-gray-700">
                  Mock Interview (40)
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-700">
                  OOPs (15)
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-700">
                  DBMS (15)
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-700">
                  Problem Solving (20)
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-700">
                  OS (10)
                </th>
                <th className="border-l border-gray-300 px-4 py-2 text-center font-medium text-gray-700">
                  Aptitude Test (50)
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-700">
                  CoCubes (50)
                </th>
                <th className="border-l border-gray-300 px-4 py-2 text-center font-medium text-gray-700">
                  (out of 200)
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>

              

              {filteredStudents.map((student, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-gray-200 transition duration-150 hover:bg-indigo-50 ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  {/* Roll No */}
                  <td className="sticky left-0 z-10 bg-inherit px-4 py-3 font-medium text-gray-900">
                    {student?.rollno}
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3 text-gray-900">{student?.name}</td>

                  {/* Email */}
                  <td className="px-4 py-3 text-gray-600">{student?.email}</td>

                  {/* Section */}
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {student?.section}
                  </td>

                  {/* Technical Fields */}
                  <td className="border-l border-gray-300 px-4 py-3 text-center">
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={student?.technicalAssessment?.mock}
                      name='mock'
                      onChange={(e) => handleInputChange(e, student._id)}
                      disabled={true}
                      className={`w-16 rounded border px-2 py-1 text-center text-sm transition duration-200 border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed `}
                    />
                  </td>

                  <td className="px-4 py-3 text-center">
                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={student?.technicalAssessment?.oops}
                     name='oops'
                     onChange={(e) => handleInputChange(e, student._id)}
                      disabled={!isFieldEditable('oops')}
                      className={`w-16 rounded border px-2 py-1 text-center text-sm transition duration-200 ${student?.technicalAssessment?.oops>15 && 'text-red-500'} ${
                        isFieldEditable('oops')
                          ? 'border-indigo-300 bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                          : 'border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed'
                      }`}
                    />
                  </td>

                  <td className="px-4 py-3 text-center">
                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={student?.technicalAssessment?.dbms}
                      name='dbms'
                      onChange={(e) => handleInputChange(e, student._id)}
                      disabled={!isFieldEditable('dbms')}
                      className={`w-16 rounded border px-2 py-1 text-center text-sm transition duration-200 ${student?.technicalAssessment?.dbms>15 && 'text-red-500'}  ${
                        isFieldEditable('dbms')
                          ? 'border-indigo-300 bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                          : 'border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed'
                      }`}
                    />
                  </td>

                  <td className="px-4 py-3 text-center">
                    <input
                      type="number"
                      min="0"
                      max="25"
                      value={student?.technicalAssessment?.problemSolving}
                      name='problemSolving'
                     onChange={(e) => handleInputChange(e, student._id)}
                      disabled={!isFieldEditable('problemSolving')}
                      className={`w-16 rounded border px-2 py-1 text-center text-sm transition duration-200 ${student?.technicalAssessment?.problemSolving>20 && 'text-red-500'} ${
                        isFieldEditable('problemSolving')
                          ? 'border-indigo-300 bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                          : 'border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed'
                      }`}
                    />
                  </td>

                  <td className="px-4 py-3 text-center">
                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={student?.technicalAssessment?.os}
                      name='os'
                     onChange={(e) => handleInputChange(e, student._id)}
                      disabled={!isFieldEditable('os')}
                      className={`w-16 rounded border px-2 py-1 text-center text-sm transition duration-200 ${student?.technicalAssessment?.os>10 && 'text-red-500'} ${
                        isFieldEditable('os')
                          ? 'border-indigo-300 bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100'
                          : 'border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed'
                      }`}
                    />
                  </td>

                  {/* Aptitude Fields */}
                  <td className="border-l border-gray-300 px-4 py-3 text-center">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={student?.aptitudeAssessment?.aptitudeTest}
                      name='aptitudeTest'
                     onChange={(e) => handleInputChange(e, student._id)}
                      disabled={!isFieldEditable('aptitudeTest')}
                      className={`w-16 rounded border px-2 py-1 text-center text-sm transition duration-200 ${student?.technicalAssessment?.aptitudeTest>50 && 'text-red-500'} ${
                        isFieldEditable('aptitudeTest')
                          ? 'border-blue-300 bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
                          : 'border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed'
                      }`}
                    />
                  </td>

                  <td className="px-4 py-3 text-center">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={student?.aptitudeAssessment?.cocubesAmcat}
                      name='cocubesAmcat'
                     onChange={(e) => handleInputChange(e, student._id)}
                      disabled={!isFieldEditable('cocubes')}
                      className={`w-16 rounded border px-2 py-1 text-center text-sm transition duration-200 ${student?.aptitudeAssessment?.cocubesAmcat>50&&'text-red-500'}  ${
                        isFieldEditable('cocubes')
                          ? 'border-blue-300 bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'
                          : 'border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed'
                      }`}
                    />
                  </td>

                  {/* Total */}
                  <td className="border-l border-gray-300 px-4 py-3 text-center font-semibold text-indigo-600">
                    {student.totalMarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
              
        </div>

        {/* Save Button */}
        {/* <div className="mt-8 flex justify-end">
          <button
            onClick={handleSaveMarks}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:opacity-75"
          >
            <Save className="h-5 w-5" />
            {isLoading ? 'Saving...' : 'Save Marks'}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default MarksEntryPage;