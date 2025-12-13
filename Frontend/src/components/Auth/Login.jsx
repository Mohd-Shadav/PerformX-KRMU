import React from 'react';
import styles from './Login.module.css';

const Login = () => {
    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Left Side */}
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-8">
                <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                <p className="text-gray-600 mb-6">Staff & Student Login Portal</p>
                <form className="w-full max-w-sm">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="you@example.com" aria-label="Email" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="••••••••" aria-label="Password" required />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition duration-200 cursor-pointer">Login</button>
                </form>
            </div>

            {/* Right Side */}
            <div className={`relative w-full md:w-1/2 bg-cover bg-center ${styles["background-image-login"]}`}>
                  <div className="absolute inset-0 bg-black/60"></div>
                <div className="flex flex-col justify-center items-center h-full text-white text-center p-8 relative z-10">
                    <h2 className="text-4xl font-bold mb-2 animate-fade-in ">Assessment Evaluation System</h2>
                    <p className="text-lg mb-4 animate-fade-in">Streamlined access for staff and students</p>
                    {/* Optional: Add subtle 3D floating shapes or GSAP animation here */}
                </div>
            </div>
        </div>
    );
};

export default Login;