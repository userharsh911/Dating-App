import React, { useState } from 'react'
// import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import { Mail, LockKeyhole,} from 'lucide-react';
import userStore from '../store/userStore';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loader, setLoader] = useState(false);
    const {LoginAccount} = userStore(state=>state);
    const loginSubmit = async(e)=>{
        try {
            e.preventDefault();
            if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(email)){
                return toast.error("Invalid email or password");
            }
            if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)){
                return toast.error("Invalid email or password");
            }
            toast.promise(
                LoginAccount({email, password}).then(()=> navigate('/')),
                {
                    loading: 'Logging... ⏳',
                    success: `welcome 😀`,
                    error: 'Error while Logging in 🥲',
                }
            )
        } catch (error) {
            toast.error(error);
        }
        finally{
            setLoader(false);
        }
    }
return (
    <div className='flex justify-center items-center min-h-screen bg-base-200'>
        <div className='card w-96 bg-base-200 shadow-xl'>
            <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
                <p className='text-end my-6 me-3'>don't have an account? <span onClick={
                    ()=>navigate('/signup')
                } className='text-blue-400 cursor-pointer'>signup</span></p>
                <form className="card-body flex flex-col gap-7" onSubmit={loginSubmit}>
                    <div className="form-control">
                        <div className="flex items-center justify-center border-b-2 border-base-300 pb-2 gap-3">
                            <Mail  size={16} strokeWidth={1} />
                            <input onChange={(e)=>setEmail(()=>e.target.value)} type="text" placeholder="email" className="input border-none shadow-none outline-none" required />
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="flex items-center justify-center border-b-2 border-base-300 pb-2 gap-3">
                            <LockKeyhole  size={16} strokeWidth={1} />
                            <input onChange={(e)=>setPassword(()=>e.target.value)} type="password" placeholder="password" className="input border-none shadow-none outline-none" required />
                        </div>
                    </div>
                    {
                        loader ? (
                            <button className='btn btn-primary w-full mt-6'>Logging...</button>
                        ) : (
                            <button className='btn btn-primary w-full mt-6'>Login</button>
                        )
                    }
                </form>
                
            </div>
        </div>
    </div>
)
}

export default Login