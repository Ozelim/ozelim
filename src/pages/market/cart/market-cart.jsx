import React from 'react'
import { useCartStore } from './cartStore'

import empty from 'shared/assets/images/empty-cart.png'
import { CartItem } from './cart-item'
import { Button, Checkbox, clsx } from '@mantine/core'
import { useAuth } from 'shared/hooks'
import { useDisclosure } from '@mantine/hooks'
import axios from 'axios'
import { pb } from 'shared/api'
import { formatNumber } from 'shared/lib'

export const MarketCart = () => {

  const {user} = useAuth()

  const {cartItems} = useCartStore()

  const [payment, payment_h] = useDisclosure(false)

  const totalCost = cartItems.reduce((q, w) => q + (w.count * w.price), 0)
  const totalAmount = cartItems.reduce((q, w) => q + w.count, 0)

  const [terms, terms_h] = useDisclosure(false)

  const [paymentLoading, paymentLoading_h] = useDisclosure(false)

  async function buy () {
    // try {
    //   paymentLoading_h.open()

    //   const randomNumber = Math.floor(Math.random() * 100000000)
    //   const token = import.meta.env.VITE_APP_SHARED_SECRET

    //   const data = {
    //     ORDER: randomNumber,
    //     AMOUNT: 5,
    //     CURRENCY: 'KZT',
    //     MERCHANT: '110-R-113431490',
    //     TERMINAL: '11371491',
    //     NONCE: randomNumber + 107,
    //     DESC: 'Duken',
    //     CLIENT_ID: randomNumber,
    //     DESC_ORDER: 'Покупка Duken',
    //     BACKREF: `https://oz-elim.kz/profile`,
    //     Ucaf_Flag: '',
    //     Ucaf_Authentication_Data: '',
    //   }

    //   const dataString = `${data?.ORDER};${data?.AMOUNT};${data?.CURRENCY};${data?.MERCHANT};${data?.TERMINAL};${data?.NONCE};${data?.CLIENT_ID};${data?.DESC};${data?.DESC_ORDER};${data?.EMAIL};${data?.BACKREF};${data?.Ucaf_Flag};${data?.Ucaf_Authentication_Data};`

    //   const all = token + dataString
    //   const sign = sha512(all).toString()

    //   await axios
    //     .post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/pay`, {
    //       ...data,
    //       P_SIGN: sign,
    //     })
    //     .then(async (res) => {
    //       const searchParams = new URLSearchParams(JSON.parse(res?.config?.data))
    //       await pb
    //         .collection('orders')
    //         .create(user?.id, {
    //           status: 'created',
    //           pay: {
    //             ...JSON.parse(res?.config?.data),
    //             SHARED_KEY: token,
    //           },
    //         })
    //         .then(() => {
    //           paymentLoading_h.close()
    //           window.location.href = `https://jpay.jysanbank.kz/ecom/api?${searchParams}`
    //         })
    //     })
    //     .finally(() => {
    //       paymentLoading_h.close()
    //     })
    // } catch (err) {
    //   paymentLoading_h.close()
    //   console.log(err, 'err')
    // }

    // await pb.collection('orders').create({
    //   total_cost: totalCost, 
    //   total_amount: totalAmount,
    //   products: cartItems,
    //   status: 'created',
    //   total_payed: totalCost,
      
    // })
  }

  async function buyBefore () {
    
  }

  if (payment) {
    return (
      <div className='container-market market'>
        asd
      </div>
    )
  }

  return (
    <div className='container-market market'>
      <div className={'grid grid-cols-[auto_23%] w-full  h-full gap-3 mt-4 mb-4'}>
        <div className='flex flex-col gap-4'>
          {cartItems?.map((item, i) => {
            return (
              <CartItem 
                key={`${item.id}-${i}`}
                product={item}
              />
            )
          })}
          {cartItems.length === 0 && (
            <div className='flex justify-center items-center'>
              <div className='flex flex-col gap-4'>
                <img src={empty} alt="" className='max-w-xl' />
                <p className='text-center'>Корзина пуста</p>
              </div>
            </div>
          )}
        </div>
        <div className='border shadow-md p-3 h-fit'>
          <p>Товары, {totalAmount} шт.</p>
          <div className='flex justify-between gap-4'>
            <p>Итого</p>
            <p>{formatNumber(totalCost)} тг.</p>
          </div>

          <Button
            fullWidth
            className='mt-4'
            disabled={!terms}
            onClick={() => payment_h.open()}
          >
            Заказать
          </Button>
          
          <div className='flex gap-2 items-center mt-3'>
            <Checkbox
              checked={terms}
              onChange={() => terms_h.toggle()}
            />
            <p className='text-sm text-slate-400'>Соглашаюсь с правилами пользования торговой площадки и возврата</p>
          </div>
        </div>
      </div>
    </div>
  )
}