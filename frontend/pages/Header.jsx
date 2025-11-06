import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { PanelRightOpen, PanelRightClose  } from 'lucide-react';
const Header = () => {
    const navigate = useNavigate();
    const [isShow, setisShow] = useState(true)
    const routePages = [
        {name: 'Home', path: '/'},
        {name: 'Matches', path: '/matches'},
        {name: 'Explore', path: '/explore'},
        {name: 'Profile', path: '/profile'},
        {name: 'Settings', path: '/settings'},
        {name: 'Login', path: '/login'},
        {name: 'Signup', path: '/signup'},
    ]

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
            </div>
                </>
            }
        </nav>
    </div>
)
}

export default Header