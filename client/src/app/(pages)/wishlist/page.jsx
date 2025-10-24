'use client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/app/hooks/WishlistContext.jsx';
import { FaHeart, FaSpinner } from 'react-icons/fa';
import Image from 'next/image';
import Docs from '../../UI/Docs';
import { AddToCartButton } from '@/app/Components/cart/AddToCartButton';
import { Phone } from 'lucide-react';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, isLoading, error } = useWishlist();
  const totalPrice = wishlist.reduce((sum, product) => sum + product.price, 0);
  // Show a spinner while the wishlist data is being fetched
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[85vh]'>
        <FaSpinner className="text-green-500 animate-spin" size={32}/> 
      </div>
    );
  }

  // Show a clear error message if the API call fails
  if (error) {
    return <div className="p-5 text-center text-red-500">Error loading your wishlist. Please try again.</div>;
  }
  
  // Show a helpful message if the wishlist is empty
  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="p-5 text-center min-h-[85vh] flex flex-col items-center justify-center">
        <p className="mb-4 text-2xl">You have no items in your wishlist yet 💔</p>
        <Link href="/categories">
          <button className="px-6 py-2 font-semibold text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600">
            Start Exploring
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className='bg-zinc-100'>
      <div className="p-5 overflow-y-scroll lg:px-20 bg-zinc-100 max-sm:px-5">
        <h1 className="mb-6 font-sans text-4xl font-medium max-sm:text-2xl">Your Wishlist</h1>
        <div className="grid gap-4 max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-14">
          {wishlist.map((product) => {
            if (!product) return null; // Safety check in case of null data
              
            const displayImage = product.images?.[0]?.url || '/Images/placeholder.png';
            return (
              <div key={product.id} className="relative flex flex-col p-2 transition-shadow duration-300 bg-white rounded-lg shadow-md group hover:shadow-lg">
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute text-xl bg-white rounded-full p-1.5 top-2 right-2 text-red-500 z-10 shadow-sm"
                >
                  <FaHeart />
                </button>

                <Link href={`/products/${product.id}`} className="flex flex-col flex-grow">
                  <div className="flex items-center justify-center flex-grow p-4 py-2 h-">
                    <Image
                      src={displayImage}
                      alt={product.name}                      
                        height={100}
                        width={100}
                      className="max-h-full h-[90px] w-auto object-contain"
                    />
                  </div>
                  <div className="p-3 py-1 text-center border-t">
                    <h1 className="text-[1.2rem] max-sm:text-[0.9rem] font-semibold truncate">{product.name}</h1>
                    <p className="font-bold text-sm max-sm:text-[13px] mt-1">₦{product.price.toLocaleString()}</p>
                    
                  </div>
                </Link>
                <AddToCartButton productId={product.id} />
              </div>
            );
          })}
        </div>
        
        <div className="text-center flex max-sm:flex-col justify-center rounded-[10px] w-auto gap-4 max-sm:pb-5">
          <div className='flex gap-2.5 items-center border-green-500 border w-[300px] max-sm:w-[100%] justify-center p-2 rounded-[5px]'>
            <p className="text-xl font-semibold text-gray-800">Total Price =</p>
            <p className="text-xl font-bold text-gray-600">₦{totalPrice.toLocaleString()}</p>
          </div>
          <a href="tel:+2349069905126">
            <button className='text-xl w-full max-sm:text-[14px] border border-green-500 text-white rounded-[5px] bg-green-500 hover:bg-green-600 py-1.5 px-6 cursor-pointer font-semibold transition-colors flex gap-2 items-center justify-center'>
              <Phone className="max-sm:text-sm" size={28}/>
              Call to order
            </button>
          </a>
        </div>
      </div>
      <Docs />
    </div>
  );
};

export default WishlistPage;