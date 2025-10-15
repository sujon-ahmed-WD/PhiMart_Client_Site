import apiClient from "../services/api-client"
const useCart = async () => {
    const createCart =async() =>{
        try{
            const response=await apiClient.post("/carts/")
                console.log(response.data)
        } catch (error){
            console.log(error)
        }
    };
    return {createCart};

};

export default useCart;