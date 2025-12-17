import React, { useEffect, useState } from 'react';
import { Mail, Phone, Calendar, BookOpen, Edit2, User, GraduationCap, Hash, School } from 'lucide-react';
import axios from 'axios';

export default function StudentProfile() {
  

    const [studentData,setstudentData] = useState([]);
    const userType = JSON.parse(localStorage.getItem("USER"));

    const fetchStudentData = async(req,res)=>{

        try{
            let res = await axios.get(`http://localhost:5000/student/getstudent/${userType._id}`)

            if(res.status===200)
            {
                setstudentData(res.data);
            }

        }catch(err){
            alert("Something Went Wrong...");
        }
    }

    useEffect(()=>{
        fetchStudentData();

    },[])


    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto animate-fadeIn">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 ">Student Profile</h1>
                    <p className="text-gray-600">View your Curriculam information</p>
                </div>

                {/* Profile Card Section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    {/* Profile Header with Avatar */}
                    <div className="relative bg-gradient-to-r from-indigo-500 to-blue-500 h-32"></div>

                    <div className="px-6 sm:px-8 pb-8">
                        {/* Avatar Section */}
                        <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6 mb-8">
                            <div className="mb-4 sm:mb-0">
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                                    alt="Profile Avatar"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                                />
                            </div>

                            <div className="flex-1">
                                <h2 className="text-3xl font-bold text-gray-900 mb-1">{studentData.name}</h2>
                                <p className="text-indigo-600 font-semibold text-lg">{studentData.section}</p>
                            </div>

                            {/* Edit Button */}
                            {/* <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg self-start sm:self-end">
                                <Edit2 size={18} />
                                Edit Profile
                            </button> */}
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gray-200 my-8"></div>

                        {/* Profile Fields Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Employee ID */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                                <label className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-2 block flex items-center gap-2 mb-2">
                                    <Hash size={16} className="text-indigo-600" />
                                    Roll No.
                                </label>
                                <p className="text-gray-900 text-lg font-medium">{studentData.rollno}</p>
                            </div>

                            {/* Department */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                                <label className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-2 block flex items-center gap-2 mb-2">
                                    <School size={16} className="text-indigo-600" />
                                   Program
                                </label>
                                <p className="text-gray-900 text-lg font-medium">{studentData.program}</p>
                            </div>
                                {/* Email */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                                <label className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2 mb-2">
                                    <GraduationCap size={16} className="text-indigo-600" />
                                    Specialization
                                </label>
                                <p className="text-gray-900 text-lg font-medium break-all">{studentData.specialization ? studentData.specialization.toUpperCase():studentData.specialization}</p>
                            </div>

                            {/* Phone */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                                <label className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2 mb-2">
                                    <User size={16} className="text-indigo-600" />
                                    Role
                                </label>
                                <p className="text-gray-900 text-lg font-medium">{studentData.role ? studentData.role.toUpperCase():studentData.role}</p>
                            </div>

                            {/* Email */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                                <label className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2 mb-2">
                                    <Mail size={16} className="text-indigo-600" />
                                    Email Address
                                </label>
                                <p className="text-gray-900 text-lg font-medium break-all">{studentData.email}</p>
                            </div>

                            {/* Phone */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                                <label className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2 mb-2">
                                    <Phone size={16} className="text-indigo-600" />
                                    Phone Number
                                </label>
                                <p className="text-gray-900 text-lg font-medium">{studentData.phone}</p>
                            </div>

                            {/* Joining Date */}
                            {/* <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300"> */}
                                {/* <label className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2 mb-2">
                                    <Calendar size={16} className="text-indigo-600" />
                                    Joining Date
                                </label>
                                <p className="text-gray-900 text-lg font-medium">{studentData.joiningDate}</p> */}
                            {/* </div> */}

                            {/* Qualifications */}
                            {/* <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                                <label className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-2 flex items-center gap-2 mb-2">
                                    <BookOpen size={16} className="text-indigo-600" />
                                    Qualifications
                                </label>
                                <p className="text-gray-900 text-lg font-medium">{studentData.qualifications}</p>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center text-gray-600 text-sm">
                    <p>Last updated on {new Date().toLocaleDateString()}</p>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </div>
    );
}