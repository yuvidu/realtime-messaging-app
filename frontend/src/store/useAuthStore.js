import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';



export const useAuthStore = create((set) => ({
    authuser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isLoggingOut: false,
    isLoggin: false,
    isprofileupdating:false,


    checkauth: async ()=> {
        try {
            const response = await axiosInstance.get("/auth/check");
            set({authuser: response.data})   
        } catch (error) {
            console.error("Error checking authentication in authstore:", error);
        }
        finally {
            set({isCheckingAuth: false});
        }
    },
    Signup: async (data)=>{
        set({isSigningUp:true})
        try {
            const signupuserRes = await axiosInstance.post("/auth/signup",data);
            set({authuser:signupuserRes});
            return toast.success("user is signup successfully")
        } catch (error) {
            return toast.error(error.response.data.message)
        }
        finally{
            set({isSigningUp:false})
        }
    },
    Logout: async () => {
        try {
            set({isLoggingOut:true})
            console.log("Logout function calling in authstore");
            const logoutres = await axiosInstance.post("/auth/logout");
            console.log("Logout function post calling in authstore",logoutres);
            set({authuser:null});
            toast.success("Logged out successfully");
            set({isLoggingOut:false})
        
        } catch (error) {
            console.error("Error logging out in authstore:", error);
        }finally{
            set({isLoggingOut:false})
        }
    },
    Logging : async (data) => {
        try {
            set({isLoggingIn:true})
            const loginResponse = await axiosInstance.post("/auth/login", data);
            set({authuser:loginResponse.data});
            console.log("Logging function post calling in authstore",loginResponse);
            toast.success("Logging successfully");


        } catch (error) {
            console.error("Error during logging in authstore:", error);
            toast.error("Failed to log in. Please try again.");
            
        }
        finally {
            set({isLoggingIn:false});
        }

    },
    
    Profileupdating : async (data) => {
        set({isprofileupdating:true});
        try {
            const profileupdateresponse = await axiosInstance.put("/auth/updateprofile",data);
            set({authuser:profileupdateresponse.data.user});
            console.log("updating profile is going at authstore !");
            toast.success("profile updated successfully");

            
        } catch (error) {

            console.error("Error during update profile in authstore:", error);
            toast.error("Failed to update profile. Please try again.");
            
        }finally{
            set({isprofileupdating:false});
        }

    }
}))