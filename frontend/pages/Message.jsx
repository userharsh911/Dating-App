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
  },[user]);
  return (
    <div className='w-fu"ll h-full flex items-center justify-center'>
      <UserMessage/>
    </div>
  )
}

export default Message