import React, { useEffect, useState } from 'react';
import { Menu, X, User, BookOpen, BarChart3, LogOut } from 'lucide-react';
import ProfilePage from '../Profile/ProfilePage';
import AllStudentsMarksPage from '../AllStudentsMarks/AllStudentsMarksPage';
import StudentProfile from './StudentProfile';
import StudentLeaderboard from './StudentLeaderboard';

export default function StudentPage() {
    const [activeSection, setActiveSection] = useState('profile');
    const [sidebarOpen, setSidebarOpen] = useState(false);
     const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Handler function
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array -> run only on mount/unmount

    // Navigation items
    const navItems = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'leaderboard', label: 'Leaderboard', icon: BookOpen },
        { id: 'all-marks', label: 'All Students Marks', icon: BarChart3 },
    ];

    // Render active component
    const renderComponent = () => {
        switch (activeSection) {
            case 'profile':
                return <StudentProfile/>;
            case 'leaderboard':
                return <StudentLeaderboard />;
            case 'all-marks':
                return <AllStudentsMarksPage/>;
            default:
                return <ProfilePage />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile backdrop overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-30 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">PX</span>
                        </div>
                        <h1 className="text-lg font-bold text-gray-900">PerformX</h1>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden text-gray-500 hover:text-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 px-4 py-8 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveSection(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                                    isActive
                                        ? 'bg-indigo-50 text-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                <Icon
                                    size={20}
                                    className={`transition-transform duration-200 ${
                                        isActive ? 'scale-110' : 'group-hover:scale-105'
                                    }`}
                                />
                                <span className="font-medium text-sm">{item.label}</span>
                                {isActive && (
                                    <div className="ml-auto w-1 h-6 bg-indigo-600 rounded-full" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="border-t border-gray-200 p-4">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                        <LogOut size={20} />
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <div className="h-20 bg-white border-b border-gray-200 px-4 md:px-8 flex items-center justify-between">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden text-gray-600 hover:text-gray-900"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="hidden md:block">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {navItems.find((item) => item.id === activeSection)?.label}
                        </h2>
                    </div>
                      {windowWidth<768  ?  <div className="md:hidden">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {navItems.find((item) => item.id === activeSection)?.label}
                        </h2>
                    </div>:(
                    <div>
                    <img src="/KRMU-Logo-NAAC.webp" alt="KRMU-LOGO" width={300} /></div>
                    )
                    }
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <User size={20} className="text-indigo-600" />
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto">
                    <div className="animate-fadeIn">
                        {renderComponent()}
                    </div>
                </div>
            </main>

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
                    animation: fadeIn 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
}