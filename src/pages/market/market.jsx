import React from 'react'
import { Catalog } from './catalog/catalog'
import { Sidebar } from './sidebar/sidebar'
import { MarketCarousel } from './carousel/market-carousel'
import { useCartStore } from './cart/cartStore'
import { useCategoriesStore } from './categoriesStore'
import { Link } from 'react-router-dom'

export const Market = () => {

  return (
    <div className='w-full '>
      <div className="border-b w-full ">
        <div className='grid grid-cols-[13%_auto] mx-auto container-market market'>
          <p className='text-lg ml-3 uppercase py-4 border-r'>
            все Категории
          </p>
          <div className='px-6 flex gap-4 text-lg py-4 uppercase'>
            <p>Каталог</p>
            <Link to={'/market/weare'}>О нас</Link>
            <p>Доставка</p>
            <p>Гарантия</p>
          </div>
        </div>
      </div>
      <div className="border-b w-full">
        <div className='container-market market mb-4 mx-4'>
          <div className='grid grid-cols-[13%_auto]'>
            <Sidebar/>
            <MarketCarousel/>
          </div>
        </div>
      </div>
      <div className='mt-8 '>
        <Catalog/>
      </div>
    </div>
  )
}