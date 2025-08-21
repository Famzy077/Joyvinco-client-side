'use client'
import React, { useState } from "react";

const Docs = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="px-16 py-20 max-sm:px-5 bg-green-200 max-sm:hidden">
      <main className="p-7 max-sm:px-3 bg-white rounded-xl shadow-xl">
        <h1 className="text-2xl max-sm:text-xl py-2 font-semibold text-zinc-800">
          Joyvinco - Trusted Detergent & Toothpaste Distributor
        </h1>
        <h2 className="max-sm:text-[17px] text-xl py-1 font-bold text-zinc-600">
          Bringing Premium Cleaning & Oral Care Products Across Africa
        </h2>
        <p className="text-zinc-600 max-sm:text-[15px]">
          Welcome to Joyvinco, your reliable partner in Nigeria, Ghana, Côte d’Ivoire,
          and beyond for high-quality detergents, soaps, dishwashing liquids, and oral care products.  
          We deliver trusted brands that keep your clothes, dishes, and teeth sparkling clean.
        </p>

        {showMore && (
          <>
            <h1 className="text-xl max-sm:text-[17px] pt-2 pb-1 font-bold text-zinc-600">
              Our Products
            </h1>
            <ul className="text-zinc-600 max-sm:text-[15px] list-disc pl-5">
              <li><span className="font-bold">Viva Green</span> – Washing powder that deeply cleanses clothes.</li>
              <li><span className="font-bold">Fizz Soap</span> – Bathing soap with refreshing fragrance.</li>
              <li><span className="font-bold">Viva Plus Sanitizer</span> – Powder detergent that whitens and protects fabric colors.</li>
              <li><span className="font-bold">Oracare Toothpaste</span> – Complete protection for your teeth and gums.</li>
              <li><span className="font-bold">Fizz Detergent</span> – Powder detergent for effective and fresh cleaning.</li>
              <li><span className="font-bold">Viva Dishwash</span> – Dishwashing liquid for spotless and sparkling dishes.</li>
              <li><span className="font-bold">Viva Gold</span> – Luxury detergent infused with premium perfumes.</li>
              <li><span className="font-bold">Biotol & Siri Soaps</span> – Soaps with natural and luxury fragrances for everyday freshness.</li>
              <li><span className="font-bold">Viva White & Lemon Soaps</span> – Multipurpose soaps for laundry and bathing.</li>
            </ul>

            <h1 className="text-xl max-sm:text-[17px] pt-2 pb-1 font-bold text-zinc-600">
              Why Choose Joyvinco?
            </h1>
            <p className="text-zinc-600 max-sm:text-[15px]">
              ✅ Free Shipping on bulk orders <br />
              ✅ 100% Secure Payment Options <br />
              ✅ 30-Day Return Guarantee <br />
              ✅ 24/7 Fast & Reliable Support
            </p>

            <h1 className="text-xl max-sm:text-[17px] pt-2 pb-1 font-bold text-zinc-600">
              Fast Delivery Across Nations
            </h1>
            <p className="text-zinc-600 max-sm:text-[15px]">
              Whether in Nigeria, Ghana, or Côte d’Ivoire, we ensure quick delivery of all your detergent
              and oral care needs, right to your doorstep.
            </p>

            <h1 className="text-xl max-sm:text-[17px] pt-2 pb-1 font-bold text-zinc-600">
              🛒 Partner with Joyvinco Today
            </h1>
            <p className="text-zinc-600 max-sm:text-[15px]">
              Place your orders with confidence. Join thousands of happy customers who trust Joyvinco 
              for quality, affordability, and reliable distribution across Africa.
            </p>
          </>
        )}

        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-4 text-green-600 hover:underline font-semibold"
        >
          {showMore ? "Show Less ▲" : "Read More ▼"}
        </button>
      </main>
    </div>
  );
};

export default Docs;
