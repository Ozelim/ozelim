import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useCartStore } from './cartStore'
import { formatNumber, getImageUrl } from 'shared/lib'
import { ActionIcon, Button, CloseButton, Switch, Text } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useAuth } from 'shared/hooks'

export const CartItem = ({ product, handleUseBonuses, handleBetweenCities }) => {

  const { user } = useAuth()

  const total = product?.count * product?.price

  const { addToCart, removeFromCart, removeItem } = useCartStore()

  return (
    <div className="relative bg-white shadow-equal">
      <div className="border flex flex-col sm:flex-row shadow-sm gap-3 rounded-primary overflow-hidden">

        <div className="flex flex-col sm:flex-row max-w-full sm:max-w-md w-full max-h-full sm:max-h-[150px] overflow-hidden flex-grow flex-shrink-0">
          <Link to={`/duken/product/${product.id}`} className="w-full sm:w-auto">
            <img
              src={getImageUrl(product, product.pics?.[0])}
              alt={product.title}
              className="w-full sm:w-[150px] h-full aspect-auto object-cover"
            />
          </Link>
          <div className="flex flex-col p-3 w-full">
            
            <p className="font-semibold text-lg sm:text-xl line-clamp-1">{product.name}</p>
            <p className="text-sm sm:text-base">Город: {product?.city}</p>
            <div className="flex flex-col sm:flex-row mt-2 gap-2 sm:gap-0 sm:justify-between">
              <div className="flex gap-3">
                <ActionIcon
                  onClick={
                    product?.using_bonuses
                      ? () => {
                          handleUseBonuses(product)
                        }
                      : () => removeFromCart(product)
                  }
                  className="text-xl"
                  disabled={product?.count === 1}
                  variant="light"
                  bg="gray.2"
                  size="md"
                >
                  <AiOutlineMinus className="text-black" size={10} />
                </ActionIcon>
                <span>{product.count}</span>
                <ActionIcon
                  onClick={
                    product?.using_bonuses
                      ? () => {
                          handleUseBonuses(product)
                        }
                      : () => addToCart(product)
                  }
                  className="text-xl"
                  variant="light"
                  bg="gray.2"
                  size="md"
                >
                  <AiOutlinePlus className="text-black" size={10} />
                </ActionIcon>
              </div>
              <div className="font-semibold text-lg sm:ml-auto text-left sm:text-right">
                {formatNumber(total)} ₸
                {product?.bonuses_spent > 0 && (
                  <Text color="green" size="sm" className='-mt-1'>
                    -{formatNumber(product?.bonuses_spent)} бонусов
                  </Text>
                )}
              </div>
            </div>
          </div>
        </div>


        <div className="flex p-3">
          <div className="flex flex-col w-full gap-2">
            {product?.takeout && (
                <Text color="red" size="sm">
                  Самовывоз в городе: {product?.city}
                </Text>
              )}
            {product?.city_delivery && (
              <div className='flex gap-2 items-center whitespace-nowrap'>
                <Text color="green" size="sm">
                  Доставка по городу: {product?.city}
                </Text>
              </div>
            )}

            {product?.between_cities && (
              <div className='flex flex-col sm:flex-row gap-1 whitespace-nowrap'>
                <Text color="green" size="sm">
                  Доставка в другие города 
                </Text>
                <Button
                  compact
                  variant='ligth'
                  color='black'
                  onClick={() => handleBetweenCities(product?.between_cities)}
                  className="w-full sm:w-auto"
                >
                  Посмотреть города
                </Button>
              </div>
            )}

            {product?.everywhere && (
              <Text color="green" size="sm">
                Доставка по всему Казахстану
              </Text>
            )}
          </div>
        </div>

      </div>
      <div className="absolute top-2 right-2 z-10">
        <CloseButton
          onClick={() => removeItem(product)}
          size={20}
          className="text-black"
          bg="gray.2"
        />
      </div>
      {user?.collectionName === 'agents' && (
        <div className="absolute -bottom-7 right-2 sm:bottom-2 sm:right-2">
          <Switch
            label="Потратить бонусы"
            checked={product?.using_bonuses}
            onChange={() => handleUseBonuses(product)}
            className="text-sm sm:text-base"
          />
        </div>
      )}
    </div>
  )
}
