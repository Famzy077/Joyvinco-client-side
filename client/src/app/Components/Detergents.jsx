'use client';

import products from '../.././Data/ProductData.json'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from 'react';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import {ProductCard} from '@/app/Components/ProductsCard'


const API_URL = "https://joyvinco.onrender.com";

const fetchAllProducts = async () => {
  const res = await axios.get(`${API_URL}/api/products`);
  return res.data.data;
};

// DETERGENTS COMPONENT WITH INTERSECTION OBSERVER
export const Detergents = () => {
  // State for scroll detection
  const [isVisible, setIsVisible] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => {
              setShouldFetch(true);
            }, 800);
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

  const detergentProducts = allProducts?.filter(
    (product) => product.category === "Detergents"
  );
  
  const settings = {
    dots: false,
    infinite: detergentProducts ? detergentProducts.length > 6 : false,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      { breakpoint: 1920, settings: { slidesToShow: 6, slidesToScroll: 1, infinite: detergentProducts ? detergentProducts.length > 6 : false } },
      { breakpoint: 1600, settings: { slidesToShow: 5, slidesToScroll: 1, infinite: detergentProducts ? detergentProducts.length > 5 : false } },
      { breakpoint: 1280, settings: { slidesToShow: 5, slidesToScroll: 1, infinite: detergentProducts ? detergentProducts.length > 5 : false } },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1, infinite: detergentProducts ? detergentProducts.length > 3 : false } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: detergentProducts ? detergentProducts.length > 2 : false } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: detergentProducts ? detergentProducts.length > 2 : false } },
    ],
  };

  const loadingSettings = {
    ...settings,
    infinite: false,
    autoplay: false,
  };

  if (error) {
    return (
      <div ref={sectionRef} className="py-10 text-center">
        <p className="text-red-500">Failed to load Detergents products.</p>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className='container px-4 pb-6 mx-auto sm:px-3 lg:px-1'>
      {!isVisible ? (
        // Loading spinner before section is visible
        <div className="flex items-center justify-center py-10">
          <div className="w-8 h-8 border-4 border-gray-300 rounded-full border-t-green-500 animate-spin"></div>
        </div>
      ) : isLoading || !shouldFetch ? (
        // Show skeleton cards
        <Slider {...loadingSettings}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="p-2">
              <ProductCardSkeleton />
            </div>
          ))}
        </Slider>
      ) : detergentProducts && detergentProducts.length > 0 ? (
        // Show actual products
        <div className="animate-fadeIn">
          <Slider {...settings}>
            {detergentProducts.map((product) => (
              <div key={product.id} className="p-2">
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="py-10 text-center text-gray-500">
          <p>No Detergents found at the moment.</p>
        </div>
      )}
    </div>
  );
};

export const AccessoriesStick = () => {
  const accessories = products.filter((product) => product.category === "Accessories").reverse();

  return (
    <div className="flex w-full gap-4 p-4 mb-5 overflow-x-auto overflow-y-hidden scrollbar-hide max-sm:mb-2">
      {accessories.map((product) => (
        <div
          key={product.id}
          className="min-w-[10rem] flex-shrink-0"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};