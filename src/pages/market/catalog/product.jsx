import React from 'react'
import { Button, Text } from '@mantine/core'
import { Link } from 'react-router-dom'
import { formatNumber, getImageUrl } from 'shared/lib'
import { useCartStore } from '../cart/cartStore'

export const Product = ({product}) => {

  const { addToCart } = useCartStore()

  return (
    <div className='flex flex-col shadow-lg border p-2 h-min max-w-[268px]'>
      <div>
        <Link to={`/market/product/${product?.id}`}>
          <img 
            src={getImageUrl(product, product?.pics?.[0])}
            alt="" 
            className='aspect-square object-cover'
          />
        </Link>
        <Text className=' mt-3' lineClamp={2}>
          {product?.name}
        </Text>
        <Text className=' mt-2 !text-[15px]' lineClamp={3}>
          {product?.description}
        </Text>
        <p className='mt-2 font-bold '>{formatNumber(product?.price)} ₸</p>
      </div>
      <Button
        fullWidth
        className='mt-3 flex-shrink'
        onClick={() => addToCart(product)}
      >
        В корзину
      </Button>
    </div>
  )
}
