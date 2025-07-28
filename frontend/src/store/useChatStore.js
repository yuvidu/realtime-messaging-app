import {create} from "zustand";
import {toast} from "react-hot-toast";
import {axiosInstance} from "../lib/axios";

export const usechatstore = create((set) => ({
    messages : [],
    users: [],
    Selecteduser : null,
    isUsersLoading : false,
    isMessagesLoading : false,

    getusers: async () => {
        set({isUsersLoading:true})
        try {
            const response = await axiosInstance.get("/message/getusers");
            set({users:response.data});
            toast.success("user loading successfull !");
            
        } catch (error) {
            console.log(error.respose.data.message);
            
        }finally{
        set({isUsersLoading:false})
        }
    },
    getmessage: async (userId) => {
        set({isMessagesLoading:true})
        try {

            const respose = await axiosInstance.get(`/message/${userId}`);
            set({messages:respose.data})
            toast.success("messages loads successfull !");


        } catch (error) {
            console.log(error.respose.data.message);
            
        }finally{
        set({isMessagesLoading:false})

        }
    },
    setSelecteduser : (selecteduser) => {set({selecteduser})} 
         
}))
