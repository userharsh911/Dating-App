import { create } from 'zustand'
import axiosInstance from '../api/axiosApi';
import messageStore from './message.store';
import {io} from 'socket.io-client';
import {toast} from 'react-hot-toast';
const BASE_URI = import.meta.env.MODE === "development" ? "http://localhost:5005" : `${import.meta.env.VITE_BACKEND_URI}`

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

  blockPerson : async(id)=>{
    try {
      console.log("bll=ocking")
      const response = await axiosInstance.put(`/main/blockperson?user=${id}`);
      set({user:response.data.updatedUser});
      return response.data.updatedUser;
    } catch (error) {
      throw error.response?.data?.message;
    }
  },
  unblockPerson : async(id)=>{
    try {
      console.log("unblocking...")
      const response = await axiosInstance.put(`/main/unblockperson?user=${id}`);
      set({user:response.data.updatedUser});
      return response.data.updatedUser;
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

    socket.on("sendmessage",(args)=>{
      const {updateMsg, selectedMessageUser} = messageStore.getState();
      if(args.msg.senderId!=selectedMessageUser?._id || !selectedMessageUser){
        return toast.success(`${args.user.name} sends you a message`)
      }
      updateMsg(args.msg)
    });

    socket.on("onlineUsers",(args)=>{
      set({onlineUsers:args})
    })

    socket.on("blockYou",async(args)=>{
      const {getAllMessageUsers, setSelectetMessageUser, selectedMessageUser} = messageStore.getState()
      toast(`${args.blockBy.name} blocked you`, {
        icon: '🚫',
      });
      if(selectedMessageUser._id == args.blockBy._id){
        setSelectetMessageUser(args.blockBy);
      }
      await getAllMessageUsers();

    })
    socket.on("unblockYou",async(args)=>{
      const {getAllMessageUsers, setSelectetMessageUser, selectedMessageUser} = messageStore.getState()
      toast(`${args.unblockBy.name} unblocked you`, {
        icon: '🔓',
      });
      if(selectedMessageUser._id == args.unblockBy._id){
        setSelectetMessageUser(args.unblockBy);
      }
      await getAllMessageUsers();

    })

  },
  disconnectSocket:()=>{
        if(get().socket?.connected){
          get().socket.disconnect();
        }
    }



}))

export default userStore;