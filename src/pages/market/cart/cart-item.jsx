import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useCartStore } from './cartStore'
import { formatNumber, getImageUrl } from 'shared/lib'
import { ActionIcon, Button, CloseButton, Collapse, Switch, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

import { FaRegCheckCircle } from "react-icons/fa";

export const CartItem = ({ product, handleUseBonuses, handleBetweenCities }) => {

  const total = product?.count * product?.price

  const { addToCart, removeFromCart, removeItem } = useCartStore()

  return (
    <div className="relative bg-white">
      <div className="border flex shadow-sm gap-3 rounded-primary overflow-hidden">

        <div className="flex max-w-md w-full max-h-[150px] overflow-hidden flex-grow flex-shrink-0">
          <Link to={`/duken/product/${product.id}`}>
            <img
              src={getImageUrl(product, product.pics?.[0])}
              alt={product.title}
              className="aspect-square max-w-[150px] object-cover"
            />
          </Link>
          <div className="flex flex-col p-3 w-full">
            
            <p className="font-semibold text-xl line-clamp-2">{product.name}</p>
            <p>Город: {product?.city}</p>
            <div className="flex mt-2 justify-between">
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
              <div className="font-semibold text-lg ml-auto text-right">
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
          <div className="flex flex-col">
            {product?.takeout && (
                <Text color="red" size="sm">
                  Самовывоз в городе: {product?.city}
                </Text>
              )}
            {product?.city_delivery && (
              <div className='flex gap-2 items-center'>
                <Text color="green" size="sm">
                  Доставка по городу 
                </Text>
              </div>
            )}

            {product?.between_cities && (
              <div className='flex gap-1'>
                <Text color="green" size="sm">
                  Доставка в другие города 
                </Text>
                <Button
                  compact
                  variant='ligth'
                  color='black'
                  onClick={() => handleBetweenCities(product?.between_cities)}
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
      <div className="absolute bottom-2 right-2">
        <Switch
          label="Потратить бонусы"
          checked={product?.using_bonuses}
          onChange={() => handleUseBonuses(product)}
        />
      </div>
    </div>
  )
}
