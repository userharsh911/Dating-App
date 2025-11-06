import React, { useState } from 'react';
import { Heart, MapPin, Briefcase, GraduationCap, Music, Camera, Book, Coffee, Dumbbell, Plane, Edit, Settings, MessageCircle, Gift, Star } from 'lucide-react';
import userStore from '../store/userStore';

const DatingProfile = () => {
  const [activeTab, setActiveTab] = useState('about');
  const {user} = userStore(state=>state)
  console.log("Profile Rendered",user)
  const profile = {
    name: user.name || "Jane Doe",
    age: user.age,
    Branch: "Mumbai, India",
    distance: "5 km away",
    bio: "Adventure seeker with a passion for photography and good coffee. Love exploring new places and trying different cuisines. Looking for someone genuine who can make me laugh.",
    occupation: "Product Designer",
    education: "IIT Delhi",
    height: "5'6\"",
    interests: ["Photography", "Travel", "Coffee", "Music", "Fitness", "Reading"],
    photos: 6,
    verified: true
  };

  const photos = [
    { id: 1, url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { id: 2, url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400" },
    { id: 3, url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" },
    { id: 4, url: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400" },
    { id: 5, url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400" },
    { id: 6, url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400" }
  ];

  const getInterestIcon = (interest) => {
    const icons = {
      Photography: Camera,
      Travel: Plane,
      Coffee: Coffee,
      Music: Music,
      Fitness: Dumbbell,
      Reading: Book
    };
    return icons[interest] || Star;
  };

  return (
    <div className="h-dvh overflow-y-scroll bg-base-200 text-base-content">
      {/* Header */}
      <div className="sticky top-0 z-50 " style={{ backgroundColor: 'oklch(20% 0 0)' }}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <button className="p-2 rounded-full hover:bg-opacity-10 hover:bg-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-opacity-10 hover:bg-white transition">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-8">
        {/* Main Photo Grid */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {photos.map((photo, idx) => (
            <div 
              key={photo.id}
              className={`relative overflow-hidden ${idx === 0 ? 'col-span-2 row-span-2 rounded-3xl' : 'rounded-xl'}`}
              style={{ aspectRatio: idx === 0 ? '1/1' : '1/1' }}
            >
              <img 
                src={photo.url} 
                alt={`Photo ${photo.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Profile Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold">{profile.name}, {profile.age}</h1>
                {profile.verified && (
                  <div className="rounded-full p-1" style={{ backgroundColor: 'oklch(58% 0.158 241.966)' }}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm" style={{ color: 'oklch(70% 0 0)' }}>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </span>
                <span>{profile.distance}</span>
              </div>
            </div>
            <button 
              className="p-3 rounded-full transition hover:scale-110"
              style={{ backgroundColor: 'oklch(75% 0.183 55.934)' }}
            >
              <Heart className="w-6 h-6" fill="currentColor" />
            </button>
          </div>

          {/* Quick Info */}
          <div className="flex gap-3 mb-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'oklch(26% 0 0)' }}>
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">{profile.occupation}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'oklch(26% 0 0)' }}>
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm">{profile.education}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-6 border-b" style={{ borderColor: 'oklch(26% 0 0)' }}>
          {['about', 'interests', 'photos'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-2 capitalize font-medium transition ${
                activeTab === tab 
                  ? 'border-b-2' 
                  : 'opacity-50 hover:opacity-75'
              }`}
              style={activeTab === tab ? { borderColor: 'oklch(75% 0.183 55.934)' } : {}}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">About Me</h3>
              <p style={{ color: 'oklch(85% 0 0)' }} className="leading-relaxed">
                {profile.bio}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Basics</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl" style={{ backgroundColor: 'oklch(20% 0 0)' }}>
                  <p className="text-sm mb-1" style={{ color: 'oklch(70% 0 0)' }}>Height</p>
                  <p className="font-medium">{profile.height}</p>
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: 'oklch(20% 0 0)' }}>
                  <p className="text-sm mb-1" style={{ color: 'oklch(70% 0 0)' }}>Distance</p>
                  <p className="font-medium">{profile.distance}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'interests' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Interests & Hobbies</h3>
            <div className="grid grid-cols-2 gap-3">
              {profile.interests.map((interest) => {
                const Icon = getInterestIcon(interest);
                return (
                  <div 
                    key={interest}
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ backgroundColor: 'oklch(20% 0 0)' }}
                  >
                    <div className="p-2 rounded-full" style={{ backgroundColor: 'oklch(75% 0.183 55.934)', opacity: 0.2 }}>
                      <Icon className="w-5 h-5" style={{ color: 'oklch(75% 0.183 55.934)' }} />
                    </div>
                    <span className="font-medium">{interest}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="grid grid-cols-2 gap-3">
            {photos.map((photo) => (
              <div key={photo.id} className="relative overflow-hidden rounded-xl" style={{ aspectRatio: '3/4' }}>
                <img 
                  src={photo.url} 
                  alt={`Photo ${photo.id}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-4" style={{ backgroundColor: 'oklch(20% 0 0)' }}>
          <div className="max-w-4xl mx-auto flex gap-4">
            <button 
              className="flex-1 py-4 rounded-full font-semibold transition hover:opacity-90 flex items-center justify-center gap-2"
              style={{ backgroundColor: 'oklch(75% 0.183 55.934)', color: 'oklch(26% 0.079 36.259)' }}
            >
              <Heart className="w-5 h-5" fill="currentColor" />
              Like
            </button>
            <button 
              className="flex-1 py-4 rounded-full font-semibold transition hover:opacity-90 flex items-center justify-center gap-2"
              style={{ backgroundColor: 'oklch(79% 0.209 151.711)', color: 'oklch(26% 0.065 152.934)' }}
            >
              <MessageCircle className="w-5 h-5" />
              Message
            </button>
            <button 
              className="p-4 rounded-full transition hover:opacity-90"
              style={{ backgroundColor: 'oklch(26% 0 0)' }}
            >
              <Gift className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatingProfile;