import React from 'react'
import Image from 'next/image'
import SectionWatch from '../../../../public/assets/greenLanding.png'
import SectionWatchTwo from '/public/assets/colgate.png'
import Link from 'next/link'

export const ProductBaner = () => {
  return (
    <div className='flex w-[100%]'>
      <Image src={SectionWatch} className='w-[100%] relative h-[80vh] max-sm:h-[33vh]' layout='contain' alt='banner-image' />
      <div className='absolute place-content-center float-left right-0 max-sm:h-fit max-sm:pt-16 h-[80vh] pr-8 max-sm:pr-3 w-[50%]'>
        <h1 className='text-6xl text-white  max-sm:text-[1.9rem] font-bold max-sm:font-semibold'>Enjoy the moment we'll handle the stain</h1>
      </div>
    </div>
  )
}
export const ProductBanerTwo = () => {
  return (
    <div className='flex'>
      <Image src={SectionWatchTwo} className='relative w-[100%] h-[59vh] max-sm:h-[28vh] object-fit lg:h-[87vh]' alt='banner-image' />
      {/* <div className='absolute max-sm:hidden place-content-center left-0 mt-20 max-sm:pt-16 h-[59vh] max-sm:h-[28vh] object-fit lg:h-[87vh] pl-6 max-sm:pr-3 w-[50%]'>
        <Link className='max-sm:hidden' href={'/categories'}>
          <button className='bg-zinc-100 max-sm:hidden px-10 py-4 rounded-[14px] cursor-pointer'>
            Shop Now
          </button>
        </Link>
      </div> */}
    </div>
  )
}