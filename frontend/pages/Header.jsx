import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { PanelRightOpen, PanelRightClose, Home, Heart, Compass, MessageSquare , User, Settings, LogIn, UserPlus, LogOut } from 'lucide-react';
import userStore from '../store/userStore';

const Header = () => {
    const {user, LogoutAccount} = userStore(state=>state);
    const navigate = useNavigate();
    const [isShow, setisShow] = useState(true)
    
    const routePages = [
        {name: 'Home', path: '/', icon: Home, isVerified: user ? true : false},
        {name: 'Matches', path: '/matches', icon: Heart, isVerified: user ? true : false},
        {name: 'Messages', path: '/message', icon: MessageSquare , isVerified: user ? true : false},
        {name: 'Profile', path: '/profile', icon: User, isVerified: user ? true : false},
        {name: 'Settings', path: '/settings', icon: Settings, isVerified: user ? true : false},
        {name: 'Login', path: '/login', icon: LogIn, isVerified: !user ? true : false},
        {name: 'Signup', path: '/signup', icon: UserPlus, isVerified: !user ? true : false},
    ]

    useEffect(()=>{
        console.log("USER : ",user);
    },[user])

    return (
        <>
        {/* Desktop Sidebar */}
        <div className={`hidden md:flex ${isShow ? 'w-64' : 'w-20'} bg-linear-to-b from-base-200 to-base-100 h-full relative shadow-xl transition-all duration-300`}>
            <div className='w-full flex flex-col'>
                {/* Toggle Button */}
                <div className='p-4 flex justify-end'>
                    {
                        isShow ? 
                        <PanelRightOpen 
                            onClick={()=>setisShow(value=>!value)}
                            className='cursor-pointer hover:scale-110 transition-transform text-primary'
                            size={24}
                        /> :
                        <PanelRightClose 
                            onClick={()=>setisShow(value=>!value)}
                            className='cursor-pointer hover:scale-110 transition-transform text-primary'
                            size={24}
                        />
                    }
                </div>

                {/* Logo Section */}
                <div className='px-4 mb-8'>
                    <div className={`flex items-center gap-3 ${!isShow && 'justify-center'}`}>
                        <div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-content font-bold text-xl'>
                            L
                        </div>
                        {isShow && <span className='text-xl font-bold text-primary'>Logo</span>}
                    </div>
                </div>

                {/* Navigation */}
                <nav className='flex flex-col gap-2 px-3 flex-1'>
                    {
                        routePages.map((vals)=>{
                            const Icon = vals.icon;
                            return(
                                vals.isVerified &&
                                <button 
                                    key={vals.path}
                                    id={vals.name} 
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary hover:text-primary-content transition-all duration-200 group ${!isShow && 'justify-center'}`}
                                    onClick={()=>navigate(`${vals.path}`)}
                                >
                                    <Icon size={20} className='group-hover:scale-110 transition-transform' />
                                    {isShow && <span className='font-medium'>{vals.name}</span>}
                                </button>
                            )
                        })
                    }
                    {
                        user && 
                        <button 
                            onClick={()=>{
                                LogoutAccount();
                                navigate('/login');
                            }} 
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-error hover:text-error-content transition-all duration-200 group mt-auto mb-4 ${!isShow && 'justify-center'}`}
                        >
                            <LogOut size={20} className='group-hover:scale-110 transition-transform' />
                            {isShow && <span className='font-medium'>Logout</span>}
                        </button>
                    }
                </nav>
            </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className='md:hidden fixed bottom-0 left-0 right-0 bg-linear-to-t from-base-200 to-base-100 shadow-2xl z-50 border-t border-base-300'>
            <nav className='flex justify-around items-center px-2 py-3'>
                {
                    routePages.map((vals)=>{
                        const Icon = vals.icon;
                        return(
                            vals.isVerified &&
                            <button 
                                key={vals.path}
                                id={vals.name} 
                                className='flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-primary hover:text-primary-content transition-all duration-200 group'
                                onClick={()=>navigate(`${vals.path}`)}
                            >
                                <Icon size={22} className='group-hover:scale-110 transition-transform' />
                                <span className='text-xs font-medium'>{vals.name}</span>
                            </button>
                        )
                    })
                }
                {
                    user && 
                    <button 
                        onClick={()=>{
                            LogoutAccount();
                            navigate('/login');
                        }} 
                        className='flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover:bg-error hover:text-error-content transition-all duration-200 group'
                    >
                        <LogOut size={22} className='group-hover:scale-110 transition-transform' />
                        <span className='text-xs font-medium'>Logout</span>
                    </button>
                }
            </nav>
        </div>
        </>
    )
}

export default Header