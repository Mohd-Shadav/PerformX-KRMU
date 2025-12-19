import React, { useState,useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios'
import Loader from '../Loader'
import NoResultFound from '../NoResultFound';

/* ---------------- MOCK DATA ---------------- */
// const MOCK_STUDENTS = [
//   {
//     id: 1,
//     rollNo: 'CS001',
//     name: 'Aarav Sharma',
//     section: 'A',
//     email: 'aarav.sharma@edu.com',

//     technical: {
//       mock: 25,
//       oops: 12,
//       dbms: 13,
//       problemSolving: 20,
//       os: 10,
//     },

//     aptitude: {
//       aptitudeTest: 40,
//       cocubes: 42,
//     },

//     totalMarks: 162,
//   },

//   {
//     id: 2,
//     rollNo: 'CS002',
//     name: 'Priya Verma',
//     section: 'B',
//     email: 'priya.verma@edu.com',

//     technical: {
//       mock: 28,
//       oops: 14,
//       dbms: 12,
//       problemSolving: 22,
//       os: 11,
//     },

//     aptitude: {
//       aptitudeTest: 45,
//       cocubes: 46,
//     },

//     totalMarks: 178,
//   },

//   {
//     id: 3,
//     rollNo: 'ME001',
//     name: 'Zara Khan',
//     section: 'A',
//     email: 'zara.khan@edu.com',

//     technical: {
//       mock: 20,
//       oops: 10,
//       dbms: 11,
//       problemSolving: 18,
//       os: 9,
//     },

//     aptitude: {
//       aptitudeTest: 35,
//       cocubes: 38,
//     },

//     totalMarks: 141,
//   },

//   {
//     id: 4,
//     rollNo: 'CS004',
//     name: 'Divya Nair',
//     section: 'C',
//     email: 'divya.nair@edu.com',

//     technical: {
//       mock: 27,
//       oops: 13,
//       dbms: 14,
//       problemSolving: 21,
//       os: 12,
//     },

//     aptitude: {
//       aptitudeTest: 48,
//       cocubes: 47,
//     },

//     totalMarks: 182,
//   },
// ];


/* ---------------- COMPONENT ---------------- */
export default function AllStudentsMarksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  // const [selectedDepartment, setSelectedDepartment] = useState('');
  // const [selectedYear, setSelectedYear] = useState('');
  const [MOCK_STUDENTS,setMockStudent] = useState([]);

  /* Filters */
  const sections = [...new Set(MOCK_STUDENTS.map(s => s.section))];
  // const departments = [...new Set(MOCK_STUDENTS.map(s => s.department))];
  // const years = [...new Set(MOCK_STUDENTS.map(s => s.year))];

  const filteredStudents = useMemo(() => {


    return MOCK_STUDENTS.filter(student => {
      const searchMatch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        searchMatch &&
        (!selectedSection || student.section === selectedSection) 
      
      );
    });
  }, [MOCK_STUDENTS,searchQuery, selectedSection]);


  const fetchAlldata = async () => {
    const res = await axios.get('http://localhost:5000/student/allstudentdata');
const formattedData = res.data.map(student => ({
  id: student._id,
  rollno: student.rollno,
  name: student.name,
  section: student.section,
  email: student.email,
  technicalAssessment: {
    mock: student?.technicalAssessment?.mock,
    dbms: student?.technicalAssessment?.dbms,
    oops: student?.technicalAssessment?.oops,
    problemSolving: student?.technicalAssessment?.problemSolving,
    os: student?.technicalAssessment?.os,
  },
  aptitudeAssessment: {
    aptitudeTest: student?.aptitudeAssessment?.aptitudeTest,
    cocubes: student?.aptitudeAssessment?.cocubesAmcat
  },
  totalMarks: student.totalMarks
}));


  setMockStudent(formattedData);
  
 
  };

useEffect(() => {
  
  fetchAlldata();
},[]);

  return (
    <div className="bg-white  shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-5 animate-fadeIn">
        <h1 className="text-2xl font-bold text-gray-900">All Students</h1>
        <p className="text-sm text-gray-600 mt-1">
          Search, filter and view student records
        </p>
      </div>

      {/* Filters */}
      <div className="px-6 py-6 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Name or Roll No"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Section */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Section
            </label>
            <select
              value={selectedSection}
              onChange={e => setSelectedSection(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">All</option>
              {sections.map(s => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Department */}
          {/* <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={e => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">All</option>
              {departments.map(d => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div> */}

          {/* Year */}
          {/* <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">All</option>
              {years.map(y => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div> */}
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredStudents?.length}</span>{' '}
          students
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              {['Roll No', 'Name', 'Section', 'Email','Technical Assessment','Aptitude Assessment', 'Total Marks'].map(
                h => (
                  <th
                    key={h}
                    colSpan={h==='Technical Assessment' ? 5 : h==='Aptitude Assessment' ? 2 : 1}
                    className={`px-6 py-3 text-xs font-semibold text-gray-700 border-r border-gray-300 uppercase ${h==='Technical Assessment'||h==='Aptitude Assessment' ? 'text-center' : 'text-left'}`}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
               <tr>
              {['', '', '', '', 'Mock(30)','OOPs(15)','DBMS(15)','Problem Solving(25)','Operating System(15)','Aptitude Test(50)','CoCubes/AMCAT(50)',''].map(
                h => (
                  <th
                    key={h}
                    className={`px-6 py-3 text-left text-xs font-semibold  text-gray-100 uppercase bg-gray-700 ${h!==''?'border-r border-l border-gray-500':''}`}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
            <tbody className="divide-y">
          
{MOCK_STUDENTS.length<=0 ? (
  <tr>

<td colSpan={12}>
      <div className="flex items-center justify-center w-full">


<Loader/>
  </div>

</td>
  </tr>
  


            ):filteredStudents.length<=0 ?(
                <tr>

<td colSpan={12}>
      <div className="flex items-center justify-center w-full">


<NoResultFound/>
  </div>

</td>
  </tr>
            ):
            (filteredStudents.map(student => (
            
              <tr key={student._id} className="hover:bg-indigo-50">
                <td className="px-6 py-3 font-medium text-indigo-600">
                  {student.rollno}
                </td>
                <td className="px-6 py-3">{student?.name}</td>
                <td className="px-6 py-3">{student?.section}</td>
                <td className="px-6 py-3">{student?.email}</td>
                <td className="px-6 py-3">{student?.technicalAssessment.mock}</td>
                <td className="px-6 py-3">{student?.technicalAssessment.oops}</td>
                <td className="px-6 py-3">{student?.technicalAssessment.dbms}</td>
                 <td className="px-6 py-3">{student?.technicalAssessment.problemSolving}</td>
               <td className="px-6 py-3">{student?.technicalAssessment.os}</td>
                <td className="px-6 py-3">{student?.aptitudeAssessment.aptitudeTest}</td>
                 <td className="px-6 py-3">{student?.aptitudeAssessment.cocubes}</td>
                 <td className="px-6 py-3">{student?.totalMarks}</td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden p-4 space-y-4">
        {filteredStudents.map(student => (
          <div
            key={student._id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <h3 className="font-bold text-indigo-600">{student.rollNo}</h3>
              <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                {student.section}
              </span>
            </div>
            <p className="font-medium">{student.name}</p>
            <p className="text-sm text-gray-600">{student.department}</p>
            <p className="text-sm text-gray-600">{student.year}</p>
            <div className="mt-3 text-sm text-gray-700">
              <p>{student.email}</p>
              <p>{student.phone}</p>
            </div>
          </div>
        ))}
      </div>

        {/* CSS Animations */}
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out;
                }
                tbody tr {
                    animation: fadeIn 0.5s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
    </div>
  );
}
