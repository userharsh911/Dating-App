import React from 'react';
import { motion } from 'framer-motion';
import SignupForm from '../components/SignupForm';

const Signup = () => {
  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="min-h-screen flex items-center justify-center overflow-hidden"
    >
        <SignupForm />
    </motion.div>
  );
}

export default Signup;