import React, { useState, useMemo } from 'react';
import { Trophy, TrendingUp } from 'lucide-react';

const StudentLeaderboard = () => {
    // Mock student data with technical and aptitude marks
    const [students] = useState([
        { id: 1, rollNo: 'CS001', name: 'Aarav Sharma', section: 'A', department: 'CS', year: '3rd', technical: 85, aptitude: 88, total: 173 },
        { id: 2, rollNo: 'CS002', name: 'Priya Patel', section: 'A', department: 'CS', year: '3rd', technical: 92, aptitude: 90, total: 182 },
        { id: 3, rollNo: 'EC001', name: 'Rohan Verma', section: 'B', department: 'EC', year: '3rd', technical: 78, aptitude: 85, total: 163 },
        { id: 4, rollNo: 'CS003', name: 'Ananya Singh', section: 'A', department: 'CS', year: '2nd', technical: 88, aptitude: 87, total: 175 },
        { id: 5, rollNo: 'ME001', name: 'Vikram Kumar', section: 'C', department: 'ME', year: '3rd', technical: 75, aptitude: 82, total: 157 },
        { id: 6, rollNo: 'CS004', name: 'Neha Gupta', section: 'B', department: 'CS', year: '2nd', technical: 90, aptitude: 92, total: 183 },
        { id: 7, rollNo: 'EC002', name: 'Arjun Reddy', section: 'B', department: 'EC', year: '3rd', technical: 82, aptitude: 80, total: 162 },
        { id: 8, rollNo: 'CS005', name: 'Divya Nair', section: 'A', department: 'CS', year: '3rd', technical: 87, aptitude: 85, total: 172 },
    ]);

    const [filters, setFilters] = useState({
        section: '',
        department: '',
        year: '',
    });

    // Filter and rank students
    const rankedStudents = useMemo(() => {
  let filtered = students;

  if (filters.section) filtered = filtered.filter(s => s.section === filters.section);
  if (filters.department) filtered = filtered.filter(s => s.department === filters.department);
  if (filters.year) filtered = filtered.filter(s => s.year === filters.year);

  const sorted = [...filtered].sort(
    (a, b) => b.total - a.total || a.name.localeCompare(b.name)
  );

  let prevTotal = null;
  let prevRank = 0;

  return sorted.map((student, index) => {
    let rank;

    if (student.total === prevTotal) {
      rank = prevRank;           // same marks → same rank
    } else {
      rank = index + 1;          // new rank
    }

    prevTotal = student.total;
    prevRank = rank;

    return { ...student, rank };
  });
}, [students, filters]);


    const getPerformanceBadge = (marks) => {
        if (marks >= 180) return { label: 'Excellent', color: 'bg-green-100 text-green-700' };
        if (marks >= 165) return { label: 'Good', color: 'bg-blue-100 text-blue-700' };
        return { label: 'Average', color: 'bg-amber-100 text-amber-700' };
    };

    const getMedalEmoji = (rank) => {
        if (rank === 1) return '🥇';
        if (rank === 2) return '🥈';
        if (rank === 3) return '🥉';
        return null;
    };

    const getRowHighlight = (rank) => {
        if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-transparent';
        if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-transparent';
        if (rank === 3) return 'bg-gradient-to-r from-orange-50 to-transparent';
        return '';
    };

    return (
        <div className="min-h-screen bg-white p-4 md:p-8">
            {/* Header */}
            <div className="mb-8 animate-fadeIn">
                <div className="flex items-center gap-3 mb-2">
                    <Trophy className="w-8 h-8 text-indigo-600 animate-pulse" />
                    <h1 className="text-4xl font-bold text-gray-900">Leaderboard</h1>
                </div>
                <p className="text-gray-600 text-lg">Top performers based on assessment scores</p>
            </div>

            {/* Filters */}
            {/* <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-6 rounded-lg shadow-sm">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Section</label>
                    <select
                        value={filters.section}
                        onChange={(e) => setFilters({ ...filters, section: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    >
                        <option value="">All Sections</option>
                        <option value="A">Section A</option>
                        <option value="B">Section B</option>
                        <option value="C">Section C</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                    <select
                        value={filters.department}
                        onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    >
                        <option value="">All Departments</option>
                        <option value="CS">Computer Science</option>
                        <option value="EC">Electronics</option>
                        <option value="ME">Mechanical</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                    <select
                        value={filters.year}
                        onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    >
                        <option value="">All Years</option>
                        <option value="2nd">2nd Year</option>
                        <option value="3rd">3rd Year</option>
                    </select>
                </div>
            </div> */}

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto shadow-md rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="bg-indigo-600 text-white sticky top-0 z-10">
                            <th className="px-6 py-4 text-left font-semibold">Rank</th>
                            <th className="px-6 py-4 text-left font-semibold">Roll No</th>
                            <th className="px-6 py-4 text-left font-semibold">Name</th>
                            <th className="px-6 py-4 text-left font-semibold">Section</th>
                            <th className="px-6 py-4 text-center font-semibold">Technical</th>
                            <th className="px-6 py-4 text-center font-semibold">Aptitude</th>
                            <th className="px-6 py-4 text-center font-semibold">Total Marks</th>
                            <th className="px-6 py-4 text-center font-semibold">Performance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankedStudents.map((student, index) => {
                            const badge = getPerformanceBadge(student.total);
                            const medal = getMedalEmoji(student.rank);
                            const isTopThree = student.rank <= 3;
                            return (
                                <tr
                                    key={student.id}
                                    className={`border-b border-gray-200 hover:bg-indigo-50 transition duration-300 ease-in-out ${
                                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                    } ${getRowHighlight(student.rank)} ${isTopThree ? 'shadow-sm' : ''}`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <td className="px-6 py-4 font-bold text-indigo-600">
                                        <span className="flex items-center gap-2">
                                            {medal && <span className="text-xl">{medal}</span>}
                                            # {student.rank}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 font-medium">{student.rollNo}</td>
                                    <td className="px-6 py-4 text-gray-900 font-medium">{student.name}</td>
                                    <td className="px-6 py-4 text-gray-700">{student.section}</td>
                                    <td className="px-6 py-4 text-center text-gray-700">{student.technical}</td>
                                    <td className="px-6 py-4 text-center text-gray-700">{student.aptitude}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`font-bold text-lg ${isTopThree ? 'text-indigo-600' : 'text-gray-900'}`}>
                                            {student.total}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badge.color}`}>
                                            {badge.label}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {rankedStudents.map((student, index) => {
                    const badge = getPerformanceBadge(student.total);
                    const medal = getMedalEmoji(student.rank);
                    const isTopThree = student.rank <= 3;
                    return (
                        <div
                            key={student.id}
                            className={`p-5 rounded-xl border-2 transition duration-300 ease-in-out ${
                                isTopThree
                                    ? 'border-indigo-300 bg-gradient-to-r from-indigo-50 to-white shadow-md'
                                    : 'border-gray-200 bg-white shadow-sm hover:shadow-md'
                            }`}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    {medal && <span className="text-3xl">{medal}</span>}
                                    <div>
                                        <p className="text-2xl font-bold text-indigo-600">#{student.rank}</p>
                                        <p className="text-xs text-gray-500">{student.rollNo}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
                                    {badge.label}
                                </span>
                            </div>

                            <div className="space-y-2 mb-3">
                                <p className="text-lg font-bold text-gray-900">{student.name}</p>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>{student.section}</span>
                                    <span>{student.department}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-200">
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 mb-1">Technical</p>
                                    <p className="font-bold text-gray-900">{student.technical}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 mb-1">Aptitude</p>
                                    <p className="font-bold text-gray-900">{student.aptitude}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 mb-1">Total</p>
                                    <p className="font-bold text-indigo-600 text-lg">{student.total}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {rankedStudents.length === 0 && (
                <div className="text-center py-12">
                    <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">No students match the selected filters.</p>
                </div>
            )}

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
};

export default StudentLeaderboard;