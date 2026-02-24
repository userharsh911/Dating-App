import React from 'react';
import { Heart, MessageCircle, Users, Sparkles, Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" } }
  };

  return (
    <div className="h-screen bg-base-200 overflow-y-scroll overflow-x-hidden">
      
      {/* Navbar (Kept Commented as per your code) */}
      {/* ... */}

      {/* Hero Section */}
      <div className="hero min-h-[600px] relative bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 overflow-hidden">
        
        {/* Floating Background Elements (Dating Vibe) */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-20 left-10 md:left-32 text-primary/20"
        >
          <Heart size={64} fill="currentColor" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }} 
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 md:right-32 text-secondary/20"
        >
          <Heart size={80} fill="currentColor" />
        </motion.div>

        <div className="hero-content text-center z-10">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-6">
              <div className="badge badge-secondary  badge-lg gap-2 py-3 px-4 shadow-lg shadow-secondary/20">
                <Sparkles size={16} />
                #connectedhearts
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pb-2">
              Find Your Perfect Match
            </motion.h1>
            
            <motion.p variants={fadeUp} className="py-6 text-lg md:text-xl text-base-content/80 max-w-2xl mx-auto">
              Connect with people nearby. Swipe, match, and start meaningful conversations. Your story begins here! 💕
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-lg gap-2 shadow-xl shadow-primary/30 rounded-full px-8" 
                onClick={() => navigate('/matches')}
              >
                <Heart size={20} fill="currentColor" />
                Get Started Free
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline btn-lg gap-2 rounded-full px-8"
              >
                <Users size={20} />
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-base-100 relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Why Choose <span className="text-primary">MateConnect</span>?
          </motion.h2>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <motion.div variants={scaleIn} whileHover={{ y: -10 }} className="card bg-base-200 shadow-xl hover:shadow-primary/20 transition-all border border-base-300/50">
              <div className="card-body items-center text-center p-8">
                <div className="avatar placeholder mb-4">
                  <div className="bg-primary flex items-center justify-center text-primary-content rounded-full w-20 shadow-lg shadow-primary/40">
                    <Sparkles size={36} />
                  </div>
                </div>
                <h3 className="card-title text-2xl mb-2">Smart Matching</h3>
                <p className="text-base-content/70">Our AI-powered algorithm finds your perfect match based on interests, values, and compatibility.</p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={scaleIn} whileHover={{ y: -10 }} className="card bg-base-200 shadow-xl hover:shadow-secondary/20 transition-all border border-base-300/50">
              <div className="card-body items-center text-center p-8">
                <div className="avatar placeholder mb-4">
                  <div className="bg-secondary flex items-center justify-center text-secondary-content rounded-full w-20 shadow-lg shadow-secondary/40">
                    <MessageCircle size={36} />
                  </div>
                </div>
                <h3 className="card-title text-2xl mb-2">Instant Chat</h3>
                <p className="text-base-content/70">Connect instantly with your matches. Share photos, voice notes, and video calls seamlessly.</p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={scaleIn} whileHover={{ y: -10 }} className="card bg-base-200 shadow-xl hover:shadow-accent/20 transition-all border border-base-300/50">
              <div className="card-body items-center text-center p-8">
                <div className="avatar placeholder mb-4">
                  <div className="bg-accent flex items-center justify-center text-accent-content rounded-full w-20 shadow-lg shadow-accent/40">
                    <Check size={36} />
                  </div>
                </div>
                <h3 className="card-title text-2xl mb-2">Verified Profiles</h3>
                <p className="text-base-content/70">Every profile is verified for authenticity. Date with confidence and peace of mind.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="hero min-h-[400px] bg-gradient-to-r from-primary to-secondary relative overflow-hidden"
      >
        {/* Subtle background overlay */}
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="hero-content text-center z-10 py-20">
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            whileInView={{ scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-content mb-6 drop-shadow-md">
              Ready to Find Your Mate?
            </h2>
            <p className="text-xl text-primary-content/90 mb-10 font-medium">
              Join thousands of people and start your journey to find meaningful connections today!
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-lg bg-base-100 text-primary hover:bg-white border-none gap-2 rounded-full px-10 shadow-xl"
              onClick={() => navigate('/matches')}
            >
              <Heart size={24} className="text-primary" fill="currentColor" />
              Let's Dive Now - It's Free!
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="footer footer-center p-10 pb-20 bg-base-300 text-base-content"
      >
        <div>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex md:flex-col items-center gap-2 cursor-pointer"
          >
            <Heart className="text-error" fill="currentColor" size={36} />
            <span className="font-bold text-3xl tracking-tight">MateConnect</span>
          </motion.div>
          <p className="font-medium text-base-content/70 mt-2">Connecting hearts since 2024</p>
        </div>
        <div>
          <p className="text-base-content/50">Copyright © 2024 - Made with <span className="text-error">❤️</span> by MateConnect</p>
        </div>
      </motion.footer>
    </div>
  );
}