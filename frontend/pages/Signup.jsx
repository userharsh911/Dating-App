import React, { useState } from 'react'
import { Mail, LockKeyhole, CalendarDays, MarsStroke   } from 'lucide-react';
const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [selectedGender, setSelectedGender] = useState(null);   
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("Submitted")
    }
return (
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col gap-16 lg:flex-row-reverse">
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Connecting Hearts!</h1>
                <p className="py-6">Join our community and find your perfect match today.</p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body flex flex-col gap-7" onSubmit={handleSubmit}>
                    <p className='text-end'>Already Member? <span className='text-blue-400'>Sign in</span></p>
                    <div className="form-control">
                        <div className="flex items-center justify-center border-b-2 border-base-300 pb-2 gap-3">
                            <Mail size={16} strokeWidth={1} />
                            <input onChange={(e)=>setEmail(()=>e.target.value)} type="email" placeholder="email" className="input border-none shadow-none outline-none" required />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            
                        </label>
                        <div className="flex items-center justify-center border-b-2 border-base-300 pb-2 gap-3">
                            <LockKeyhole size={16} strokeWidth={1} />
                            <input onChange={(e)=>setPassword(()=>e.target.value)} type="password" placeholder="password" className="input border-none shadow-none outline-none" required />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            
                        </label>
                        <div className="flex items-center justify-center border-b-2 border-base-300 pb-2 gap-3">
                            <CalendarDays  size={16} strokeWidth={1} />
                            <input onChange={(e)=>setAge(()=>e.target.value)} type="date" placeholder="age" className="input border-none shadow-none outline-none" required />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            
                        </label>
                        <div className="">
                            <p className='pb-6'>Select gender :</p>
                            <div className="filter">
                                <input className="btn filter-reset" type="radio" name="metaframeworks" aria-label="All"/>
                                <input className="btn" type="radio" name="metaframeworks" aria-label="Male"/>
                                <input className="btn" type="radio" name="metaframeworks" aria-label="Female"/>
                                <input className="btn" type="radio" name="metaframeworks" aria-label="Spectrum"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);
}

export default Signup