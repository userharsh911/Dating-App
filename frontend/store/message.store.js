import {create} from "zustand";
import axiosInstance from "../api/axiosApi";
import userStore from "./userStore";
const messageStore = create((set,get)=>({
    messages:[],
    allMessageUsers:[],
    selectedMessageUser: null,
    setMessageNull: ()=>set({messages:null}),
    setSelectetMessageUser:value=>set({selectedMessageUser:value}),
    updateMsg:value=>{
        set({messages:[...get().messages,value]})
    },
    messageList: async(user)=>{
        try {
            const response = await axiosInstance.put(`/message/addtomessagelist?otherUser=${user._id}`)
            if(!response.data?.updatedUser){
                return response.data?.message;
            }
            userStore.getState().setUser(response.data.updatedUser);
            return response.data;
        } catch (error) {
            throw error.response?.data?.message;
        }
    },
    getAllMessageUsers: async()=>{
        try {
            const response = await axiosInstance.get('/message/getmessageusers');
            set({allMessageUsers:response.data.users})
        } catch (error) {
            throw error.response?.data?.message;
        }
    },

    sendMessage: async(data)=>{
        try {
            const response = await axiosInstance.post(`message/sendmessage?userid=${get().selectedMessageUser._id}`,data)
            
            set({messages:[...get().messages,response.data.msg]})
            return;
        } catch (error) {
            throw error.response?.data?.message;
        }
    },

    getMessages: async()=>{
        try {
            const response = await axiosInstance.get(`message/getAllMessages?userid=${get().selectedMessageUser._id}`)
            set({messages:response.data.messages})
        } catch (error) {
            throw error.response?.data?.message;
        }
    }
}))

export default messageStore;