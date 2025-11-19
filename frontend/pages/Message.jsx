import React from 'react'
import UserMessage from '../components/UserMessage/UserMessage'
import messageStore from '../store/message.store'
import { useEffect } from 'react';
import userStore from '../store/userStore';

const Message = () => {
  const {getAllMessageUsers} = messageStore(state=>state);
  const {user} = userStore(state=>state);
  useEffect(()=>{
    getAllMessageUsers();
    console.log("fetching all message users",user)
  },[user]);
  return (
    <div className='w-full bg-red-400'>
      <UserMessage/>
    </div>
  )
}

export default Message