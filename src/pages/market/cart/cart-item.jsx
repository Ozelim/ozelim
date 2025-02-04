import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useCartStore } from './cartStore'
import { formatNumber, getImageUrl } from 'shared/lib'
import { ActionIcon, CloseButton, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

export const CartItem = ({product}) => {

  const total = product?.count * product?.price

  const { addToCart, removeFromCart, removeItem } = useCartStore()
  
  return (
    <div className="relative">
      <div className='border p-3 flex flex-col md:flex-row justify-between items-center shadow-md gap-3'>
        <div className='flex gap-4 max-w-md max-h-[120px] overflow-hidden flex-grow'>
          <Link to={`/market/product/${product.id}`}>
            <img 
              src={getImageUrl(product, product.pics?.[0])} 
              alt={product.title} 
              className='aspect-square max-w-[120px] object-contain' 
            />
          </Link>
          <div className='flex flex-col'>
            <p className='font-semibold text-xl'>
              {product.name}
            </p>
            <Text lineClamp={3} className='mt-2'>
              {product.description}
            </Text>
          </div>
        </div>
        {/* <p className='font-semibold text-lg ' >
          {product.price} ₸
        </p> */}
        <div className='flex gap-3 items-center'>
          <ActionIcon 
            onClick={() => removeFromCart(product)} 
            className='text-xl' 
            disabled={product?.count === 1}
            variant='light'
            bg='gray.2'
            size='md'
          >
            <AiOutlineMinus className='text-black' size={10}/>
          </ActionIcon>
          <span>
            {product.count}
          </span>
          <ActionIcon 
            onClick={() => addToCart(product)} 
            className='text-xl'
            variant='light'
            bg='gray.2'
            size='md'
          >
            <AiOutlinePlus className='text-black' size={10}/>
          </ActionIcon>
        </div>
        <div className='font-semibold text-lg'>
          {formatNumber(total)} ₸
        </div>
      </div>
      <div className='absolute top-1 right-1 z-10'>
        <CloseButton
          onClick={() => removeItem(product)}
          size={20}
          className='text-black'
          bg='gray.2'
        />
      </div>
    </div>
  )
}