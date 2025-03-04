import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useCartStore } from './cartStore'
import { formatNumber, getImageUrl } from 'shared/lib'
import { ActionIcon, CloseButton, Collapse, Switch, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

export const CartItem = ({ product, handleUseBonuses }) => {
  const total = product?.count * product?.price

  const { addToCart, removeFromCart, removeItem } = useCartStore()

  return (
    <div className="relative bg-white">
      <div className="border flex items-center shadow-sm gap-3 rounded-primary overflow-hidden">
        <div className="flex gap-4 max-w-md max-h-[150px] overflow-hidden flex-grow flex-shrink-0">
          <Link to={`/duken/product/${product.id}`}>
            <img
              src={getImageUrl(product, product.pics?.[0])}
              alt={product.title}
              className="aspect-square max-w-[150px] object-cover"
            />
          </Link>
          <div className="flex flex-col">
            <p className="font-semibold text-xl">{product.name}</p>
            {/* <Text lineClamp={2} className='mt-2'>
              {product.description}
            </Text> */}
            <p>Город: {product?.city}</p>
            {product?.takeout &&
              !product?.city_delivery &&
              !product?.between_cities &&
              product?.everywhere && (
                <Text color="red" size="sm" className="mt-2">
                  Только самовывоз в городе {product?.city}
                </Text>
              )}
            {product?.city_delivery && (
              <Text color="green" size="sm">
                Доставка по городу
              </Text>
            )}

            {product?.between_cities && (
              <>
                <Text color="green" size="sm">
                  Доставка между городами
                </Text>
              </>
            )}
            <div className="gap-1">
              {product?.between_cities &&
                product?.between_cities?.map((q, i) => {
                  return (
                    <p className="text-sm" key={i}>
                      {q}
                    </p>
                  )
                })}
            </div>

            {product?.everywhere && (
              <Text color="green" size="sm">
                Доставка по всему Казахстану
              </Text>
            )}
          </div>
        </div>
        <div className="p-3 flex justify-between w-full">
          <div className="flex gap-3 items-center">
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
          <div className="font-semibold text-lg ml-auto">
            {formatNumber(total)} ₸
            {product?.bonuses_spent > 0 && (
              <Text color="green" size="sm">
                -{formatNumber(product?.bonuses_spent)} бонусов
              </Text>
            )}
          </div>
        </div>
      </div>
      <div className="absolute top-1 right-1 z-10">
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
