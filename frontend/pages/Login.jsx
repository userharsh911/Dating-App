import React from 'react'
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate()
    const {register, handleSubmit, watch} =useForm({
        defaultValues:{

        }
    })
    const loginSubmit = ()=>{
        console.log("Login")
    }
return (
    <div className='flex justify-center items-center min-h-screen bg-base-300'>
        <div className='card w-96 bg-base-200 shadow-xl'>
            <div className='card-body'>
                <h2 className='card-title justify-center text-2xl mb-4'>Login</h2>
                <form onSubmit={handleSubmit(loginSubmit)}>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>Email</span>
                        </label>
                        <input 
                            type='email' 
                            className='input input-bordered w-full' 
                            placeholder='Enter your email'
                        />
                    </div>
                    <div className='form-control'>
                        <label className='label'>
                            <span className='label-text'>Password</span>
                        </label>
                        <input 
                            type='password' 
                            className='input input-bordered w-full' 
                            placeholder='Enter your password'
                        />
                    </div>
                    <button className='btn btn-primary w-full mt-6'>Login</button>
                </form>
                <p className='text-center'>don't have an account? <span onClick={
                    ()=>navigate('/signup')
                } className='text-blue-600 cursor-pointer'>signup</span></p>
            </div>
        </div>
    </div>
)
}

export default Login