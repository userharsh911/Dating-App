import React, { useEffect } from 'react'
import ProfileSecion from '../components/ProfileSection/ProfileSection'
import userStore from '../store/userStore'

const Profile = () => {
  const {setAllUsers} = userStore(state=>state);
  useEffect(()=>{
    setAllUsers([]);
  },[]);
  return (
    <div>
      <ProfileSecion editing={true}/>
    </div>
  )
}

export default Profile