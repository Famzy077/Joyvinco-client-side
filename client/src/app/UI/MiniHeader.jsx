'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Heart, ShoppingCart } from 'lucide-react';
import { FaSpinner } from 'react-icons/fa';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import NoItemImage from '/public/Images/noProduct.png';
import { useCart } from '../hooks/CartContext';

const API_URL = "https://joyvinco.onrender.com";

// --- Reusable Debounce Hook ---
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// --- Data Fetching Function for Search ---
const searchApiProducts = async (query) => {
  if (!query) return [];
  const { data } = await axios.get(`${API_URL}/api/products/search?q=${query}`);
  return data.data;
};

export const MiniHeader = () => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const pathname = usePathname();
  const searchModalRef = useRef(null);
  const router = useRouter();

  // CartItemCount
  const { itemCount } = useCart() || { itemCount: 0 };

  // Use the debounced query to trigger the API call
  const debouncedQuery = useDebounce(query, 300); // 300ms delay

  const { data: results, isLoading } = useQuery({
    queryKey: ['productSearchMobile', debouncedQuery],
    queryFn: () => searchApiProducts(debouncedQuery),
    enabled: !!debouncedQuery,
  });

  // Effect to close search results when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchModalRef.current && !searchModalRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Effect to close search results when the route changes
  useEffect(() => {
    setShowResults(false);
    setQuery('');
  }, [pathname]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowResults(true); // Show results dropdown as soon as user starts typing
  };

  const handleResultClick = (productId) => {
    setShowResults(false);
    setQuery('');
    router.push(`/products/${productId}`);
  };

  return (
    <div className="relative z-40 w-full px-4 py-4 bg-green-100 shadow md:hidden">
      <div className="flex items-center justify-between gap-3">
        <form className="flex w-[85%]" onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            placeholder="Search on Joyvinco"
            value={query}
            onChange={handleSearchChange}
            onFocus={() => setShowResults(true)} // Show results on focus as well
            className="w-full border-2 border-r-0 border-green-500 rounded-l px-4 pr-0 py-[7px] outline-none bg-white text-sm"
          />
          <button type="submit" className="px-3 py-1 text-white bg-green-500 rounded-r">
            <Search size={20} />
          </button>
        </form>

        {/* Cart Icon with Badge */}
        <Link href="/cart">
          <div className="relative m-0 p-1.5 rounded-full hover:bg-green-200 transition-colors">
            <ShoppingCart size={28} className="text-green-500" />
            {itemCount > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1">
                {itemCount}
              </span>
            )}
          </div>
        </Link>
      </div>

      {showResults && query && (
        <div
          ref={searchModalRef}
          className="absolute top-full mt- left-0 right-0 mx-4 bg-white shadow-lg rounded-md rounded-t-none p-3 z-50 max-h-[70vh] overflow-y-auto"
        >
          {isLoading && (
            <div className="flex justify-center p-4">
              <FaSpinner className="text-green-500 animate-spin" />
            </div>
          )}

          {!isLoading && results && results.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleResultClick(item.id)}
                  className="flex items-center gap-2 p-2 text-sm border rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="flex-shrink-0 object-cover w-10 h-10 rounded-md"
                  />
                  <div className="flex-grow overflow-hidden">
                    <p className="text-sm truncate sm:text-xl">{item.name}</p>
                    <p className="text-xs font-bold text-gray-700 sm:text-xl">₦{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && debouncedQuery && results?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-6 overflow-y-hidden">
              <Image
                src={NoItemImage}
                alt="No products found"
                width={100}
                height={100}
                className="opacity-70"
              />
              <p className="mt-3 text-sm text-gray-500">
                No matching products found for "{debouncedQuery}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};