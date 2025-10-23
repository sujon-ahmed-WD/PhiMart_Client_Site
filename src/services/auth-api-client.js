import axios from "axios";

const authApiClient= axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});
export default authApiClient

authApiClient.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem("authTokens");

        if(token)

        {
            const access=JSON.parse(token)?.access
            // console.log("Hello wordl",access)
            config.headers.Authorization =`JWT ${access}`
            // console.log("Cheakinge Token .. .. .. ",JSON.parse(token))
            // console.log("Cheakinge Token .. .. .. ",token.["access"])
        }
        return config
    },
    (error)=>Promise.reject(error)
);