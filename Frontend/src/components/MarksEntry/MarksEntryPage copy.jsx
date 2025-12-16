import React, { useEffect, useState } from "react";
import { ChevronDown, Save, AlertCircle } from "lucide-react";
import axios from "axios";
import { useLayoutEffect } from "react";

// ==================== MARKS ENTRY PAGE ====================
const MarksEntryPage = () => {
  // ==================== STATE MANAGEMENT ====================
  const data = JSON.parse(localStorage.getItem("USER"));

  const userType = data?.role;
  
  const [filters, setFilters] = useState({
    section: "Section A",
  
  });

  const [marks, setMarks] = useState([]);

  const [filterData, setFilterData] = useState(marks);

  const [saveStatus, setSaveStatus] = useState("");

  // ==================== HANDLERS ====================
const handleFilterChange = (filterName, value) => {
  setFilters(prev => ({
    ...prev,
    [filterName]: value,
  }));
};


 
  
// const handleMarkChange = (studentId, field, value) => {
//   setMarks(prev =>
//     prev.map(student => {
//       if (student._id !== studentId) return student;
    

//       if (student?.technicalAssessment?.hasOwnProperty(field)) {
//         return {
//           ...student,
//           technicalAssessment: {
//             ...student.technicalAssessment,
//             [field]: value,
//           },
//         };
//       }

//       if (student.aptitudeAssessment?.hasOwnProperty(field)) {
//         return {
//           ...student,
//           aptitudeAssessment: {
//             ...student.aptitudeAssessment,
//             [field]: value, 
//           },
//         };
//       }

//       return student;
//     })
//   );
//   console.log(marks,"line 63")
// };


const handleMarkChange = (studentId, field, value) => {
  console.log(studentId,field,value,"line 69")
  setMarks(prev =>
    prev.map(student => {

      if (student._id !== studentId) {
        return student;
      }

      if (student?.technicalAssessment?.hasOwnProperty(field)) {
        return {
          ...student,
          technicalAssessment: {
            ...student.technicalAssessment,
            [field]: Number(value),
          },
        };
      }

      if (student?.aptitudeAssessment?.hasOwnProperty(field)) {
        return {
          ...student,
          aptitudeAssessment: {
            ...student.aptitudeAssessment,
            [field]: Number(value),
          },
        };
      }

      return student;
    })
  );
};


  const handleSaveMarks = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 3000);
    }, 800);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get(
          "http://localhost:5000/student/allstudentdata"
        );


        if (res.status === 200) {
          setMarks(res.data);
          setFilterData(res.data);
        }
      } catch (err) {
        alert("Something Went Wrong");
      }
    };

    fetchData();
  }, []);


const filteredStudents = React.useMemo(() => {
  return marks?.filter(student =>
    student.section === filters.section 
  
  );
}, [marks, filters]);


  // ==================== FILTERS SECTION ====================
  const FilterBar = () => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Section Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section
          </label>
          <select
            value={filters.section}
            onChange={(e) => handleFilterChange("section", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white cursor-pointer transition hover:border-gray-400"
          >
            <option value="Section A">Section A</option>
            <option value="Section B">Section B</option>
            <option value="Section C">Section C</option>
          </select>
          <ChevronDown className="absolute right-3 top-10 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>

        {/* Department Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department
          </label>
          <select
            value={filters.department}
            onChange={(e) => handleFilterChange("department", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white cursor-pointer transition hover:border-gray-400"
          >
            <option value="CS">Computer Science</option>
            <option value="IT">Information Technology</option>
            <option value="EC">Electronics</option>
          </select>
          <ChevronDown className="absolute right-3 top-10 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>

        {/* Year Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <select
            value={filters.year}
            onChange={(e) => handleFilterChange("year", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white cursor-pointer transition hover:border-gray-400"
          >
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
          <ChevronDown className="absolute right-3 top-10 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* User Role Info */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Current Role:</span>{" "}
          {userType === "Technical Trainer"
            ? "Technical Trainer"
            : "Aptitude Trainer"}
          {userType === "Technical Trainer"
            ? " (Technical assessment fields are editable)"
            : " (Aptitude assessment fields are editable)"}
        </p>
      </div>
    </div>
  );

  // ==================== TABLE COMPONENT ====================
  const MarksTable = () => {
    const isEditable = (fieldType) => {
      if (userType === "Technical Trainer")
        return fieldType === "Technical Trainer";
      return fieldType === "Aptitude Trainer";
    };

    //       const InputCell = ({ value, onChange, disabled, max }) => (
    //   <input
    //     type="number"
    //     value={value ?? ''}
    //     onChange={(e) => onChange(e.target.value)}
    //     disabled={disabled}
    //     min="0"
    //     max={max}
    //     className={`w-full px-2 py-1.5 text-center text-sm border rounded transition appearance-none
    //       ${
    //         disabled
    //           ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed'
    //           : 'border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500'
    //       }`}
    //   />
    // );
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
        {/* Sticky Header */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            {/* Table Header */}
            <thead>
              <tr className="bg-gradient-to-r from-indigo-50 to-blue-50 sticky top-0 z-10">
                {/* Basic Info Headers */}
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-300 whitespace-nowrap">
                  Roll No
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-300 whitespace-nowrap">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-300 whitespace-nowrap">
                  Section
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-300 whitespace-nowrap">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-300 whitespace-nowrap">
                  Year
                </th>

                {/* Technical Assessment Headers */}
                <th
                  colSpan="5"
                  className="px-4 py-3 text-center font-semibold text-indigo-700 border-b border-gray-300 bg-indigo-50"
                >
                  Technical Assessment - 100
                </th>

                {/* Aptitude Assessment Headers */}
                <th
                  colSpan="2"
                  className="px-4 py-3 text-center font-semibold text-blue-700 border-b border-gray-300 bg-blue-50"
                >
                  Aptitude - 100
                </th>
              </tr>

              {/* Sub-column Headers */}
              <tr className="bg-gray-50">
                <th colSpan="5" />
                {/* Technical Sub-headers */}
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700 border-r border-gray-200 ">
                  MI(30)
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700 border-r border-gray-200 ">
                  OOPs (15)
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700 border-r border-gray-200 ">
                  DBMS (15)
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700 border-r border-gray-200 ">
                  PS (25)
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700 border-r border-gray-200 ">
                  OS (15)
                </th>
                {/* Aptitude Sub-headers */}
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700 border-r border-gray-200 ">
                  APT (50)
                </th>
                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">
                  CoCubes (50)
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filterData.map((student, idx) => (
                <tr
                  key={student._id}
                  className={`border-b border-gray-200 transition hover:bg-indigo-50 ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {/* Basic Info Cells */}
                  <td className="px-4 py-3 text-gray-900 font-medium whitespace-nowrap">
                    {student?.rollno}
                  </td>
                  <td className="px-4 py-3 text-gray-900 font-medium">
                    {student?.name}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {student?.section}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{student?.email}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {student?.section}
                  </td>

                  {/* Technical Assessment Cells */}
                  <td className="px-3 py-2 border-r border-gray-200">
                    <input
                      type="number"
                      value={student?.technicalAssessment.mock ?? ""}
                      onChange={(e) =>
                        handleMarkChange(student._id, "mock", e.target.value)
                      }
                      min={0}
                      max={30}
                      className={`w-full px-2 py-1.5 text-center text-sm border rounded transition appearance-none
      ${
        !student?.role == "Technical Trainer"
        // student?.role !== "Technical Trainer"
          ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
          : "border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500"
      }`}
                    />
                  </td>
                  <td className="px-3 py-2 border-r border-gray-200">
                    <input
                      type="number"
                      value={student.technicalAssessment.oops ?? ""}
                      onChange={(e) =>
                        handleMarkChange(student._id, "oops", e.target.value)
                      }
                      min={0}
                      max={15}
                      className={`w-full px-2 py-1.5 text-center text-sm border rounded transition appearance-none
      ${
        !student?.role === "Technical Trainer"
          ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
          : "border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500"
      }`}
                    />
                  </td>
                  <td className="px-3 py-2 border-r border-gray-200">
                    <input
                      type="number"
                      value={student.technicalAssessment.dbms ?? ""}
                      onChange={(e) =>
                        handleMarkChange(student._id, "dbms", e.target.value)
                      }
                      min={0}
                      max={15}
                      className={`w-full px-2 py-1.5 text-center text-sm border rounded transition appearance-none
      ${
        !student?.role === "Technical Trainer"
          ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
          : "border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500"
      }`}
                    />
                  </td>
                  <td className="px-3 py-2 border-r border-gray-200">
                    <input
                      type="number"
                      value={student.technicalAssessment.problemSolving ?? ""}
                      onChange={(e) =>
                        handleMarkChange(
                          student._id,
                          "problemSolving",
                          e.target.value
                        )
                      }
                      min={0}
                      max={25}
                      className={`w-full px-2 py-1.5 text-center text-sm border rounded transition appearance-none
      ${
        !student?.role === "Technical Trainer"
          ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
          : "border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500"
      }`}
                    />
                  </td>
                  <td className="px-3 py-2 border-r border-gray-200">
                    <input
                      type="number"
                      value={student.technicalAssessment.os ?? ""}
                      onChange={(e) =>
                        handleMarkChange(student._id, "os", e.target.value)
                      }
                      min={0}
                      max={15}
                      className={`w-full px-2 py-1.5 text-center text-sm border rounded transition appearance-none
      ${
        !student?.role === "Technical Trainer"
          ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
          : "border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500"
      }`}
                    />
                  </td>

                  {/* Aptitude Assessment Cells */}
                  <td className="px-3 py-2 border-r border-gray-200">
                    <input
                      type="number"
                      value={student.aptitudeAssessment.aptitudeTest ?? ""}
                      onChange={(e) =>
                        handleMarkChange(
                          student._id,
                          "aptitudeTest",
                          e.target.value
                        )
                      }
                      min={0}
                      max={30}
                      className={`w-full px-2 py-1.5 text-center text-sm border rounded transition appearance-none
      ${
        student?.role !== "Technical Trainer"
          ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
          : "border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500"
      }`}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      value={student.aptitudeAssessment.cocubesAmcat ?? ""}
                      onChange={(e) =>
                        handleMarkChange(
                          student._id,
                          "cocubesAmcat",
                          e.target.value
                        )
                      }
                      min={0}
                      max={50}
                      className={`w-full px-2 py-1.5 text-center text-sm border rounded transition appearance-none
      ${
        student?.role !== "Technical Trainer"
          ? "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
          : "border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500"
      }`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ==================== SAVE BUTTON SECTION ====================
  const SaveSection = () => (
    <div className="mt-6 flex items-center justify-end gap-3">
      {saveStatus === "saved" && (
        <div className="text-sm text-green-700 font-medium animate-fade-in">
          ✓ Marks saved successfully
        </div>
      )}
      <button
        onClick={handleSaveMarks}
        disabled={saveStatus === "saving"}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition ${
          saveStatus === "saving"
            ? "bg-indigo-400 text-white cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-md hover:shadow-lg"
        }`}
      >
        <Save className="w-5 h-5" />
        {saveStatus === "saving" ? "Saving..." : "Save Marks"}
      </button>
    </div>
  );

  // ==================== MAIN RENDER ====================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Marks Entry
        </h1>
        <p className="text-gray-600 mt-2">
          Enter and manage student assessment marks
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <FilterBar />
        <MarksTable />
        <SaveSection />
      </div>

      {/* Tailwind Animation */}
      <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-in;
                }
            `}</style>
    </div>
  );
};

export default MarksEntryPage;
