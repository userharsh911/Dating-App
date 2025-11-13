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
    <>
      <UserMessage/>
    </>
  )
}

export default Message