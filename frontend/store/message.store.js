import {create} from "zustand";
import axiosInstance from "../api/axiosApi";
import userStore from "./userStore";
const messageStore = create((set,get)=>({
    messages:[],
    allMessageUsers:[],
    selectedMessageUser: null,
    setSelectetMessageUser:value=>set({selectedMessageUser:value}),
    messageList: async(user)=>{
        try {
            const response = await axiosInstance.put(`/message/addtomessagelist?otherUser=${user._id}`)
            userStore.getState().setUser(response.data.updatedUser);
        } catch (error) {
            throw error.response?.data?.message;
        }
    },
    getAllMessageUsers: async()=>{
        try {
            const response = await axiosInstance.get('/message/getmessageusers');
            set({allMessageUsers:response.data.users})
            console.log("all users message ",response?.data?.users)
        } catch (error) {
            console.log(error);
        }
    },

    sendMessage: async(data)=>{
        try {
            const response = await axiosInstance.post(`message/sendmessage?userid=${get().selectedMessageUser._id}`,data)
        } catch (error) {
            console.log("error while sending message ",error);
        }
    },

    getMessages: async()=>{
        try {
            const response = await axiosInstance.get(`message/getAllMessages?userid=${get().selectedMessageUser._id}`)
            console.log("gettng resposne ",response)
            set({messages:response.data.messages})
        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }
}))

export default messageStore;