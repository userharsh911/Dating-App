import { create } from 'zustand'
import axiosInstance from '../api/axiosApi';
const userStore = create((set, get) => ({
  user:null,
  allUsers:[],
  selectedUser:null,
  currentCardIndex: 0,
  page: 0,
  setCurrentCardIndex: (value)=>set({currentCardIndex:value}),
  setAllUsers: (value)=>set({allUsers:value}),
  setPage: (value)=>set({page:value}),
  setSelectedUser: (user)=> set({selectedUser:user}),
  getUser: async()=>{
    try {
      const response = await axiosInstance.get('/auth/checkauth')
      set({user:response.data.user})
      console.log("user get successfully ",response.data)
      return response?.data?.user
    } catch (error) {
      console.log("useuse ",error)
      throw error.response?.data?.message
    }
  },
  SignUpAccount: async(args)=>{
    try {
      const userData = await axiosInstance.post("/auth/signup",args);
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
  },
  getMatchesUsers : async()=>{
    try {
      console.log("Pages ",get().page)
      const response = await axiosInstance.get(`/main/getallusers/?page=${get().page}&limit=5`)
      console.log("all users ",response.data.users);
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
      console.log("error while updating user profile");
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
  }
}))

export default userStore;