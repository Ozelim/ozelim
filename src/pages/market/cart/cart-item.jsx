import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useCartStore } from './cartStore'
import { formatNumber, getImageUrl } from 'shared/lib'
import { ActionIcon, CloseButton, Switch, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

export const CartItem = ({product, handleUseBonuses}) => {

  const total = product?.count * product?.price

  const { addToCart, removeFromCart, removeItem } = useCartStore()

  return (
    <div className="relative bg-white">
      <div className='border p-3 grid grid-cols-[60%_10%_auto] items-center shadow-sm gap-3 rounded-primary'>
        <div className='flex gap-4 max-w-md max-h-[120px] overflow-hidden flex-grow'>
          <Link to={`/duken/product/${product.id}`}>
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
            {/* <Text lineClamp={2} className='mt-2'>
              {product.description}
            </Text> */}
            <p>Город: {product?.city}</p>
            {(product?.takeout && (!product?.city_delivery && !product?.between_cities && product?.everywhere) ) && (
              <Text color='red' size='sm' className='mt-2'>
                Только самовывоз
              </Text>
            )}
            {product?.city_delivery && (
              <Text color='green' size='sm'>
                Доставка по городу
              </Text>
            )}

            {product?.between_cities && (
              <Text color='green' size='sm'>
                Доставка между городами
              </Text>
            )}

            {product?.everywhere && (
              <Text color='green' size='sm'>
                Доставка по всему Казахстану
              </Text>
            )}
          </div>
        </div>
        {/* <p className='font-semibold text-lg ' >
          {product.price} ₸
        </p> */}
        <div className='flex gap-3 items-center'>
          <ActionIcon 
            onClick={product?.using_bonuses ? () => {
              handleUseBonuses(product)
            } : 
              () => removeFromCart(product)
            } 
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
            onClick={product?.using_bonuses ? () => {
              handleUseBonuses(product)
            } : 
              () => addToCart(product)
            } 
            className='text-xl'
            variant='light'
            bg='gray.2'
            size='md'
          >
            <AiOutlinePlus className='text-black' size={10}/>
          </ActionIcon>
        </div>
        <div className='font-semibold text-lg ml-auto'>
          {formatNumber(total)} ₸

          {product?.bonuses_spent > 0 && (
            <Text color='green' size='sm'>
              -{formatNumber(product?.bonuses_spent)} бонусов
            </Text>
          )}
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
      <div className="absolute bottom-2 right-2">
        <Switch
          label='Потратить бонусы'
          checked={product?.using_bonuses}
          onChange={() => handleUseBonuses(product)}
        />
      </div>
    </div>
  )
}