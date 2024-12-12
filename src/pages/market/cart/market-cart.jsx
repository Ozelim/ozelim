import React from 'react'
import { useCartStore } from './cartStore'

import empty from 'shared/assets/images/empty-cart.png'
import { CartItem } from './cart-item'

export const MarketCart = () => {

  const {cartItems, cartTotalAmount} = useCartStore()

  return (
    <div className='container-market market'>
      <div className='w-full mt-8'>
          <div className='flex flex-col gap-4'>
            {cartItems?.map((item) => {
              return (
                <CartItem 
                  key={item.id}
                  product={item}
                />
              )
            })}
            {cartItems.length === 0 && (
              <div className='flex justify-center items-center'>
                <div className='flex flex-col gap-4'>
                  <img src={empty} alt="" className='max-w-xl' />
                  <p className='text-center'>Корзина пуста</p>
                </div>
              </div>
            )}
          </div>
      </div>
    </div>
  )
}
