import {create} from "zustand";
import {toast} from "react-hot-toast";
import {axiosInstance} from "../lib/axios";

export const usechatstore = create((set,get) => ({
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
    getmessages: async (userId) => {
        set({isMessagesLoading:true})
        try {

            const respose = await axiosInstance.get(`/message/${userId}`);
            set({messages:respose.data})
            toast.success("messages loads successfull !");


        } catch (error) {
            toast.error(error.respose.data.message);
            
        }finally{
        set({isMessagesLoading:false})

        }
    },
    sendmessage : async (messageData)=>{
        const {Selecteduser,messages} = get();
        try {
            const response = await axiosInstance.post(`/message/send/${Selecteduser._id}`,messageData);
            set({messages:[...messages,response.data]})
            toast.success("message sent successfully !");
        } catch (error) {
            toast.error(error.respose.data.message);
        }
    },
    setSelecteduser : (Selecteduser) => {set({Selecteduser})} 
         
}))
