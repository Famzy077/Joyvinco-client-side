import React from 'react'
import { FaBoxOpen } from "react-icons/fa";
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Voucher = () => {
    const [voucher, setVoucher] = useState(null)
    useEffect(() => {
       setVoucher('You\'re not eligible for the voucher yet')
    }, [])
  return (
    <>
      <div className='grid sm:gap-20 sm:grid-cols-2'>
        <div>
          <h1 className='mb-5 text-2xl font-semibold max-sm:text-xl sm:font-medium'>Welcome to voucher page</h1>
          <div className='border rounded-[5px] items-center flex max-sm:gap-3 max-sm:w-[100%] lg:w-[400px] py-5 border-zinc-400 justify-between px-4 py-2'>
            <h1 className='text-zinc-600'>{voucher}</h1>
            <div>
              <FaBoxOpen className='text-[2.5rem] text-zinc-600'/>
            </div>
          </div>
        </div>
        <div>
          <p className='mt-4 mb-2 text-start text-zinc-600'>Shop more to be eligible for the free voucher</p>
          <Link href="/home">
            <Button>Visit product page</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Voucher