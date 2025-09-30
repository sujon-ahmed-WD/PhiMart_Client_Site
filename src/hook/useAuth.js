import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { data } from "react-router";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const[errorMsg,setErrorMsg]=useState(" ")
    console.log(errorMsg)

    const getToken = () => {
        const token = localStorage.getItem("authTokens");
        return token ? JSON.parse(token) : null;
    };
    const [authTokens, setAuthTokens] = useState(getToken());

    useEffect(()=>{ // ae function kno use korsa bhi 
       if(authTokens) fetchUserProfile();

    },[authTokens]); 
// User FetchUser karon ta holo user tokens golo pawor jonno .. .. .. .. .. 
const fetchUserProfile = async () => { 
    try {
        const response = await apiClient.get("auth/users/me/", {
            headers: { Authorization: `JWT ${authTokens?.access}` },
        });
        setUser(response);
    } catch (error) {
       
            console.log("Error Fetching user:", error.response.data); 
        
    }
};


    // Login user
    const loginUser = async (userData) => {
        setErrorMsg("")
        try{
            const response = await apiClient.post("auth/jwt/create/", userData);
            setAuthTokens(response.data)
            localStorage.setItem("authTokens",JSON.stringify(response.data))
        } 
        catch(error)
        {
            console.log("Login Error",error.response.data?.detail)
            setErrorMsg(error.response.data?.detail)
        }

    }

    return { user, loginUser,errorMsg }
};
export default useAuth;