import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useCartStore } from './cartStore'
import { getImageUrl } from 'shared/lib'
import { ActionIcon, Button, CloseButton, Text } from '@mantine/core'

export const CartItem = ({product}) => {

  const total = product?.count * product.price

  const { addToCart, removeFromCart, removeItem } = useCartStore()
  
  return (
    <div className="relative">
      <div className='border p-3 flex justify-between items-center shadow-md'>
        <div className='flex gap-4 max-w-md max-h-[120px] overflow-hidden flex-grow'>
          <img 
            src={getImageUrl(product, product.pics?.[0])} 
            alt={product.title} 
            className='aspect-square max-w-[120px] object-contain' 
          />
          <div className='flex flex-col'>
            <p className='font-semibold text-xl'>
              {product.name}
            </p>
            <Text lineClamp={3} className='mt-2'>
              {product.description}
            </Text>
          </div>
        </div>
        <p className='font-semibold text-lg ' >
          {product.price}$
        </p>
        <div className='flex gap-4'>
          <button onClick={() => removeFromCart(product)} className='text-xl' disabled={product?.count === 1}>
            <AiOutlineMinus/>
          </button>
          <span>
            {product.count}
          </span>
          <button onClick={() => addToCart(product)} className='text-xl' >
            <AiOutlinePlus/>
          </button>
        </div>
        <div className='font-semibold text-lg'>
          {total}$
        </div>
      </div>
      <div className='absolute top-2 right-2 z-10'>
        <CloseButton
          onClick={() => removeItem(product)}
          size={35}
        />
      </div>
    </div>
  )
}