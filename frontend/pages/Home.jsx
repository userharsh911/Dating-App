import React from 'react';
import { Heart, MessageCircle, Users, Sparkles, Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-base-200 overflow-y-scroll">
      {/* Navbar */}
      {/* <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
            <Heart className="text-error" fill="currentColor" />
            <span className="ml-2 font-bold">LoveConnect</span>
          </a>
        </div>
        <div className="flex-none gap-2">
          <button className="btn btn-ghost">Features</button>
          <button className="btn btn-ghost">About</button>
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </div> */}

      {/* Hero Section */}
      <div className="hero min-h-[600px] bg-linear-to-br from-primary/10 via-base-200 to-secondary/10">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <div className="flex justify-center mb-6">
              <div className="badge badge-secondary badge-lg gap-2">
                <Sparkles size={16} />
                #connectedhearts
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Find Your Perfect Match
            </h1>
            
            <p className="py-6 text-lg md:text-xl text-base-content/80 max-w-2xl mx-auto">
              Connect with peoples nearby. Swipe, match, and start meaningful conversations. Your story begins here! 💕
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn btn-primary btn-lg gap-2 shadow-lg" onClick={()=>navigate('/matches')}>
                <Heart size={20} />
                Get Started Free
              </button>
              <button className="btn btn-outline btn-lg gap-2">
                <Users size={20} />
                Learn More
              </button>
            </div>

            {/* Stats */}
            {/* <div className="stats shadow mt-12 bg-base-100">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <Users size={32} />
                </div>
                <div className="stat-title">Active Users</div>
                <div className="stat-value text-primary">50M+</div>
              </div>
              
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <Heart size={32} />
                </div>
                <div className="stat-title">Matches Made</div>
                <div className="stat-value text-secondary">2.5B+</div>
              </div>
              
              <div className="stat">
                <div className="stat-figure text-accent">
                  <MessageCircle size={32} />
                </div>
                <div className="stat-title">Daily Messages</div>
                <div className="stat-value text-accent">100M+</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-base-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-primary">MateConnect</span>?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="avatar placeholder mb-4">
                  <div className="bg-primary text-primary-content rounded-full w-16">
                    <Sparkles size={32} />
                  </div>
                </div>
                <h3 className="card-title">Smart Matching</h3>
                <p>Our AI-powered algorithm finds your perfect match based on interests, values, and compatibility.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="avatar placeholder mb-4">
                  <div className="bg-secondary text-secondary-content rounded-full w-16">
                    <MessageCircle size={32} />
                  </div>
                </div>
                <h3 className="card-title">Instant Chat</h3>
                <p>Connect instantly with your matches. Share photos, voice notes, and video calls seamlessly.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body items-center text-center">
                <div className="avatar placeholder mb-4">
                  <div className="bg-accent text-accent-content rounded-full w-16">
                    <Check size={32} />
                  </div>
                </div>
                <h3 className="card-title">Verified Profiles</h3>
                <p>Every profile is verified for authenticity. Date with confidence and peace of mind.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      {/* <div className="py-20 bg-base-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Success Stories</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-12">
                      <span>RK</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">Rahul & Priya</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-warning text-warning" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic">"We met on LoveConnect 6 months ago and it's been magical! Thank you for bringing us together. 🥰"</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-4 mb-4">
                  <div className="avatar placeholder">
                    <div className="bg-secondary text-secondary-content rounded-full w-12">
                      <span>AS</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold">Amit & Sneha</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-warning text-warning" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic">"Best dating app! The matching algorithm is spot on. We're getting married next month! ❤️"</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* CTA Section */}
      <div className="hero min-h-[400px] bg-linear-to-r from-primary to-secondary">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-content mb-6">
              Ready to Find Your Mate?
            </h2>
            <p className="text-lg text-primary-content/90 mb-8">
              Join peoples and start your journey to find meaningful connections today!
            </p>
            <button 
              className="btn btn-lg bg-base-100 text-primary hover:bg-base-200 border-none gap-2"
              onClick={()=>navigate('/matches')}
              >
              <Heart size={24} />
              Let's Dive Now - It's Free!
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-100 text-base-content">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="text-error" fill="currentColor" size={32} />
            <span className="font-bold text-2xl">MateConnect</span>
          </div>
          <p className="font-medium">Connecting hearts since 2020</p>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <a className="link link-hover">About</a>
            <a className="link link-hover">Privacy</a>
            <a className="link link-hover">Terms</a>
            <a className="link link-hover">Safety</a>
            <a className="link link-hover">Contact</a>
          </div>
        </div>
        <div>
          <p>Copyright © 2024 - Made with ❤️ by MateConnect</p>
        </div>
      </footer>
    </div>
  );
}