import React from 'react'
import {assets} from '../assets/assets'
import {Link} from 'react-router-dom'
const MainBanner = () => {
  return (
    <div className="relative">
      <img src={assets.main_banner_bg} alt="banner" className="w-full hidden md:block" />
      <img src={assets.main_banner_bg_sm} alt="banner" className="w-full md:hidden" />
      <div className='absolute inset-0 flex flex-col items-center md:items-start 
      justify-end md:justify-center pb-24 md:pb-0 px-4 mid:pl-18 lg:pl-24'>
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center md:text-left 
          max-w-2xl leading-snug lg:leading-tight tracking-tight 
          bg-gradient-to-r from-[#4fbf57] to-[#4dae44] bg-clip-text text-transparent">
           GroceryNest – Buy Good,Live Better.
        </h1>

      <div className='flex items-center mt-6 font-medium'>
        <Link to={"/products"} className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dull)] transition rounded text-white cursor-pointer">
        Shop Now
        <img src={assets.white_arrow_icon} alt="arrow" className="md:hidden transition group-focus:translate-x-1" />
        </Link>

        <Link to={"/products"} className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer">
        Explore Deals
        <img src={assets.black_arrow_icon} alt="arrow" className="transition group-hover:translate-x-1"/>
        </Link>
      </div>
      </div>
    </div>
  )
}

export default MainBanner;

