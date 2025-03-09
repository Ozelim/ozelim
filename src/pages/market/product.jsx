import React from 'react'
import { Button, Rating, Text } from '@mantine/core'
import { Link } from 'react-router-dom'
import { formatNumber, getImageUrl } from 'shared/lib'
import { useCartStore } from './cart/cartStore'

export const Product = ({product, preview, buttons}) => {

  const { addToCart, cartItems } = useCartStore()

  const addedToCart = cartItems?.find((q) => q?.id === product?.id)

  const productRating = product?.rating !== '' ? product?.rating : 0

  if (preview) {
    return (
      <div className='flex flex-col border h-full bg-white shadow-sm max-w-[308px]'>
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
        <div className="p-3 flex flex-col h-full">
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
            <p className='mt-3.5 font-bold'>{formatNumber(product?.price)} ₸</p>
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
    <div className='flex flex-col border h-full bg-white shadow-sm rounded-primary'>
      <Link to={`/duken/product/${product?.id}`}>
        <img 
          src={getImageUrl(product, product?.pics?.[0])}
          alt="" 
          className='aspect-auto object-cover h-[308px] rounded-t-primary mx-auto'
        />
      </Link>
  
      <div className="p-3 flex flex-col h-full">
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
          <p className='mt-3.5 font-bold'>{formatNumber(product?.price)} ₸</p>
          <div className='flex gap-2 items-center mt-1'>
            <Rating size='xs' readOnly value={productRating} fractions={2}/> <span className='text-xs text-slate-400'>({productRating})</span>
          </div>
        </div>
        {addedToCart ? (
          <Button
            fullWidth
            className='mt-3'
            component={Link}
            to={'/duken/cart'}
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
