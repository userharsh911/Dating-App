import React, { useEffect, useState } from 'react';
import { Mail, LockKeyhole, CalendarDays, MapPin, User, Ruler, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import userStore from '../store/userStore';
import ConnectingHeartsCard from './SIdeComponent/ConnectingHeartsCard'; // Make sure this path is correct

const SignupForm = () => {
    const { SignUpAccount, user, UpdateUserProfile, LoginAccount } = userStore(state => state);
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            name: user?.name || "",
            age: user?.age || 20,
            height: user?.height || "",
            branch: user?.branch || "",
            location: user?.location || "",
        }
    });
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [selectedGender, setSelectedGender] = useState(null);

    const onSubmit = async (data) => {
        const { name, branch, height, location, age, email, password } = data;
        
        if (!/^[A-Za-z]{3,}(?: [A-Za-z]+)*$/.test(name)) {
            return toast.error("Please enter a valid full name");
        }
        if (!user && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
            return toast.error("Invalid email address");
        }
        if (!user && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            return toast.error("Password must contain upper, lower, number & special char");
        }
        if (age < 14 || age > 30) {
            return toast.error("Age must be between 14 and 30");
        }
        if (!["Male", "Female", "Spectrum"].includes(selectedGender)) {
            return toast.error("Please select your gender");
        }

        try {
            setLoader(true);
            if (!user) {
                await toast.promise(
                    SignUp  ({ name, email, password, age, gender: selectedGender }).then(() => {
                        return LoginAccount({ email, password }).then(() => navigate('/'));
                    }),
                    {
                        loading: 'Creating your profile... ⏳',
                        success: 'Welcome aboard! 😀',
                        error: 'Error while creating account 🥲',
                    }
                );
            } else {
                await toast.promise(
                    UpdateUserProfile({ name, age, gender: selectedGender, location, branch, height }),
                    {
                        loading: 'Updating profile... ⏳',
                        success: 'Profile updated successfully 😀',
                        error: 'Error while updating 🥲',
                    }
                );
                document.getElementById("my_modal_7")?.click();
            }
        } catch (error) {
            toast.error(error || "Something went wrong");
        } finally {
            setLoader(false);
        }
    }

    const formValues = watch();

    useEffect(() => {
        if (user?.gender) {
            setSelectedGender(user.gender);
        }
    }, [user?.gender]);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <div className="hero-content h-screen py-10 md:py-0 overflow-y-auto flex-col gap-10 lg:gap-16 lg:flex-row-reverse bg-base-200/50">
            
            {/* Side Card */}
            <div className={` ${user ? 'hidden' : 'flex'} flex-1 w-full justify-center lg:justify-start`}>
                <ConnectingHeartsCard />
            </div>

            {/* Form Section */}
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100 rounded-[2rem] border border-base-300/50 my-10"
            >
                <div className="card-body p-8">
                    <div className="mb-2">
                        <h2 className="text-2xl font-bold text-base-content">
                            {user ? 'Edit Profile' : 'Create Account'}
                        </h2>
                        {!user && (
                            <p className='text-sm text-base-content/60 mt-1'>
                                Already a member?{' '}
                                <span onClick={() => navigate('/login')} className='text-primary font-bold cursor-pointer hover:underline transition-all'>
                                    Sign In
                                </span>
                            </p>
                        )}
                    </div>

                    <motion.form 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col gap-4 mt-4" 
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <motion.div variants={itemVariants} className="form-control">
                            <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 bg-base-200/50 focus-within:bg-base-100 focus-within:border-primary transition-all">
                                <User size={18} className="text-base-content/50" />
                                <input {...register("name")} type="text" placeholder="Full Name" className="grow placeholder:text-base-content/40" required />
                            </label>
                        </motion.div>

                        {!user && (
                            <motion.div variants={itemVariants} className="form-control">
                                <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 bg-base-200/50 focus-within:bg-base-100 focus-within:border-primary transition-all">
                                    <Mail size={18} className="text-base-content/50" />
                                    <input {...register("email", { required: true })} type="email" placeholder="Email Address" className="grow placeholder:text-base-content/40" />
                                </label>
                            </motion.div>
                        )}

                        {!user && (
                            <motion.div variants={itemVariants} className="form-control">
                                <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 bg-base-200/50 focus-within:bg-base-100 focus-within:border-primary transition-all">
                                    <LockKeyhole size={18} className="text-base-content/50" />
                                    <input {...register("password", { required: true })} type="password" placeholder="Password" className="grow placeholder:text-base-content/40" />
                                </label>
                            </motion.div>
                        )}

                        <motion.div variants={itemVariants} className="form-control px-2 mt-2">
                            <div className="flex items-center gap-4 w-full">
                                <CalendarDays size={18} className="text-base-content/50" />
                                <div className="flex-grow flex flex-col">
                                    <div className="flex justify-between text-xs text-base-content/60 mb-2">
                                        <span>Age</span>
                                        <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">{formValues.age} yrs</span>
                                    </div>
                                    <input {...register("age")} type="range" min={14} max={30} className="range range-xs range-primary" required />
                                </div>
                            </div>
                        </motion.div>

                        {user && (
                            <>
                                <motion.div variants={itemVariants} className="form-control">
                                    <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 bg-base-200/50 focus-within:bg-base-100 focus-within:border-primary transition-all">
                                        <MapPin size={18} className="text-base-content/50" />
                                        <input {...register("location")} type="text" placeholder="Location" className="grow placeholder:text-base-content/40" />
                                    </label>
                                </motion.div>

                                <motion.div variants={itemVariants} className="form-control">
                                    <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 bg-base-200/50 focus-within:bg-base-100 focus-within:border-primary transition-all">
                                        <Ruler size={18} className="text-base-content/50" />
                                        <input {...register("height")} type="number" placeholder="Height (cm)" className="grow placeholder:text-base-content/40" />
                                    </label>
                                </motion.div>

                                <motion.div variants={itemVariants} className="form-control">
                                    <label className="input input-bordered flex items-center gap-4 rounded-2xl h-14 bg-base-200/50 focus-within:bg-base-100 focus-within:border-primary transition-all">
                                        <GraduationCap size={18} className="text-base-content/50" />
                                        <input {...register("branch")} type="text" placeholder="Course / Branch" className="grow placeholder:text-base-content/40" />
                                    </label>
                                </motion.div>
                            </>
                        )}

                        <motion.div variants={itemVariants} className="form-control mt-2">
                            <p className='text-sm text-base-content/70 mb-3 px-1'>I identify as:</p>
                            <div className="flex gap-2 flex-wrap">
                                {['Male', 'Female', 'Spectrum'].map((gender) => (
                                    <button
                                        key={gender}
                                        type="button"
                                        onClick={() => setSelectedGender(gender)}
                                        className={`btn flex-1 rounded-2xl h-12 transition-all ${
                                            selectedGender === gender 
                                                ? 'btn-primary shadow-md shadow-primary/30' 
                                                : 'btn-outline border-base-300 hover:bg-base-200 hover:border-base-300'
                                        }`}
                                    >
                                        {gender}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="form-control mt-6">
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                className="btn btn-primary w-full rounded-2xl h-14 text-lg font-semibold shadow-lg shadow-primary/30"
                                disabled={loader}
                            >
                                {loader ? (
                                    <span className="loading loading-dots loading-md"></span>
                                ) : (
                                    user ? 'Save Changes' : 'Sign Up'
                                )}
                            </motion.button>
                        </motion.div>
                    </motion.form>
                </div>
            </motion.div>
        </div>
    );
}

export default SignupForm;