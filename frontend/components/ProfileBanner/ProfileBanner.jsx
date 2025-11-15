import React, { useEffect } from 'react';
import userStore from '../../store/userStore';

export default function ProfileBanner({image}) {
  const {selectedUser, user} = userStore(state=>state);
  useEffect(()=>{
    console.log("sleeefe fefes fdf ",selectedUser)
  },[selectedUser])
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
          <div className="avatar avatar-placeholder">
            {image ? <div className="w-32 h-32 rounded-full ring ring-base-100 ring-offset-base-200 ring-offset-2">
              <img src={image} alt="Profile" />
            </div> :
            <div className="bg-neutral text-neutral-content w-32 h-32 rounded-full">
              <span className="text-3xl">{selectedUser ? selectedUser.name[0].toUpperCase() : user.name[0].toUpperCase()}</span>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}