import React from 'react'
import { Catalog } from './catalog/catalog'
import { Sidebar } from './sidebar/sidebar'
import { MarketCarousel } from './carousel/market-carousel'
import { useCartStore } from './cart/cartStore'
import { useCategoriesStore } from './categoriesStore'
import { Link } from 'react-router-dom'

export const Market = () => {

  return (
    <div className='market mb-4 mx-4'>
      <div className='grid grid-cols-[13%_auto]'>
        <Sidebar/>
        <div className='border'> 
          <div className='px-6 flex gap-4 text-lg py-4 uppercase border-b'>
            <p>Каталог</p>
            <Link to={'/market/weare'}>О нас</Link>
            <p>Доставка</p>
            <p>Гарантия</p>
          </div>
          <MarketCarousel/>
          <div className='mt-8'>
            <Catalog/>
          </div>
        </div>
      </div>
    </div>
  )
}