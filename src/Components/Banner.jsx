import React from 'react'

export default function Banner() {
  const scrollToProductList = () => {
    const productListElement = document.getElementById('productList');
    if (productListElement) {
      productListElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (

<>
<div class="relative bg-dark border-0">
  <img src="/assets/bg.jpg" class="w-full object-cover" alt="Background" />
  <div class="absolute inset-0 flex items-center">
    <div class="container px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24">
      <h5 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2">NEW SEASON ARRIVALS</h5>
      <p class="text-base sm:text-2xl mb-8">CHECK OUT ALL THE TRENDS</p>
      <button
        onClick={scrollToProductList}
        class="bg-orange-600 hover:bg-slate-700 text-white text-base sm:text-xl font-bold py-2 px-6 sm:px-8 rounded"
      >
        Buy Now
      </button>
    </div>
  </div>
</div>



</>
  )
}
