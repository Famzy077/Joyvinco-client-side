'use client';
import React, { useEffect, useState } from 'react';
import Section from '@/app/Components/Home/SlidedSection';
import { Call, CallPhone } from '@/app/UI/Call';
import { ProductBaner, ProductBanerTwo} from '@/app/Components/Home/ProductBaner';
import { VivaSanitizer } from '@/app/Components/VivaSanitizer';
import { Toothpaste } from '@/app/Components/Toothpaste';
import { VivaBar} from '@/app/Components/VivaBar';
import {Viva } from '@/app/Components/Viva';
import { Detergents } from '@/app/Components/Detergents';
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
      {/* <Viva products /> */}
        <h1>Viva Products </h1>
        <Link className='text-white font-normal text-sm' href='/categories'>view all</Link>
      </div>
      <Viva />

      <ProductBaner />
      <h1 className="text-3xl flex justify-between font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-green-500 max-sm:text-xl pl-12 max-sm:mt-5 my-6 items-center">
        Viva Sanitizer
        <Link className='text-white font-normal text-sm' href='/categories'>view all</Link>
      </h1>
      <VivaSanitizer />
      <h1 className="text-3xl flex justify-between font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-green-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-6 items-center">
        Viva Bar
        <Link className='text-white font-normal text-sm' href='/categories'>view all</Link>
      </h1>
      < VivaBar />
      <ProductBanerTwo />
      {/* Toothpaste */}
      <h1 className="text-3xl flex justify-between font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-green-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-6 items-center">
        Toothpaste
        <Link className='text-white font-normal text-sm' href='/categories'>view all</Link>
      </h1>
      <Toothpaste />
      <div>
        <h1 className="text-3xl flex justify-between font-bold relative max-sm:mx-0 mx-11.5 p-2 max-sm:rounded-none rounded text-white bg-green-500 max-sm:text-xl pl-12 max-sm:mt-5 mt-6 items-center">
          All Items...
          <Link className='text-white font-normal text-sm' href='/categories'>view all</Link>
        </h1>
        <Detergents />
      </div>
      <Docs />
    </div>
  );
};

export default Page;