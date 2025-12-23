import React, { useEffect, useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';

const Login = ({setRole}) => {


    const [windowWidth,setWindowWidth] = useState(window.innerWidth);

    const [formData,setFormData] = useState({
        email:'',
        password:'',
        role:'student'

    })

    const handleChange = (e)=>{
        const {name,value} = e.target;

        setFormData(prev=>({...prev,[name]:value}))

    }

    const loginData = async(e)=>{
        e.preventDefault();
       
        let res = await axios.post('http://localhost:5000/api/auth',formData,{
            headers:{
                "Content-Type":"application/json"
            }
        })

        if(res.status===200)
        {
            localStorage.setItem("USER",JSON.stringify(res.data))
            setRole(res.data.role)
        }else{
             localStorage.setItem("USER","")
        }


        
    }

    useEffect(()=>{
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

        
    },[])


    return (
        <div className="flex md:flex-row h-screen">
            {/* Left Side */}
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-8">

            <div className="mb-10 self-center">
                <img src="/KRMU-Logo-NAAC.jpg" alt="KRMU-Logo" className={`w-100 `}/>
            </div>
                <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                <p className="text-gray-600 mb-6">Staff & Student Login Portal</p>
                <form className="w-full max-w-sm">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name='email' value={formData.email} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="you@example.com" aria-label="Email" required  onChange={handleChange}/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name='password' value={formData.password} className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="••••••••" aria-label="Password" required onChange={handleChange} />
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition duration-200 cursor-pointer" onClick={loginData}>Login</button>
                </form>
            </div>

            {/* Right Side */}
            {windowWidth >= 768 &&
            <div className={`relative w-full md:w-1/2 bg-cover bg-center ${styles["background-image-login"]}`}>
                  <div className="absolute inset-0 bg-black/60"></div>
                <div className="flex flex-col justify-center items-center h-full text-white text-center p-8 relative z-10">
                    <h2 className="text-4xl font-bold mb-2 animate-fade-in ">Assessment Evaluation System</h2>
                    <p className="text-lg mb-4 animate-fade-in">Streamlined access for staff and students</p>
                    {/* Optional: Add subtle 3D floating shapes or GSAP animation here */}
                </div>
            </div>
}
        </div>
    );
};

export default Login;