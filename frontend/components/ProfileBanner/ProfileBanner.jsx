import React from 'react';

export default function ProfileBanner({image}) {
  return (
    <div className="w-full">
      {/* Banner Image */}
      <div className="relative w-full h-64 bg-linear-to-r from-primary to-secondary overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=300&fit=crop" 
          alt="Banner" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16">
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring ring-base-100 ring-offset-base-200 ring-offset-2">
              <img src={image} alt="Profile" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}