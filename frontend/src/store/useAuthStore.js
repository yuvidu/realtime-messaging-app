import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';



export const useAuthStore = create((set) => ({
    authuser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

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
    }
}))