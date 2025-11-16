import { create } from 'zustand'
import axiosInstance from '../api/axiosApi';
import messageStore from './message.store';
import {io} from 'socket.io-client';
const BASE_URI = import.meta.env.MODE === "development" ? "http://localhost:5005" : "/"

const userStore = create((set, get) => ({
  user:null,
  allUsers:[],
  selectedUser:null,
  onlineUsers:[],
  currentCardIndex: 0,
  page: 0,
  setCurrentCardIndex: (value)=>set({currentCardIndex:value}),
  setAllUsers: (value)=>set({allUsers:value}),
  setPage: (value)=>set({page:value}),
  setSelectedUser: (user)=> set({selectedUser:user}),
  setUser: (user)=> set({user:user}),
  getUser: async()=>{
    try {
      const response = await axiosInstance.get('/auth/checkauth')
      set({user:response.data.user});
      get().makeConnection();
      return response?.data?.user
    } catch (error) {
      throw error.response?.data?.message
    }
  },  
  SignUpAccount: async(args)=>{
    try {
      const userData = await axiosInstance.post("/auth/signup",args);
      return userData
    } catch (error) {
      throw error.response?.data?.message;
    }
  },
  LoginAccount: async(args)=>{
    try {
      const response = await axiosInstance.post('/auth/login',args);
      set({user:response.data.newUser});
      get().makeConnection();
      return response.data.newUser;
    } catch (error) {
      throw error.response?.data?.message;
    }
  },

  LogoutAccount : async()=>{
    try {
      await axiosInstance.post('/auth/logout');
      get().disconnectSocket();
      set({user:null});
    } catch (error) {
      throw error.response?.data?.message;
    }
  },
  getMatchesUsers : async()=>{
    try {
      const response = await axiosInstance.get(`/main/getallusers/?page=${get().page}&limit=5`)
      set({allUsers:response.data.users});
      return response.data;
    } catch (error) {
      throw error.response?.data?.message
    }
  },
  UpdateProfilePic: async(imageLink)=>{
    try {
      const response = await axiosInstance.post("/main/updateprofilepic",{imageLink});
      set({user:response.data.UpdatedUser});
      return response.data;
    } catch (error) {
      throw error.response?.data?.message;
    }

  },
  UpdateUserProfile: async(data)=>{
    try {
      const response = await axiosInstance.put('/main/editprofile',data);
      set({user:response.data.updatedUser})
    } catch (error) {
      throw error.response?.data?.message;

    }
  },
  EditUserHobby: async(hobby)=>{
    try {
      const response = await axiosInstance.put('/main/edithobby',hobby);
      set({user:response.data.updatedUser})
      return response.data
    } catch (error) {
      throw error.response?.data?.message;
    }
  },
  EditUserDescription: async(data)=>{
    try {
      const response = await axiosInstance.put('/main/editdescription',data);
      set({user:response.data.updatedUser})
      return response.data;
    } catch (error) {
      throw error.response?.data?.message;
    }
  },

  makeConnection: ()=>{
    const {user} = get();
    if(!user || get().socket?.connected) return;
    
    const socket = io(BASE_URI,{
      query:{
        userid:user._id
      }
    })
    socket.connect();
    set({socket:socket});

    socket.on("sendmessage",(msg)=>{
      const {updateMsg, selectedMessageUser} = messageStore.getState();
      if(msg.senderId!=selectedMessageUser._id){
        return;
      }
      updateMsg(msg)
    });

    socket.on("onlineUsers",(args)=>{
      set({onlineUsers:args})
    })

  },
  disconnectSocket:()=>{
        if(get().socket?.connected){
          get().socket.disconnect();
        }
    }



}))

export default userStore;