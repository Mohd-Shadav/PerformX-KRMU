import React, { useState } from 'react';
import { ChevronDown, Save, AlertCircle } from 'lucide-react';

// ==================== MARKS ENTRY PAGE ====================
const MarksEntryPage = () => {
    // ==================== STATE MANAGEMENT ====================
    const userType = 'technical'; // Can be 'technical' or 'aptitude'
    
    const [filters, setFilters] = useState({
        section: 'A',
        department: 'CS',
        year: '2025'
    });

    const [marks, setMarks] = useState([
        {
            id: 1,
            rollNo: 'CS001',
            name: 'Aditya Kumar',
            section: 'A',
            department: 'CS',
            year: '2024',
            technical: {
                mockInterview: 25,
                oops: 12,
                dbms: 14,
                problemSolving: 20,
                os: 13
            },
            aptitude: {
                aptitudeTest: 45,
                cocubes: 42
            }
        },
        {
            id: 2,
            rollNo: 'CS002',
            name: 'Priya Singh',
            section: 'B',
            department: 'IT',
            year: '2024',
            technical: {
                mockInterview: 28,
                oops: 14,
                dbms: 15,
                problemSolving: 23,
                os: 14
            },
            aptitude: {
                aptitudeTest: 48,
                cocubes: 46
            }
        },
        {
            id: 3,
            rollNo: 'CS003',
            name: 'Rajesh Patel',
            section: 'C',
            department: 'EC',
            year: '2025',
            technical: {
                mockInterview: 22,
                oops: 11,
                dbms: 13,
                problemSolving: 18,
                os: 12
            },
            aptitude: {
                aptitudeTest: 40,
                cocubes: 38
            }
        }
    ]);


    const [filterData,setFilterData]=useState(marks);

    const [saveStatus, setSaveStatus] = useState('');

    // ==================== HANDLERS ====================
    const handleFilterChange = (filterName, value) => {
        
        setFilterData(
            marks.filter(student => 
                (filterName === 'section' ? student.section === value : true) &&
                (filterName === 'department' ? student.department === value : true) &&
                (filterName === 'year' ? student.year === value : true)
            )
        );

    
    };

    const handleMarkChange = (studentId, fieldPath, value) => {
        setMarks(prev =>
            prev.map(student => {
                if (student.id !== studentId) return student;
                
                const [category, field] = fieldPath.split('.');
                return {
                    ...student,
                    [category]: {
                        ...student[category],
                        [field]: Math.min(Math.max(parseInt(value) || 0, 0), 100)
                    }
                };
            })
        );
    };

    const handleSaveMarks = () => {
        setSaveStatus('saving');
        setTimeout(() => {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus(''), 3000);
        }, 800);
    };

    // ==================== FILTERS SECTION ====================
    const FilterBar = () => (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Section Filter */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
                    <select
                        value={filters.section}
                        onChange={(e) => handleFilterChange('section', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white cursor-pointer transition hover:border-gray-400"
                    >
                        <option value="A">Section A</option>
                        <option value="B">Section B</option>
                        <option value="C">Section C</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-10 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>

                {/* Department Filter */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                        value={filters.department}
                        onChange={(e) => handleFilterChange('department', e.target.value)}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                    <select
                        value={filters.year}
                        onChange={(e) => handleFilterChange('year', e.target.value)}
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
                    <span className="font-semibold">Current Role:</span>{' '}
                    {userType === 'technical' ? 'Technical Trainer' : 'Aptitude Trainer'} 
                    {userType === 'technical' 
                        ? ' (Technical assessment fields are editable)'
                        : ' (Aptitude assessment fields are editable)'}
                </p>
            </div>
        </div>
    );

    // ==================== TABLE COMPONENT ====================
    const MarksTable = () => {
        const isEditable = (fieldType) => {
            if (userType === 'technical') return fieldType === 'technical';
            return fieldType === 'aptitude';
        };

        const InputCell = ({ value, onChange, disabled, max = 100 }) => (
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                max={max}
                min="0"
                className={`w-full px-2 py-1.5 text-center text-sm border rounded transition ${
                    disabled
                        ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed'
                        : 'border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent hover:border-indigo-300'
                }`}
            />
        );

        return (
            <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
                {/* Sticky Header */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        {/* Table Header */}
                        <thead>
                            <tr className="bg-gradient-to-r from-indigo-50 to-blue-50 sticky top-0 z-10">
                                {/* Basic Info Headers */}
                                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-300 whitespace-nowrap">Roll No</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-300 whitespace-nowrap">Name</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-300 whitespace-nowrap">Section</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-300 whitespace-nowrap">Department</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-300 whitespace-nowrap">Year</th>

                                {/* Technical Assessment Headers */}
                                <th colSpan="5" className="px-4 py-3 text-center font-semibold text-indigo-700 border-b border-gray-300 bg-indigo-50">
                                    Technical Assessment - 100
                                </th>

                                {/* Aptitude Assessment Headers */}
                                <th colSpan="2" className="px-4 py-3 text-center font-semibold text-blue-700 border-b border-gray-300 bg-blue-50">
                                    Aptitude - 100
                                </th>
                            </tr>

                            {/* Sub-column Headers */}
                            <tr className="bg-gray-50">
                                <th colSpan="5" />
                                {/* Technical Sub-headers */}
                                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700 border-r border-gray-200">MI (30)</th>
                                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700 border-r border-gray-200">OOPs (15)</th>
                                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700 border-r border-gray-200">DBMS (15)</th>
                                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700 border-r border-gray-200">PS (25)</th>
                                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700 border-r border-gray-200">OS (15)</th>
                                {/* Aptitude Sub-headers */}
                                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700 border-r border-gray-200">APT (50)</th>
                                <th className="px-3 py-2 text-center text-xs font-semibold text-gray-700">CoCubes (50)</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {filterData.map((student, idx) => (
                                <tr
                                    key={student.id}
                                    className={`border-b border-gray-200 transition hover:bg-indigo-50 ${
                                        idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                    }`}
                                >
                                    {/* Basic Info Cells */}
                                    <td className="px-4 py-3 text-gray-900 font-medium whitespace-nowrap">{student.rollNo}</td>
                                    <td className="px-4 py-3 text-gray-900 font-medium">{student.name}</td>
                                    <td className="px-4 py-3 text-gray-700">{student.section}</td>
                                    <td className="px-4 py-3 text-gray-700">{student.department}</td>
                                    <td className="px-4 py-3 text-gray-700">{student.year}</td>

                                    {/* Technical Assessment Cells */}
                                    <td className="px-3 py-2 border-r border-gray-200">
                                        <InputCell
                                            value={student.technical.mockInterview}
                                            onChange={(val) => handleMarkChange(student.id, 'technical.mockInterview', val)}
                                            disabled={!isEditable('technical')}
                                            max={30}
                                        />
                                    </td>
                                    <td className="px-3 py-2 border-r border-gray-200">
                                        <InputCell
                                            value={student.technical.oops}
                                            onChange={(val) => handleMarkChange(student.id, 'technical.oops', val)}
                                            disabled={!isEditable('technical')}
                                            max={15}
                                        />
                                    </td>
                                    <td className="px-3 py-2 border-r border-gray-200">
                                        <InputCell
                                            value={student.technical.dbms}
                                            onChange={(val) => handleMarkChange(student.id, 'technical.dbms', val)}
                                            disabled={!isEditable('technical')}
                                            max={15}
                                        />
                                    </td>
                                    <td className="px-3 py-2 border-r border-gray-200">
                                        <InputCell
                                            value={student.technical.problemSolving}
                                            onChange={(val) => handleMarkChange(student.id, 'technical.problemSolving', val)}
                                            disabled={!isEditable('technical')}
                                            max={25}
                                        />
                                    </td>
                                    <td className="px-3 py-2 border-r border-gray-200">
                                        <InputCell
                                            value={student.technical.os}
                                            onChange={(val) => handleMarkChange(student.id, 'technical.os', val)}
                                            disabled={!isEditable('technical')}
                                            max={15}
                                        />
                                    </td>

                                    {/* Aptitude Assessment Cells */}
                                    <td className="px-3 py-2 border-r border-gray-200">
                                        <InputCell
                                            value={student.aptitude.aptitudeTest}
                                            onChange={(val) => handleMarkChange(student.id, 'aptitude.aptitudeTest', val)}
                                            disabled={!isEditable('aptitude')}
                                            max={50}
                                        />
                                    </td>
                                    <td className="px-3 py-2">
                                        <InputCell
                                            value={student.aptitude.cocubes}
                                            onChange={(val) => handleMarkChange(student.id, 'aptitude.cocubes', val)}
                                            disabled={!isEditable('aptitude')}
                                            max={50}
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
            {saveStatus === 'saved' && (
                <div className="text-sm text-green-700 font-medium animate-fade-in">
                    ✓ Marks saved successfully
                </div>
            )}
            <button
                onClick={handleSaveMarks}
                disabled={saveStatus === 'saving'}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition ${
                    saveStatus === 'saving'
                        ? 'bg-indigo-400 text-white cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-md hover:shadow-lg'
                }`}
            >
                <Save className="w-5 h-5" />
                {saveStatus === 'saving' ? 'Saving...' : 'Save Marks'}
            </button>
        </div>
    );

    // ==================== MAIN RENDER ====================
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Marks Entry</h1>
                <p className="text-gray-600 mt-2">Enter and manage student assessment marks</p>
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