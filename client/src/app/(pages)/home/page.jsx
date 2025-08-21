'use client';
import React, { useEffect, useState } from 'react';
import Section from '@/app/Components/Home/SlidedSection';
import { Call, CallPhone } from '@/app/UI/Call';
import {ProductBaner, ProductBanerTwo} from '@/app/Components/Home/ProductBaner';
import { SmartwatchCarousel } from '@/app/Components/WatchCarousel';
import { PowerBank } from '@/app/Components/PowerBank';
import { Laptops} from '@/app/Components/Laptop';
import {Viva } from '@/app/Components/Mobile';
import { Accessories } from '@/app/Components/Accessories';
import Link from 'next/link';
import Docs from '../../UI/Docs';

// Spinner Component
const Spinner = () => (
  <div className="flex items-center justify-center min-h-[80vh]">
    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Page = () => {
  const [loading, setLoading] = useState(true);

  //loading for 1 second to simulate initial data processing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="bg-green-50">
      <Call />
      <Section />
      
      <hr className='my-5' />
      <CallPhone />
      <div className="text-3xl flex justify-between font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-green-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-6 items-center">
        <h1>Viva Products </h1>
        <Link className='text-white font-normal text-sm' href='/categories'>view all</Link>
      </div>
      <Viva />
      {/* <Viva products /> */}
      <ProductBaner />
      <h1 className="text-3xl flex justify-between font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-green-500 max-sm:text-xl pl-12 max-sm:mt-5 my-6 items-center">
        Viva Sanitizer
        <Link className='text-white font-normal text-sm' href='/categories'>view all</Link>
      </h1>
      <SmartwatchCarousel />
      <h1 className="text-3xl flex justify-between font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-green-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-6 items-center">
        Viva Bar
        <Link className='text-white font-normal text-sm' href='/categories'>view all</Link>
      </h1>
      <Laptops />
      <ProductBanerTwo />
      {/* Toothpaste */}
      <h1 className="text-3xl flex justify-between font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-green-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-6 items-center">
        Toothpaste
        <Link className='text-white font-normal text-sm' href='/categories'>view all</Link>
      </h1>
      <PowerBank />
      <div>
        <h1 className="text-3xl flex justify-between font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-green-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-6 items-center">
          All Items...
          <Link className='text-white font-normal text-sm' href='/categories'>view all</Link>
        </h1>
        <Accessories />
        {/* <AccessoriesStick /> */}
      </div>
      <Docs />
    </div>
  );
};

export default Page;