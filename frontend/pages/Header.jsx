import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { PanelRightOpen, PanelRightClose, Home, Heart, MessageSquare, User, LogIn, UserPlus, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import userStore from '../store/userStore';

const Header = () => {
    const { user, LogoutAccount, setSelectedUser } = userStore(state => state);
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(true);

    const routePages = [
        { name: 'Home', path: '/', icon: Home, show: !!user },
        { name: 'Matches', path: '/matches', icon: Heart, show: !!user },
        { name: 'Messages', path: '/message', icon: MessageSquare, show: !!user },
        { name: 'Profile', path: '/profile', icon: User, show: !!user },
        { name: 'Login', path: '/login', icon: LogIn, show: !user },
        { name: 'Signup', path: '/signup', icon: UserPlus, show: !user },
    ];

    const handleLogout = () => {
        LogoutAccount();
        navigate('/login');
    };

    return (
        <>
            {/* ====== DESKTOP SIDEBAR ====== */}
            <motion.div 
                animate={{ width: isShow ? 256 : 88 }} // 256px = w-64, 88px = w-22
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="hidden md:flex flex-col bg-base-200/95 backdrop-blur-xl h-full relative border-r border-base-300 shadow-2xl z-50 whitespace-nowrap overflow-hidden"
            >
                {/* Toggle Button */}
                <div className={`p-4 flex ${isShow ? 'justify-end' : 'justify-center'} mt-2`}>
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsShow(!isShow)}
                        className="p-2 rounded-xl bg-base-100 shadow-sm text-primary hover:bg-primary hover:text-primary-content transition-colors"
                    >
                        {isShow ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
                    </motion.button>
                </div>

                {/* Logo Section */}
                <div className="px-6 mb-8 mt-4">
                    <div className="flex items-center gap-4">
                        <motion.div 
                            whileHover={{ rotate: 10 }}
                            className="w-10 h-10 min-w-[40px] bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-primary-content font-bold text-xl shadow-lg"
                        >
                            L
                        </motion.div>
                        <AnimatePresence>
                            {isShow && (
                                <motion.span 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                                >
                                    Logo
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2 px-4 flex-1">
                    {routePages.map((route) => {
                        if (!route.show) return null;
                        const Icon = route.icon;

                        return (
                            <div key={route.path} className={!isShow ? "tooltip tooltip-right tooltip-primary" : ""} data-tip={route.name}>
                                <NavLink 
                                    to={route.path}
                                    onClick={() => setSelectedUser(null)}
                                    className="relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group outline-none"
                                >
                                    {({ isActive }) => (
                                        <>
                                            {/* Animated Active Background */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="desktop-active-tab"
                                                    className="absolute inset-0 bg-primary rounded-xl shadow-md"
                                                    initial={false}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                            
                                            <Icon 
                                                size={22} 
                                                className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-primary-content' : 'text-base-content/70 group-hover:text-primary'}`} 
                                            />
                                            
                                            <AnimatePresence>
                                                {isShow && (
                                                    <motion.span 
                                                        initial={{ opacity: 0, width: 0 }}
                                                        animate={{ opacity: 1, width: "auto" }}
                                                        exit={{ opacity: 0, width: 0 }}
                                                        className={`relative z-10 font-medium ${isActive ? 'text-primary-content' : 'text-base-content/80 group-hover:text-primary'}`}
                                                    >
                                                        {route.name}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    )}
                                </NavLink>
                            </div>
                        );
                    })}

                    {/* Logout Button */}
                    {user && (
                        <div className={`mt-auto mb-6 ${!isShow ? "tooltip tooltip-right tooltip-error" : ""}`} data-tip="Logout">
                            <button 
                                onClick={handleLogout} 
                                className="w-full relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-error/10 text-error outline-none"
                            >
                                <LogOut size={22} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
                                <AnimatePresence>
                                    {isShow && (
                                        <motion.span 
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="relative z-10 font-medium whitespace-nowrap"
                                        >
                                            Logout
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                    )}
                </nav>
            </motion.div>

            {/* ====== MOBILE BOTTOM NAVIGATION ====== */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-base-200/80 backdrop-blur-lg border-t border-base-300 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 pb-safe">
                <nav className="flex justify-around items-center px-2 py-2">
                    {routePages.map((route) => {
                        if (!route.show) return null;
                        const Icon = route.icon;

                        return (
                            <NavLink 
                                key={route.path}
                                to={route.path}
                                onClick={() => setSelectedUser(null)}
                                className="relative flex flex-col items-center gap-1 p-2 min-w-[64px]"
                            >
                                {({ isActive }) => (
                                    <>
                                        <motion.div 
                                            whileTap={{ scale: 0.8 }}
                                            className={`p-2 rounded-full transition-colors ${isActive ? 'bg-primary text-primary-content shadow-lg' : 'text-base-content/60 hover:bg-base-300 hover:text-primary'}`}
                                        >
                                            <Icon size={20} />
                                        </motion.div>
                                        <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-primary' : 'text-base-content/60'}`}>
                                            {route.name}
                                        </span>
                                        {/* Mobile Active Dot Indicator */}
                                        {isActive && (
                                            <motion.div 
                                                layoutId="mobile-active-dot"
                                                className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary"
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        );
                    })}

                    {/* Mobile Logout */}
                    {user && (
                        <button 
                            onClick={handleLogout} 
                            className="relative flex flex-col items-center gap-1 p-2 min-w-[64px] text-error/80 hover:text-error"
                        >
                            <motion.div whileTap={{ scale: 0.8 }} className="p-2 rounded-full hover:bg-error/10">
                                <LogOut size={20} />
                            </motion.div>
                            <span className="text-[10px] font-medium">Logout</span>
                        </button>
                    )}
                </nav>
            </div>
        </>
    );
};

export default Header;