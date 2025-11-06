import { create } from 'zustand'
import axiosInstance from '../api/axiosApi';
const userStore = create((set) => ({
  user:null,
  getUser: async()=>{
    try {
      const response = await axiosInstance.get('/auth/checkauth')
      set({user:response.data.user})
      console.log("user get successfully ",response.data)
      return response?.data?.user
    } catch (error) {
      throw console.log("error while authenticating ",error.response?.data?.message)
    }
  },
  SignUpAccount: async(args)=>{
    try {
      const userData = await axiosInstance.post("/auth/signup",args);
      console.log("user signup data ",userData)
      return userData
    } catch (error) {
      console.log("error while signing up ",error.response?.data?.message)
      throw error.response?.data?.message;
    }
  },
  LoginAccount: async(args)=>{
    try {
      const response = await axiosInstance.post('/auth/login',args);
      set({user:response.data.newUser});
      console.log("After logged in data ", response)
      return response.data.newUser;
    } catch (error) {
      console.log("error while Logging in ",error.response?.data?.message)
      throw error.response?.data?.message;
    }
  },

  LogoutAccount : async()=>{
    try {
      const response = await axiosInstance.post('/auth/logout');
      console.log("Log out inst ", response.data);
      set({user:null});
    } catch (error) {
      throw error.response?.data?.message;
    }
  }
}))

export default userStore;