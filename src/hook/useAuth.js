import { useEffect, useState } from "react";
import apiClient from "../services/api-client";


const useAuth = () => {
    const [user, setUser] = useState(null);
    const[errorMsg,setErrorMsg]=useState("")

    console.log("SUJON",errorMsg)

    const getToken = () => {
        const token = localStorage.getItem("authTokens");
        return token ? JSON.parse(token) : null;
    };
    const [authTokens, setAuthTokens] = useState(getToken());

    useEffect(()=>{ // ae function kno use korsa bhi 
       if(authTokens) fetchUserProfile();

    },[authTokens]); 

    const handleAPIError =(
        error,defaultMessage="Something Went Wrong! Try Again"
    )=>{
        if(error.response && error.response.data)
           {
                const errorMessage=Object.values(error.response.data).flat().join("\n");
                setErrorMsg(errorMessage)
                return{success:false,message:errorMessage}
           }
           setErrorMsg("Registration failed. Please try again");
        return{
            success:false,
            message:defaultMessage,
        };
    };
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

// Update User Profile
    const updateUserProfile = async (data)=>{
        setErrorMsg(" ");
        try{
            apiClient.put("/auth/users/me/",data,{
                headers: { Authorization: `JWT ${authTokens?.access}` },
            })
        }catch(error){
            console.log(error)
        }

    }

    // Password Change

    const changePassword =async(data)=>{
        setErrorMsg(" ");
        try{
            apiClient.put("/auth/users/set_password/",data,{
                headers: { Authorization: `JWT ${authTokens?.access}` },
            })
        }catch(error){
            return handleAPIError(error)
        }

    }

//-------------------      ----------        -------      ----------            
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
    // register User
    
    const registerUser=async(userData)=>{
        setErrorMsg(" ")
        try{
            await apiClient.post("/auth/users/",userData);
            return{
                success:true,
                message: "Registration successfull. Check your email to activate your account.",
            };

        }
        catch(error){
           return handleAPIError(error,"Registration Failed Error")
           
        }
    };
    // Logout User
    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
    };
    

    return { user, loginUser,errorMsg,registerUser,logoutUser,updateUserProfile,changePassword }
};
export default useAuth;