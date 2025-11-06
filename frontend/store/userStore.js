import { create } from 'zustand'
import axiosInstance from '../api/axiosApi';
const userStore = create((set) => ({
  user:null,
  getUser: async()=>{
    const user = await axiosInstance.get('/auth/checkauth')
    console.log("user get successfully ", user)
  },
  SignUpAccount: async(args)=>{
    const userData = await axiosInstance.post("/auth/signup");
    console.log("user signup data ",userData)
  }

}))

export default userStore;