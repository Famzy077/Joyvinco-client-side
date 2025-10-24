'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Slider from "react-slick";
import { useEffect, useRef, useState } from 'react';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { ProductCard } from './ProductsCard';

// Data Fetching Function
const API_URL = "https://joyvinco.onrender.com";

const fetchAllProducts = async () => {
  const res = await axios.get(`${API_URL}/api/products`);
  return res.data.data;
};

// --- Main Component (No changes below this line) ---
export const LiquidSoap = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const sectionRef = useRef(null);

  // --- Intersection Observer ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => {
              setShouldFetch(true);
            }, 800); // Delay from your example
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const { data: allProducts, isLoading, error } = useQuery({
    queryKey: ['publicProducts'],
    queryFn: fetchAllProducts,
    enabled: shouldFetch, // Only fetch when scrolled to
  });

  const mobileProducts = allProducts?.filter(
    (product) => product.category === "Liquid Soap"
  );
  
  const settings = {
    dots: false,
    infinite: mobileProducts ? mobileProducts.length > 6 : false, // Better infinite logic
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 1920, 
        settings: { slidesToShow: 5, slidesToScroll: 1, infinite: mobileProducts ? mobileProducts.length > 5 : false },
      },
      {
        breakpoint: 1600,
        settings: { slidesToShow: 5, slidesToScroll: 1, infinite: mobileProducts ? mobileProducts.length > 5 : false },
      },
      {
        breakpoint: 1280, 
        settings: { slidesToShow: 5, slidesToScroll: 1, infinite: mobileProducts ? mobileProducts.length > 5 : false },
      },
      {
        breakpoint: 1024, 
        settings: { slidesToShow: 3, slidesToScroll: 1, infinite: mobileProducts ? mobileProducts.length > 3 : false },
      },
      {
        breakpoint: 768, 
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: mobileProducts ? mobileProducts.length > 2 : false },
      },
      {
        breakpoint: 480, 
        settings: { slidesToShow: 2, slidesToScroll: 1, infinite: mobileProducts ? mobileProducts.length > 2 : false },
      },
    ],
  };

  // --- Settings for Skeleton Slider ---
  const loadingSettings = {
    ...settings,
    infinite: false,
    autoplay: false,
  };

  if (error) {
    return (
      <div ref={sectionRef} className="py-10 text-center">
        <p className="text-red-500">Failed to load Liquid Soap products.</p>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className='container px-4 mx-auto sm:px-3 lg:px-2'>
      {!isVisible ? (
        <div className="flex items-center justify-center py-10 min-h-[250px]">
          <div className="w-8 h-8 border-4 border-gray-300 rounded-full border-t-green-500 animate-spin"></div>
        </div>
      ) : (isLoading || !shouldFetch) ? (
        <Slider {...loadingSettings}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="p-2">
              <ProductCardSkeleton />
            </div>
          ))}
        </Slider>
      ) : mobileProducts && mobileProducts.length > 0 ? (
        <div className="animate-fadeIn"> 
          <Slider {...settings}>
            {mobileProducts.map((product) => (
              <div key={product.id} className="p-2"> 
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        // No products found
        <div className="py-10 text-center text-gray-500">
          <p>No Liquid Soap found at the moment.</p>
        </div>
      )}
    </div>
  );
};