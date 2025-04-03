import React from 'react'
import { getImageUrl } from 'shared/lib'
import { useAuth } from 'shared/hooks'
import { formatNumber } from 'shared/lib'
import { FiShoppingCart } from 'react-icons/fi'
import { FaRegHeart } from 'react-icons/fa'
import { Button, ActionIcon, Rating } from '@mantine/core'
import clsx from 'clsx'
import { pb } from 'shared/api'
import { showNotification } from '@mantine/notifications'
import { useCartStore } from './cart/cartStore'
import { Link } from 'react-router-dom'
export const ProductRow = ({product}) => {
  
  const {user} = useAuth()  

  const {cartItems, addToCart} = useCartStore()

  async function addToFavorites() {
    if (user?.favorites?.includes(product?.id)) {
      await pb.collection('agents').update(user?.id, {
        favorites: user?.favorites?.filter((q) => q !== product?.id)
      })
      .then(() => {
        showNotification({
          title: 'Избранное',
          message: 'Товар удален из избранного',
          color: 'green'
        })
      })
      .catch(() => {
        showNotification({
          title: 'Избранное',
          message: 'Не удалось удалить товар из избранного',
          color: 'red'
        })
      })
      return
    }
    await pb.collection('agents').update(user?.id, {
      favorites: [...user?.favorites ?? [], product?.id]
    })
    .then(() => {
      showNotification({
        title: 'Избранное',
        message: 'Товар добавлен в избранное',
        color: 'green'
      })
    })
    .catch(() => {
      showNotification({
        title: 'Избранное',
        message: 'Не удалось добавить товар в избранное',
        color: 'red'
      })
    })
  }

  return (
    <div className="grid grid-cols-[30%_auto] border shadow-equal rounded-primary overflow-hidden">
      <img
        src={getImageUrl(product, product?.pics?.[0])}
        alt=""
        className="w-full h-full object-cover aspect-square"
      />
      <div className='p-4 flex flex-col'>
        <p className="text-lg font-bold">{product?.name}</p>
        <p className="text-sm text-gray-500 mt-2 line-clamp-3">{product?.description}</p>
        <div className="flex items-center gap-2">
          {product?.discount?.status === 'active' && (
            <div className="mt-3.5 flex items-center gap-2">
              <p className="font-bold text-primary-500">
                {formatNumber(product?.price - product?.price * (product?.discount?.percent / 100))} ₸
              </p>
              <p className="text-gray-400 line-through">{formatNumber(product?.price)} ₸</p>
              <p className="text-gray-400 text-sm">-{product?.discount?.percent}%</p>
            </div>
          )}
          {(!product?.discount?.status || !(product?.discount?.status === 'active')) && (
            <p className="mt-3.5 font-bold text-primary-500">
              {formatNumber(product?.price)} ₸
            </p>
          )}
        </div>
        <div className='flex items-center gap-2 flex-start mt-auto'>
          <Rating size='xs' readOnly value={product?.rating} fractions={2}/> <span className='text-xs text-slate-400'>({product?.buyed || 0})</span>
        </div>
        <div className="flex items-center gap-2 flex-start mt-auto">

          {cartItems?.some((q) => q?.id === product?.id) ? (
            <Button 
              variant="filled" 
              size="sm"
              leftIcon={<FiShoppingCart size={18} />}
              component={Link}
              to='/duken/cart'
            >
              Перейти в корзину
            </Button>
          ) : (
            <Button 
              variant="filled" 
              size="sm"
              leftIcon={<FiShoppingCart size={18} />}
              onClick={() => addToCart(product)}
            >
              Добавить в корзину
            </Button>
          )}

          <ActionIcon
            className={clsx(
              '!border !border-slate-200 !p-2.5 !h-10 !w-10 !rounded-full mx-auto md:mx-0',
              {
                '!bg-red-600': user?.favorites?.includes(product?.id),
              }
            )}
            onClick={addToFavorites}
          >
            <FaRegHeart
              size={'100%'}
              color={user?.favorites?.includes(product?.id) ? 'white' : 'black'}
            />
          </ActionIcon>
        </div>
      </div>
    </div>
  )
}
