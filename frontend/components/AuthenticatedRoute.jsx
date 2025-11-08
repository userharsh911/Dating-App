import React, { useEffect } from 'react'
import userStore from '../store/userStore';
import { Navigate } from 'react-router-dom';
const AuthenticatedRoute = ({auth, children}) => {
    const {user} = userStore(state=>state);
    console.log("Run")
    useEffect(()=>{
        console.log("AuthenticatedRoute - USER : ",user);
    },[user])
    if(!user && auth){
        return <Navigate to="/" />;
    }else{
  return (
    <div>
        {
            children
        }
    </div>
  )}
}

export default AuthenticatedRoute