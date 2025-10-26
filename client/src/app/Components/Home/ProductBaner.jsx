import React from 'react'
import Image from 'next/image'
import SectionWatch from '../../../../public/assets/greenLanding.png'
import SectionWatchTwo from '/public/assets/colgate.png'
import Link from 'next/link'

export const ProductBaner = () => {
  return (
    <div className='flex w-[100%]'>
      <Image src={SectionWatch} className='w-[100%] relative h-[28vh] sm:h-fit' layout='contain' alt='banner-image' />
      <div className='absolute place-content-center float-left right-0 max-sm:h-fit max-sm:pt-16 h-[80vh] pr-8 max-sm:pr-3 w-[50%]'>
        <h1 className='text-6xl text-white  max-sm:text-[1.9rem] font-bold max-sm:font-semibold'>Enjoy the moment we'll handle the stain</h1>
      </div>
    </div>
  )
}
export const ProductBanerTwo = () => {
  return (
    <div className='flex'>
      <Image src={SectionWatchTwo} className='relative w-[100%] h-[28vh] sm:h-fit' alt='banner-image' />
    </div>
  )
}