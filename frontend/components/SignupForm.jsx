import React, { useEffect, useState } from 'react'
import { Mail, LockKeyhole, CalendarDays, MapPin , User, Ruler, GraduationCap      } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useForm, } from "react-hook-form"
import userStore from '../store/userStore';
import { useNavigate } from 'react-router-dom';
const SignupForm = () => {
    const {SignUpAccount, user, UpdateUserProfile, LoginAccount} = userStore(state=>state);
    const {register, handleSubmit, watch} = useForm({
        defaultValues:{
            name:user?.name,
            age:user?.age,
            height:user?.height,
            branch:user?.branch,
            location:user?.location,

        }
    });
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false);
    const [selectedGender, setSelectedGender] = useState(null); 
      
    const onSubmit = async(data)=>{
        console.log("form data ",data,selectedGender);
        const {name, branch, height, location, age, email, password} = data;
        setLoader(true)
        try {
            if(!/^[A-Za-z]{3,}(?: [A-Za-z]+)*$/.test(name)){
                return toast.error("Invalid name");
            }
            if(!user && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email)){
                return toast.error("Invalid email");
            }
            if(!user && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)){
                return toast.error("try a stronger password");
            }
            if(age <17 || age >= 80){
                return toast.error("invalid age provided");
            }
            console.log("signup data",{name, email, password, age, selectedGender});
            if(!user){
                toast.promise(
                    SignUpAccount({name, email, password, age, gender:selectedGender}).then(()=>{
                        setLoader(false);
                        LoginAccount({email, password}).then(()=>{
                            navigate('/')
                        })

                    }),
                    {
                        loading: 'signing... ⏳',
                        success: 'account created 😀',
                        error: 'Error while creating your account 🥲',
                    }
                )
            }
            if(user){
                toast.promise(
                    UpdateUserProfile({name, age, gender:selectedGender, location, branch, height}).then(()=>{
                        setLoader(false)
                    }),
                    {
                        loading: 'updating... ⏳',
                        success: 'successfully updated 😀',
                        error: 'Error while updating your account 🥲',
                    }
                )
            }
            document.getElementById("my_modal_7").click();
            setLoader(false)
        } catch (error) {
            setLoader(false)
            console.log("error while submitting signup form ",error)
        }
    }
    const formValues = watch();

    useEffect(()=>{
        setSelectedGender(user?.gender);
    },[user?.gender])

return (
    
    <div className="hero-content flex-col gap-16 lg:flex-row-reverse">
        <div className={` ${user && 'hidden' } text-center lg:text-left`}>
            <h1 className="text-5xl font-bold">Connecting Hearts!</h1>
            <p className="py-6">Join our community and find your perfect match today.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
                {!user && <p className='text-end'>
                    Already Member?
                    <span 
                        onClick={()=>navigate('/login')} 
                        className='text-blue-400 cursor-pointer'
                    >
                        sign in
                    </span>
                </p>}
                <div className="form-control">
                    <div className="flex items-center justify-center border-b-2 border-base-300 pb-2 gap-3">
                        <User  size={16} strokeWidth={1} />
                        <input 
                            {...register("name")}
                            type="text" placeholder="John doe" 
                            className="input border-none shadow-none outline-none" 
                            required 
                        />
                    </div>
                </div>
                {!user && <div className="form-control">
                    <div className="flex items-center justify-center border-b-2 border-base-300 pb-2 gap-3">
                        <Mail size={16} strokeWidth={1} />
                        <input 
                            {...register("email",{required:false})}
                            type="email" placeholder="email" 
                            className="input border-none shadow-none outline-none" 
                        />
                    </div>
                </div>}
                {!user && <div className="form-control">
                    <label className="label">
                        
                    </label>
                    <div className="flex items-center justify-center border-b-2 border-base-300 pb-2 gap-3">
                        <LockKeyhole size={16} strokeWidth={1} />
                        <input
                            {...register("password",{required:false})}
                            type="password" placeholder="password" 
                            className="input border-none shadow-none outline-none" 
                        />
                    </div>
                </div>}
                <div className="form-control">
                    <label className="label">
                        
                    </label>
                    <div className="flex items-center justify-center border-b-2 border-base-300 pb-2 gap-3">
                        <CalendarDays  size={16} strokeWidth={1} />
                        <input 
                            {...register("age")}
                            type="range" placeholder="age" 
                            min={14}
                            max={30}
                            className="range range-xs range-neutral" 
                            required

                        />
                        <p>{formValues.age}</p>
                    </div>
                </div>
                {user && <div className="form-control">
                    <label className="label">
                        
                    </label>
                    <div className="flex items-center justify-center border-b-2 border-base-300 pb-2 gap-3">
                        <MapPin size={16} strokeWidth={1} />
                        <input 
                            {...register("location")}
                            type="text" placeholder="location" 
                            className="input border-none shadow-none outline-none"  
                        
                        />
                    </div>
                </div>}
                {user && <div className="form-control">
                    <label className="label">
                        
                    </label>
                    <div className="flex items-center justify-center border-b-2 border-base-300 pb-2 gap-3">
                        <Ruler  size={16} strokeWidth={1} />
                        <input 
                            {...register("height")}
                            type="number" placeholder="height" 
                            className="input border-none shadow-none outline-none"  
                        
                        />
                    </div>
                </div>}
                {user && <div className="form-control">
                    <label className="label">
                        
                    </label>
                    <div className="flex items-center justify-center border-b-2 border-base-300 pb-2 gap-3">
                        <GraduationCap   size={16} strokeWidth={1} />
                        <input 
                            {...register("branch")}
                            type="text" placeholder="Course/Branch" 
                            className="input border-none shadow-none outline-none"  
                        
                        />
                    </div>
                </div>}
                <div className="form-control">
                    <label className="label">
                        
                    </label>
                    <div className="">
                        <p className='pb-6'>Select gender :</p>
                        <div className="filter">
                            <input className="btn filter-reset" onClick={()=>setSelectedGender('')} type="radio" name="metaframeworks" aria-label="All"/>
                            <input className="btn" type="radio" checked={selectedGender=="Male"} onChange={()=>setSelectedGender("Male")} name="metaframeworks" aria-label="Male"/>
                            <input className="btn" type="radio" checked={selectedGender=="Female"} onChange={()=>setSelectedGender("Female")} name="metaframeworks" aria-label="Female"/>
                            <input className="btn" type="radio" checked={selectedGender=="Spectrum"} onChange={()=>setSelectedGender("Spectrum")} name="metaframeworks" aria-label="Spectrum"/>

                        </div>
                    </div>
                </div>
                <div className="form-control mt-6">
                    {
                        !user ?
                        (loader ? <button className="btn btn-primary">Signing...</button> :
                        <button className="btn btn-primary">Sign Up</button>) :
                        (loader ? <button className="btn btn-primary" disabled>Editing...</button> :
                        <button className="btn btn-primary">Edit</button>)
                    }

                </div>
            </form>
        </div>
    </div>
    
);
}

export default SignupForm;