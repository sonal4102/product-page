import React from 'react'
import { useState, useEffect } from "react";
import Rating from './Rating'
import { NavLink } from "react-router-dom";

function Products() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const [searchFilter, setSearchFilter] = useState([]);
    const[searchBool, setSearchBool]=useState(false);
    let componentMounted = true;
    let counter = 0;
    const getData = () => {
   
      console.log("Fetching Data ..");
      const getProducts = async () => {
    
        const response = await fetch("https://fakestoreapi.com/products");
        if (componentMounted) {
        
          const searchData = await response.clone().json();
          
          let searchFilterData = searchData.filter((prod) => prod.title.toLowerCase().includes(searchVal.toLowerCase()));
          console.log(searchFilterData);
          setSearchFilter(searchFilterData);
        
        }
  
        return () => {
          componentMounted = false;
        };
      };
      getProducts();
    };
  
    const debounce = function (fn, d, value) {
      console.log(value);
      setSearchVal(value);
      console.log("Fetching Data1 ..");
      let timer;
      let context = this,
        args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        getData();
      }, d);
     
    };
  
    const betterFunction = (e) => {
     
      console.log(e.target.value);
      debounce(getData, 300, e.target.value);
    };
    const onSearch = (e) => {
       console.log("inside onSearch");
       setFilter(searchFilter);
       setSearchFilter([]);
       setSearchBool(true);
    };
     function onSearchSelect(a,b){
       console.log("inside onSearch");
        let searchFilterData = searchFilter.filter((prod) =>
          prod.title.toLowerCase().includes(b.toLowerCase())
        );
        console.log(searchFilterData);
       setFilter(searchFilterData);
       setSearchFilter([]);
       setSearchBool(false);
     };
    useEffect(() => {
      const getProducts = async () => {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (componentMounted) {
          setData(await response.clone().json());
          setFilter(await response.json());
          setLoading(false);
          console.log(filter);
        }
  
        return () => {
          componentMounted = false;
        };
      };
      getProducts();
    }, []);


 

    const filterProduct = (cat) => {
      const updatedList = data.filter((x) => x.category === cat);
      setFilter(updatedList);
    };
   
  return (
    
    <div id="productList"><section>
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
      <header className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
          Product Collection
        </h2>
        <div className="search-container">
  <div className="relative">
    <input
      type="text"
      value={searchVal}
      placeholder="Search Your Product"
      onChange={betterFunction}
      className="w-full rounded-md border border-gray-500 py-3 px-2  pe-10 shadow-sm sm:text-sm"
    />
    <button
      className="absolute inset-y-0 right-0 grid w-10 place-content-center text-gray-600 hover:text-gray-700"
      onClick={() => onSearch(searchVal)}
    >
      <span className="sr-only">Search Products</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </button>
  </div>
  <div className="dropdown">
    {(searchFilter.length > 0 || !searchBool) ? (
      searchFilter.map((item) => (
        <div
          onClick={() => onSearchSelect(searchVal, item.title)}
          className="dropdown-row cursor-pointer px-4 py-2 hover:bg-gray-100"
          key={item.title}
        >
          {item.title}
        </div>
      ))
    ) : (
      <div className="text-center py-2">search result not found !</div>
    )}
  </div>
</div>
        
      </header>


      <div className="buttons space-x-4 flex justify-center mb-5 pb-5 mt-6">
          <button
            className="border border-slate-200 rounded-md py-2 px-4"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
           className="border border-slate-200 rounded-md py-2 px-4"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
             className="border border-slate-200 rounded-md py-2 px-4"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
             className="border border-slate-200 rounded-md py-2 px-4"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="border border-slate-200 rounded-md py-2 px-4"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>
  
      <ul className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-4 ">
        
      {filter ? (
  filter.length > 0 ? (
    filter.map((product) => {
      return (
        <div key={product.id} className="rounded p-4 border-2 border-solid border-slate-100">
          <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">
            <img
              src={product.image}
              alt=""
              className="h-[180px] w-full object-contain transition duration-500 group-hover:scale-105 sm:h-[180px]"
            />
            <div className="relative pt-3 bg-white">
              <h3 className="text-md text-gray-700 group-hover:underline group-hover:underline-offset-4">
                {product.title}
              </h3>
              <p className="mt-2">
                <span className="sr-only"> Regular Price </span>
                <span className="tracking-wider text-gray-900">${product.price}</span>
              </p>
              <Rating rate={product.rating.rate} count={product.rating.count} />
            </div>
          </NavLink>
        </div>
      );
    })
  ) : (
    <p>Loading...</p>
  )
) : (
  <p>Loading...</p>
)}

  
      </ul>
    </div>
  </section></div>
  )
}

export default Products