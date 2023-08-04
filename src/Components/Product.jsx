import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Rating from './Rating'
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
      
      <nav aria-label="Breadcrumb" className="flex">
  <ol
    className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600"
  >
    <li className="flex items-center">
      <a
        href="/"
        className="flex h-10 items-center gap-1.5 bg-gray-100 px-4 transition hover:text-gray-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>

        <span className="ms-1.5 text-xs font-medium"> Home </span>
      </a>
    </li>

    <li className="relative flex items-center">
      <span
        className="absolute inset-y-0 -start-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"
      >
      </span>

      <a
        href="#"
        className="flex h-10 items-center bg-white pe-4 ps-8 text-xs font-medium transition hover:text-gray-900"
      >
       {product.category}
      </a>
    </li>
  </ol>
</nav>








<div className="px-16 py-2 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
      
        <div>
        <img src={product.image} alt={product.title} height="300px" width="400px" />
        </div>
  
   
        <div>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-black text-sm font-semibold"> {product.category}</div>
     
        <div className=" px-1 pt-4 ">
      <h1 className="text-xl font-semibold">{product.title}</h1>
    </div>
      <div className="py-2 px-1"><Rating rate={product.rating && product.rating.rate} count={product.rating && product.rating.count} /></div>  
          <h3 className="px-1 font-semibold">$ {product.price}</h3>
          <p className="px-1 py-4">{product.description}</p>
          <button  onClick={() => addProduct(product)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
      
      </>
    );
  };

  return (
    <div>
     
          {loading ? <Loading /> : <ShowProduct />}
       
    </div>
  );
};

export default Product;
