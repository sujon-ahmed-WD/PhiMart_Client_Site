import { useEffect, useState } from "react"
import apiClient from "../../services/api-client";

const useFetchProduct =(currentPage,priceRange,selectedCategory,searchQuery,sortOrder)=>{
    const[products,SetProducts]=useState([])
    const[loading,Setloding]=useState(false)
    const[totalPages,SetTotalPages]=useState(0);
    useEffect(()=>{
            const fetchProducts =async ()=>{
        Setloding(true);
        const url=`/products/?price__gt=${priceRange[0]}&price__lt=${priceRange[1]}&page=${currentPage}&category_id=${selectedCategory}&search=${searchQuery}&ordering=${sortOrder}`
        
    try {
            const response= await apiClient.get(url)
            const data=await response.data;

            SetProducts(data.results);
            SetTotalPages(Math.ceil(data.count/ data.results.length));
        }catch (error){
            console.log(error)
        } finally{
            Setloding(false)

        }
    };
    fetchProducts() ;
    },[currentPage,priceRange,selectedCategory,searchQuery,sortOrder]) ;
    return {products,loading,totalPages}
 }

export default useFetchProduct;