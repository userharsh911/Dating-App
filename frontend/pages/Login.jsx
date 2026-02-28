import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { Mail, LockKeyhole, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import userStore from '../store/userStore';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const { LoginAccount } = userStore(state => state);

    const loginSubmit = async (e) => {
        e.preventDefault();
        
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            return toast.error("Invalid email format");
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            return toast.error("Password must contain upper, lower, number & special char");
        }

        try {
            setLoader(true);
            
            await toast.promise(
                LoginAccount({ email, password }).then(() => navigate('/')),
                {
                    loading: 'Finding your matches... ⏳',
                    success: `Welcome back! 😀`,
                    error: 'Error while logging in 🥲',
                }
            );
        } finally {
            setLoader(false);
        }
    }

    return (
        // Subtle romantic gradient background
        <div className='flex justify-center items-center min-h-screen bg-linear-to-br from-primary/10 via-base-200 to-secondary/10 px-4'>
            
            {/* Framer Motion Card Container */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className='card w-full max-w-md bg-base-100 shadow-2xl rounded-[2rem] border border-base-300/50'
            >
                <div className="card-body p-8 sm:p-10">
                    
                    {/* Header Section */}
                    <div className="flex flex-col items-center gap-2 mb-6">
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="bg-primary/10 p-4 rounded-full text-primary"
                        >
                            <Heart size={32} fill="currentColor" />
                        </motion.div>
                        <h2 className="text-3xl font-bold text-base-content mt-2">Welcome Back</h2>
                        <p className="text-base-content/60 text-sm">Log in to find your perfect match</p>
                    </div>

                    {/* Form Section */}
                    <form className="flex flex-col gap-5" onSubmit={loginSubmit}>
                        
                        {/* Email Input */}
                        <div className="form-control flex justify-center">
                            <label className="input input-bordered w-full flex items-center gap-4 rounded-2xl h-14 bg-base-200/50 focus-within:bg-base-100 focus-within:border-primary transition-all">
                                <Mail size={18} className="text-base-content/50" />
                                <input 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    type="email" 
                                    placeholder="Email Address" 
                                    className="grow placeholder:text-base-content/40" 
                                    required 
                                />
                            </label>
                        </div>

                        {/* Password Input */}
                        <div className="form-control flex justify-center">
                            <label className="input input-bordered w-full flex items-center gap-4 rounded-2xl h-14 bg-base-200/50 focus-within:bg-base-100 focus-within:border-primary transition-all">
                                <LockKeyhole size={18} className="text-base-content/50" />
                                <input 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    type="password" 
                                    placeholder="Password" 
                                    className="grow placeholder:text-base-content/40" 
                                    required 
                                />
                            </label>
                        </div>

                        {/* Submit Button */}
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className='btn btn-primary w-full rounded-2xl h-14 text-lg font-semibold mt-2 shadow-lg shadow-primary/30'
                            disabled={loader}
                        >
                            {loader ? (
                                <span className="loading loading-dots loading-md"></span>
                            ) : (
                                "Login"
                            )}
                        </motion.button>
                    </form>

                    {/* Footer */}
                    <div className="divider my-6 text-sm text-base-content/40">OR</div>
                    
                    <p className='text-center text-sm text-base-content/70'>
                        Don't have an account?{' '}
                        <span 
                            onClick={() => navigate('/signup')} 
                            className='text-primary font-bold cursor-pointer hover:underline underline-offset-4 transition-all'
                        >
                            Sign Up
                        </span>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default Login;