import React from 'react'
import { Catalog } from './catalog/catalog'
import { Sidebar } from './sidebar/sidebar'
import { MarketCarousel } from './carousel/market-carousel'

export const Market = () => {

  return (
    <div className='market'>
      <div className='grid grid-cols-[12%_auto] gap-4'>
        <Sidebar/>
        <div> 
          <MarketCarousel/>
          <div className='mt-8'>
            <Catalog/>
          </div>
        </div>
      </div>
    </div>
  )
}
