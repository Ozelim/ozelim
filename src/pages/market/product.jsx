import React from 'react'
import { ActionIcon, Button, Rating, Text } from '@mantine/core'
import { Link } from 'react-router-dom'
import { formatNumber, getImageUrl } from 'shared/lib'
import { useCartStore } from './cart/cartStore'

import { CiCircleCheck, CiCirclePlus } from "react-icons/ci";

export const Product = ({product, preview, buttons}) => {

  const { addToCart, cartItems } = useCartStore()

  const addedToCart = cartItems?.find((q) => q?.id === product?.id)

  const productRating = product?.rating !== '' ? product?.rating : 0

  if (preview) {
    return (
      <div className='flex flex-col border h-full bg-white shadow-equal max-w-[308px]'>
        {(product?.pics?.[0] instanceof File || product?.pics?.[0] instanceof Blob) 
          ?
            <img
              src={product?.pics?.[0] && URL.createObjectURL(product?.pics?.[0])}
              alt=""
              className="aspect-square object-cover rounded-primary"
            />
          : 
            !product?.pics?.[0] ? (
              <div className='aspect-square bg-slate-200'/>
            ) : 
            <img 
              src={getImageUrl(product, product?.pics?.[0])}
              alt="" 
              className='aspect-square object-cover rounded-primary'
            />
        }
        <div className="p-4 flex flex-col h-full">
          <Text lineClamp={2}>
            <p className='!market'>
              {product?.name}
            </p>
          </Text>
          <Text className='mt-2 !text-[15px]' lineClamp={3}>
            <p className='!market'>
              {product?.description}
            </p>
          </Text>
          <div className="mt-auto">
            <p className='mt-3.5 font-bold text-primary-500'>{formatNumber(product?.price)} ₸</p>
            <div className='flex gap-2 items-center mt-1'>
              <Rating size='xs' value={productRating} fractions={2}/> <span className='text-xs text-slate-400'>({productRating})</span>
            </div>
        </div>
          {buttons}
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col border h-full bg-white shadow-equal rounded-primary'>
      <Link to={`/duken/product/${product?.id}`}>
        <img 
          src={getImageUrl(product, product?.pics?.[0])}
          alt="" 
          className='aspect-auto object-cover h-[308px] rounded-t-primary mx-auto'
        />
      </Link>
  
      <div className="p-4 flex flex-col h-full">
        <Text lineClamp={2}>
          <p className='market'>
            {product?.name}
          </p>
        </Text>
        <Text className='mt-2 !text-[15px] ' lineClamp={3}>
          <p className='market'>
            {product?.description}
          </p>
        </Text>
        <div className='mt-auto'>
          {product?.discount?.status === 'active' && (
            <div className='mt-3.5 flex items-center gap-2'>
              <p className='font-bold text-primary-500'>{formatNumber(product?.price - (product?.price * (product?.discount?.percent / 100)))} ₸</p>
              <p className='text-gray-400 line-through'>{formatNumber(product?.price)} ₸</p>
              <p className='text-gray-400 text-sm'>-{product?.discount?.percent}%</p>
            </div>
          )}
          {(!product?.discount?.status || !(product?.discount?.status === 'active')) && (
            <p className='mt-3.5 font-bold text-primary-500'>{formatNumber(product?.price)} ₸</p>
          )}
          <div className='flex gap-2 items-center mt-1'>
            <Rating size='xs' readOnly value={productRating} fractions={2}/> <span className='text-xs text-slate-400'>({productRating})</span>
          </div>
        </div>
      </div>
    </div>
  )
}