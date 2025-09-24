import { useState } from "react";
import Products_list from "./Products_list";
import Paginations from "./Paginations";
import useFetchProduct from "../hooks/useFetchProducts.js";
import FilterSection from "./FilterSection";
import useFetchCategories from "../hooks/useFetchCategories.js";

const ShopPage = () => {
  const [currentPage, SetcurrentPage] = useState(1);
  const [priceRange, SetpriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelecetedCategory] = useState(" ");
   const [searchQuery, setSearchQuery] = useState("");
   const [sortOrder, setOrder] = useState("");
  const { products, loading, totalPages } = useFetchProduct(
    currentPage,
    priceRange,
    selectedCategory,
    searchQuery,
    sortOrder

  );

  const handlePageChange = (index, value) => {
    //(1,100)     // minum[0]=20 // maximum[1]=100
    SetpriceRange((prev) => {
      const newRange = [...prev];
      newRange[index] = value;
      return newRange;
      /** newRange = [0, 1000]   // আগের মান কপি
                newRange[0] = 200  // index=0 মানে Minimum value */
    });
    SetcurrentPage(1);
  };

  const categories = useFetchCategories();

  // const fetchProducts =()=>{
  //     Setloding(true)
  //     apiClient
  //     .get("/products")
  //     .then((res)=>{
  //         SetProducts(res.data.results);
  //         SetTotalPages(Math.ceil(res.data.count/ res.data.results.length));

  //     })
  //     .catch((err)=>console.log(err))
  //     .finally(()=>Setloding(false))
  // }

  return (
    <div className=" mx-auto px-4 py-8 gap-6">
      <FilterSection
        priceRange={priceRange}
        handlePageChange={handlePageChange}
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={setSelecetedCategory}
        searchQuery={searchQuery}
        handleSearchQuery={setSearchQuery}
        sortOrder={sortOrder}
        handleSorting={setOrder}
      />
      <Products_list products={products} loading={loading} />
      <Paginations
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={SetcurrentPage}
      />
    </div>
  );
};

export default ShopPage;
