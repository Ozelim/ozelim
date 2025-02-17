import React from 'react'
import { Catalog } from './catalog/catalog'
import { Sidebar } from './sidebar/sidebar'
import { MarketCarousel } from './carousel/market-carousel'
import { useCartStore } from './cart/cartStore'
import { useCategoriesStore } from './categoriesStore'
import { Link, useLocation } from 'react-router-dom'
import { useProductsStore } from './catalog/producsStore'
import { Product } from './product'

export const Market = () => {

  const {products, getAllProducts} = useProductsStore()

  React.useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <div className='w-full '>
      <div className="bg-white border-b w-full">
        <div className='grid grid-cols-[13%_auto] mx-auto container-market market'>
          <p className='text-lg ml-3 uppercase py-4 border-r'>
            все Категории
          </p>
          <div className='px-6 flex gap-4 text-lg py-4 uppercase'>
            <Link to={'/duken/catalog'}>Каталог</Link>
            <Link to={'/duken/weare'}>О нас</Link>
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
      <div className='container-market grid grid-cols-5 gap-x-4 gap-y-8 !mt-8'>
        {products?.items?.map((q, i) => {
          return (
            <div className="mx-auto" key={i}>
              <Product product={q} />
            </div>
          )
        })}
      </div>
      <div className="w-full bg-primary-500 py-8 mt-8">
        <div className="container-market text-white market">
          <div className="grid grid-cols-2 gap-4">
            <div className='text-2xl'>Подпишитесь на наши обновления</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}