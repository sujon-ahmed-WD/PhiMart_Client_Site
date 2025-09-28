import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { data } from "react-router";

const useAuth = () => {
    const [user, setUser] = useState(null);

    const getToken = () => {
        const token = localStorage.getItem("AuthTokens");
        return token ? JSON.parse(token) : null;
    };
    const [authTokens, setAuthTokens] = useState(getToken());

    useEffect(()=>{
        fetchUserProfile();

    },[setAuthTokens]);

    // Fetch user Profile
    const fetchUserProfile=async()=>{
        
        try{
            const response=await apiClient.post("auth/users/me/",{
                headers:{Authorization: `JWT ${authTokens?.access}`},
            });
            console.log(response.data);
        }
        catch(error)
        {
            console.log("Error Fletching  user",error)
        }
    }


    // Login user
    const loginUser = async (userData) => {
        try{
            const response = await apiClient.post("auth/jwt/create/", userData);
            setAuthTokens(response.data)
            localStorage.setItem("authTokens",JSON.stringify(response.data))

        } 
        catch(error)
        {
            console.log("Login Error",error?.data.response)
        }

    }

    return { user, loginUser }
};
export default useAuth;