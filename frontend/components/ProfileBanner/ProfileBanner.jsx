import React from 'react';
import { motion } from 'framer-motion';
import userStore from '../../store/userStore';

export default function ProfileBanner({ image }) {
  const { selectedUser, user } = userStore(state => state);
  
  // Safely grab the initial just in case data is still loading
  const initial = selectedUser?.name?.[0] || user?.name?.[0] || '?';

  return (
    <div className="w-full mb-6">
      {/* 1. Cinematic Banner Reveal */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-48 sm:h-64 rounded-b-3xl bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient shadow-inner overflow-hidden"
      >
        {/* Optional Glassmorphism overlay for texture */}
        <div className="absolute inset-0 bg-base-100/10 backdrop-blur-[2px]"></div>
      </motion.div>

      {/* Profile Image Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Avatar Spring Animation up into the banner */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="relative -mt-16 sm:-mt-20 z-10 flex justify-center sm:justify-start"
        >
          {/* 3. Hover Interactions */}
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -3 }}
            whileTap={{ scale: 0.95 }}
            className="avatar placeholder relative group cursor-pointer"
          >
            {/* 4. Subtle Glowing Shadow Behind Avatar */}
            <div className="absolute inset-2 rounded-full bg-primary/40 blur-xl group-hover:bg-primary/60 transition-colors duration-300"></div>
            
            {image ? (
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full ring-4 ring-base-100 shadow-2xl overflow-hidden relative z-10 bg-base-100">
                <motion.img 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  src={image} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-neutral to-neutral-focus text-neutral-content rounded-full ring-4 ring-base-100 shadow-2xl flex items-center justify-center relative z-10">
                <span className="text-4xl sm:text-5xl font-bold shadow-sm">
                  {initial.toUpperCase()}
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}