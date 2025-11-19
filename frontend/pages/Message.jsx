import React from 'react'
import UserMessage from '../components/UserMessage/UserMessage'
import messageStore from '../store/message.store'
import { useEffect } from 'react';

const Message = () => {
  const {getAllMessageUsers} = messageStore(state=>state);
  useEffect(()=>{
    getAllMessageUsers();
  },[]);
  return (
    <div className='w-full bg-red-400'>
      <UserMessage/>
    </div>
  )
}

export default Message