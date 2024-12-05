import { create } from "zustand";
import axios from "axios";
axios.default.withCredentials = true;

//fuction take setter:set as a argument
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_API}/signup`,
        {
          email,
          password,
          name,
        }
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error in Signing Up",
        isLoading: false,
      });
      throw error;
    }
  },
  verifyemail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_API}/verify-email`,
        { code }
      );
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data
    } catch (error) {
      set({
        error: error.response.data.message || "Error in Verifying",
        isLoading: false,
      });
      throw error;
    }
  },
  checkAuthentication:async()=>{
    set({ isCheckingAuth: true, isLoading: true, error: null });
    try {
        const response = await axios.get(`${import.meta.env.VITE_AUTH_API}/check-auth`,{withCredentials: true })
        set({user:response.data.user,isAuthenticated:true,isCheckingAuth:false,isLoading: false})
    } catch (error) {
        set({error:null,isCheckingAuth:false,isAuthenticated:false,isLoading: false})
    }
  },
  logIn:async(email,password)=>{
    set({isLoading:true,error:null})
    try {
        const response = await axios.post(`${import.meta.VITE_AUTH_API}/login`,{email,password})
        set({user:response.data.user,isLoading:false,error:null,isAuthenticated:true})
    } catch (error) {
        set({
            error: error.response.data.message || "Error in Signing Up",
            isLoading: false,
          });
          throw error;
    }
  }
}));
