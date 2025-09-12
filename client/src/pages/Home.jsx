import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories  from '../components/Categories'
import Selling_Products from '../components/Selling_Products'

const Home = () => {
  return (
    <div className='mt-10'>
        <MainBanner/>
        <Categories/>
        <Selling_Products/>
    </div>
  )
}

export default Home
