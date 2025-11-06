import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { PanelRightOpen, PanelRightClose  } from 'lucide-react';
import userStore from '../store/userStore';
const Header = () => {
    const {user, LogoutAccount} = userStore(state=>state);
    const navigate = useNavigate();
    const [isShow, setisShow] = useState(true)
    const routePages = [
        {name: 'Home', path: '/'},
        {name: 'Matches', path: '/matches', isVerified: user ? true : false},
        {name: 'Explore', path: '/explore', isVerified: user ? true : false},
        {name: 'Profile', path: '/profile', isVerified: user ? true : false},
        {name: 'Settings', path: '/settings', isVerified: user ? true : false},
        {name: 'Login', path: '/login', isVerified: !user ? true : false},
        {name: 'Signup', path: '/signup', isVerified: !user ? true : false},
    ]

    useEffect(()=>{
        console.log("USER : ",user);
    },[user])

return (
    <div className={`${isShow ? 'w-[25%]' : 'w-fit'} bg-base-100 flex  h-full relative`}>
        <div className='w-[10%]  z-20'>
            <div className='p-2'>
                {
                    isShow ? <PanelRightOpen 
                    onClick={()=>setisShow(value=>!value)}
                    className='cursor-pointer'
                /> :
                <PanelRightClose 
                    onClick={()=>setisShow(value=>!value)}
                    className='cursor-pointer'
                />
                }
            </div>
        </div>
        <nav className={`flex absolute flex-col z-10 duration-200 ${isShow ? "left-7 w-[90%]" : "-left-full w-0"} p-4 items-center text-base-content h-full`}>
            {
                isShow && <>
                    <div>
                <button className='btn btn-ghost text-xl font-bold'>
                    Logo
                </button>
            </div>
            <div className='flex gap-2 flex-col w-full'>
                    {
                        routePages.map((vals)=>{
                            return(
                                vals.isVerified &&
                                <button 
                                    key={vals.path}
                                    id={vals.name} 
                                    className='text-[16px] hover:bg-base-200 mt-6 py-3 cursor-pointer w-full px-4'
                                    onClick={()=>navigate(`${vals.path}`)}
                                >
                                    {vals.name}
                                </button>
                            )
                        })
                    }
                    {
                        user && <button onClick={()=>{
                            LogoutAccount();
                            navigate('/login');
                        }} className='text-[16px] hover:bg-base-200 mt-6 py-3 cursor-pointer w-full px-4'>
                            logout
                        </button>
                    }
            </div>
                </>
            }
        </nav>
    </div>
)
}

export default Header