import React from 'react'
import { Sidebar } from './sidebar/sidebar'
import { MarketCarousel } from './carousel/market-carousel'
import { Link } from 'react-router-dom'
import { useProductsStore } from './catalog/producsStore'
import { Product } from './product'

export const Market = () => {

  const {products, getAllProducts, rareProducts, discountProducts, getRareProducts, getDiscountProducts} = useProductsStore()

  React.useEffect(() => {
    getAllProducts()
    getRareProducts()
    getDiscountProducts()
  }, [])

  return (
    <div className='w-full'>
      <div className="bg-white border-b w-full">
        <div className='grid xl:grid-cols-[15%_auto] mx-auto container-market market'>
          <p className='text-base md:text-lg ml-3 uppercase py-3 md:py-4 border-b md:border-b-0 md:border-r text-center md:text-left whitespace-nowrap'>
            все Категории
          </p>
          <div className='px-3 md:px-6 flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 text-base md:text-lg py-3 md:py-4 uppercase'>
            <Link to={'/duken/catalog'}>Каталог</Link>
            <Link to={'/duken/weare'}>О нас</Link>
            <p>Доставка</p>
            <p>Гарантия</p>
          </div>
        </div>
      </div>
      <div className="border-b w-full">
        <div className='container-market market mb-4 mx-2 md:mx-auto'>
          <div className='grid md:grid-cols-[15%_auto]'>
            <Sidebar/>
            <MarketCarousel/>
          </div>
        </div>
      </div>
      <div className='container-market grid sm:grid-cols-2 min-[1024px]:grid-cols-3 min-[1200px]:grid-cols-4 min-[1450px]:grid-cols-5 gap-x-2 md:gap-x-4 gap-y-4 md:gap-y-8 !mt-4 md:!mt-8'>
        {products?.items?.map((q, i) => {
          return (
            <div className="mx-auto" key={i}>
              <Product product={q} />
            </div> 
          )
        })}
      </div>
      <div className="w-full bg-primary-500 py-6 md:py-8 mt-6 md:mt-8">
        <div className="container-market text-white market px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='text-xl md:text-2xl text-center md:text-left'>Подпишитесь на наши обновления</div>
            <div></div>
          </div>
        </div>
      </div>

      <div className='container-market market !mt-8'>
        <p className='text-xl border-b-2 pb-2'>Экслюзивные товары</p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-4 gap-y-4 md:gap-y-8 !mt-4'>
          {rareProducts?.map((q) => {
            return (
              <Product key={q?.id} product={q} />
            )
          })}
        </div>
      </div>

      <div className='container-market market !mt-8'>
        <p className='text-xl border-b-2 pb-2'>Скидки дня</p>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-4 gap-y-4 md:gap-y-8 !mt-4'>
          {discountProducts?.map((q) => {
            return (
              <Product key={q?.id} product={q} />
            )
          })} 
        </div>  
      </div>
    </div>
  )
}