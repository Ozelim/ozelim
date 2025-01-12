import React from 'react'
import { Button, Rating, Text } from '@mantine/core'
import { Link } from 'react-router-dom'
import { formatNumber, getImageUrl } from 'shared/lib'
import { useCartStore } from './cart/cartStore'

export const Product = ({product, preview, buttons}) => {

  const { addToCart, cartItems } = useCartStore()

  const addedToCart = cartItems?.find((q) => q?.id === product?.id)

  if (preview) {
    return (
      <div className='flex flex-col border h-full w-[277px]'>
        {(product?.pics?.[0] instanceof File || product?.pics?.[0] instanceof Blob) 
          ?
            <img
              src={product?.pics?.[0] && URL.createObjectURL(product?.pics?.[0])}
              alt=""
              className="aspect-square object-cover w-[277px] h-[308px]"
            />
          : 
            !product?.pics?.[0] ? (
              <div className='aspect-square bg-slate-200 w-[277px] h-[308px]'/>
            ) : 
            <img 
              src={getImageUrl(product, product?.pics?.[0])}
              alt="" 
              className='aspect-square object-cover w-[277px] h-[308px]'
            />
        }
        <div className="p-3">
          <Text className='mt-3' lineClamp={2}>
            {product?.name}
          </Text>
          <Text className='mt-2 !text-[15px] grow' lineClamp={3}>
            {product?.description}
          </Text>
          <p className='mt-2 font-bold '>{formatNumber(product?.price)} ₸</p>
          <div className='flex gap-2 items-center mt-1'>
            <Rating size='xs' value={4.5} fractions={2}/> <span className='text-xs text-slate-400'>(25)</span>
          </div>
          {buttons}
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col border h-full w-[277px] shadow-sm'>
      <Link to={`/market/product/${product?.id}`}>
        <img 
          src={getImageUrl(product, product?.pics?.[0])}
          alt="" 
          className='aspect-auto object-cover w-[277px] h-[308px]'
        />
      </Link>
  
      <div className="p-3">
        <Text className='mt-3' lineClamp={2}>
          {product?.name}
        </Text>
        <Text className='mt-2 !text-[15px] grow' lineClamp={3}>
          {product?.description}
        </Text>
        <p className='mt-2 font-bold'>{formatNumber(product?.price)} ₸</p>
        <div className='flex gap-2 items-center mt-1'>
          <Rating size='xs' value={4.5} fractions={2}/> <span className='text-xs text-slate-400'>(25)</span>
        </div>
        {addedToCart ? (
          <Button
            fullWidth
            className='mt-3'
            component={Link}
            to={'/market/cart'}
          >
            Перейти в корзину
          </Button>
        ) : (
          <Button
            fullWidth
            className='mt-3'
            onClick={() => addToCart(product)}
          >
            В корзину
          </Button>
        )}
      </div>
    </div>
  )
}
