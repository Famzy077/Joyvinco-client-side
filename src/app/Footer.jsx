import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className='bg-green-800/90 text-white py-4 text-center max-sm:hidden'>
          {FooterText}
          <p>Follow us on:</p>
          <div className='flex justify-center space-x-4'>
            <a href='#' className='text-green-300'>Facebook</a>
            <a href='#' className='text-green-300'>Twitter</a>
            <a href='#' className='text-green-300'>Instagram</a>
          </div>
        </footer>
    </div>
  )
}
const Year = new Date().getFullYear()
const FooterText = `© ${Year} Joyvinco Ventures. All rights reserved.`

export default Footer
