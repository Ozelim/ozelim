import React from 'react'
import { useCartStore } from './cartStore'

import { CartItem } from './cart-item'
import { Button, Checkbox, LoadingOverlay, Select, TextInput, Collapse, Modal, PasswordInput } from '@mantine/core'
import { useAuth } from 'shared/hooks'
import { useDisclosure } from '@mantine/hooks'
import axios from 'axios'
import { pb } from 'shared/api'
import { cities, formatNumber, generateSixDigitCode, getId } from 'shared/lib'
import { openConfirmModal } from '@mantine/modals'
import { sha512 } from 'js-sha512'
import { showNotification } from '@mantine/notifications'

import { Link } from 'react-router-dom'
import { useModals } from 'shared/hooks'

export const MarketCart = () => {

  const {user} = useAuth()

  const {cartItems, updateCartItems, clearCart} = useCartStore()
  const {openModal} = useModals()

  const totalCost = cartItems.reduce((q, w) => q + (w.count * w.price), 0)
  const totalAmount = cartItems.reduce((q, w) => q + w.count, 0)
  
  const [terms, terms_h] = useDisclosure(false)
  const [payment, payment_h] = useDisclosure(false)
  const [paymentLoading, paymentLoading_h] = useDisclosure(false)
  const [addDelivery, addDelivery_h] = useDisclosure(false)
  const [addDeliveryLoading, addDeliveryLoading_h] = useDisclosure(false)

  const [deliveryTerms, deliveryTems_h] = useDisclosure(false)  

  const [betweenCitiesModal, setBetweenCitiesModal] = React.useState({
    cities: [],
    modal: false
  })

  const [deliveryData, setDeliveryData] = React.useState({
    city: user?.delivery_address?.city,
    address: user?.delivery_address?.address,
    phone: user?.delivery_address?.phone,
  })

  const [takeoutData, setTakeoutData] = React.useState({
    name: user?.name || user?.fio,
    phone: user?.phone,
  })

  async function handlePayment () {
    if (!user?.id) {
      openModal.customerSignup()
    } else {
      payment_h.open()
    }
  }

  async function buyWithBonuses () {
    openConfirmModal({
      centered: true,
      title: 'Подтверждение',
      children: 'Вы уверены что хотите оплатить заказ бонусами?',
      labels: { confirm: 'Оплатить', cancel: 'Отмена' },
      "aria-hidden": false,
      onConfirm: async () => {
        try {
          paymentLoading_h.open()
          
          await pb.collection('agents').update(user?.id, {
            bonuses: user?.bonuses - bonuses(),
          })

          cartItems.forEach(async (item) => {
            await pb.collection('orders').create({
              id: getId(15),
              product: {...item},
              total_amount: item?.count,
              total_cost: item?.price * item?.count,
              user: user?.id || null,
              status: 'paid',
              pay_type: 'bonuses',
              delivery_data: {...deliveryData},
              total_payed: item?.price * item?.count,
              product_id: item?.id,
              bonuses_spent: item?.bonuses_spent,
              pay_type: 'bonuses',
              takeout_code: generateSixDigitCode()
            })
          })

          clearCart()
          back()
          paymentLoading_h.close()
        }
        catch (err) {
          paymentLoading_h.close()
          console.log(err, 'err')
        }
      },
    })
  }

  async function buyWithCard () {
    try {
      paymentLoading_h.open()

      const randomNumber = Math.floor(Math.random() * 100000000)
      const token = import.meta.env.VITE_APP_SHARED_SECRET
      
      const data = {
        ORDER: randomNumber,
        AMOUNT: finalCost(),
        CURRENCY: 'KZT',
        MERCHANT: '110-R-113431490',
        TERMINAL: '11371491',
        NONCE: randomNumber + 107,
        DESC: 'Duken',
        CLIENT_ID: randomNumber,
        DESC_ORDER: 'Покупка Duken',
        BACKREF: `https://oz-elim.kz/duken/profile/orders`,
        Ucaf_Flag: '',
        Ucaf_Authentication_Data: '',
      }

      const dataString = `${data?.ORDER};${data?.AMOUNT};${data?.CURRENCY};${data?.MERCHANT};${data?.TERMINAL};${data?.NONCE};${data?.CLIENT_ID};${data?.DESC};${data?.DESC_ORDER};${data?.EMAIL};${data?.BACKREF};${data?.Ucaf_Flag};${data?.Ucaf_Authentication_Data};`

      const all = token + dataString
      const sign = sha512(all).toString()

      await axios
        .post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/pay`, {
          ...data,
          P_SIGN: sign,
        })
        .then(async (res) => {
          const searchParams = new URLSearchParams(JSON.parse(res?.config?.data))
          cartItems.forEach(async (item) => {
            await pb.collection('orders').create({
              
              id: getId(15),
              product: {...item},
              total_amount: item?.count,
              total_cost: item?.price * item?.count,
              user: user?.id || null,
              status: bonusesSpent >= item?.price * item?.count ? 'paid' : 'waiting',
              pay: {
                ...JSON.parse(res?.config?.data),
                SHARED_KEY: token,
              },
              delivery_data: {...deliveryData},
              total_payed: item?.price * item?.count,
              product_id: item?.id,
              pay_type: 'card',
              bonuses_spent: item?.bonuses_spent,
              takeout_code: generateSixDigitCode()
            })
          })
            clearCart()
            back()
            window.location.href = `https://jpay.jysanbank.kz/ecom/api?${searchParams}`;
          })
        .finally(() => {
          paymentLoading_h.close()
        })
    } catch (err) {
      paymentLoading_h.close()
      console.log(err, 'err')
    }
  }

  async function buyWithBalance () {
    openConfirmModal({
      title: 'Подтверждение',
      children: 'Вы уверены что хотите оплатить заказ с баланса?',
      labels: { confirm: 'Оплатить', cancel: 'Отмена' },
      "aria-hidden": true,
      centered: true,
      onConfirm: async () => {
        try {
          paymentLoading_h.open()

          cartItems.forEach(async (item) => {

            await pb.collection('orders').create({
              id: getId(15),
              product: {...item},
              total_amount: item?.count,
              total_cost: item?.price * item?.count,
              user: user?.id || null,
              status: 'paid',
              delivery_data: {...deliveryData},
              total_payed: item?.price * item?.count,
              market_id: item?.market_id,
              product_id: item?.id,
              pay_type: 'balance',
              bonuses_spent: item?.bonuses_spent,
              takeout_code: generateSixDigitCode()
            })
          })

          await pb.collection('agents').update(user?.id, {
            bonuses: user?.bonuses - bonusesSpent,
            balance: user?.balance - finalCost()
          })

          clearCart()
          back()
          paymentLoading_h.close()
        } catch (err) {
          paymentLoading_h.close()
          console.log(err, 'err')
        }
      },
    })
  }

  async function back () {
    payment_h.close()
  }

  const bonusesSpent = cartItems.reduce((q, w) => q + w?.bonuses_spent ?? 0, 0)

  function finalCost () {
    if (bonusesSpent >= totalCost) {
      return 0
    } else {
      return totalCost - bonusesSpent
    }
  }

  function bonuses () {
    if (user?.bonuses >= totalCost) {
      return totalCost
    } else {
      return user?.bonuses
    }
  }

  function handleUseBonuses(q) {
    if (user?.bonuses === 0 && !q?.using_bonuses && q?.bonuses_spent === 0) {
      showNotification({
        title: 'Бонусы',
        message: 'У вас нет бонусов',
        color: 'red'
      });
      return;
    }
  
    let availableBonuses = user?.bonuses;
    let totalSpentBonuses = cartItems.reduce((sum, item) => sum + item.bonuses_spent, 0);
    
    const newItems = cartItems.map((item) => {
      if (item?.id === q?.id) {
        const itemTotal = item?.price * item?.count;
  
        if (item?.using_bonuses) {
          // Restore spent bonuses when toggling off
          availableBonuses += item?.bonuses_spent;
          totalSpentBonuses -= item?.bonuses_spent;
          return { ...item, using_bonuses: false, bonuses_spent: 0 };
        } else {
          // Determine how much we can actually spend
          const maxSpendableBonuses = Math.min(user?.bonuses - totalSpentBonuses, itemTotal);
          totalSpentBonuses += maxSpendableBonuses;
  
          return {
            ...item,
            using_bonuses: true,
            bonuses_spent: maxSpendableBonuses,
          };
        }
      }
      return item;
    });
  
    updateCartItems(newItems);
  }

  async function addDeliveryAddress () {
    addDeliveryLoading_h.open()
    await pb.collection('agents').update(user?.id, {
      delivery_address: {...deliveryData}
    })
    .then(() => {
      addDelivery_h.close()
      showNotification({
        title: 'Адрес доставка',
        message: 'Адрес доставки успешно изменен',
        color: 'green'
      })
    })
    addDeliveryLoading_h.close()
  }

  function handleBetweenCities (q) {
    setBetweenCitiesModal({
      cities: q,
      modal: true
    })
  }

  return (
    <>
      <LoadingOverlay
        visible={paymentLoading}
      />
      <div className='container-market market mt-4'>
        <div className='mt-8 flex flex-col sm:flex-row gap-4'>
          {cartItems?.length > 0 && (
            <>
              <p className='text-[15px]'>
                Обратите внимание что самовывоз и доставка могут осуществляться только в определенные города 
              </p>
              <Checkbox checked={deliveryTerms} label='Ознакомлен' onChange={() => deliveryTems_h.toggle()}/>
            </>
          )}
        </div>
        <div className={'grid grid-cols-1 lg:grid-cols-[auto_23%] w-full h-full gap-3 mb-4 mt-4'}>
          <div className='flex flex-col gap-4'>
            {cartItems?.map((item, i) => {
              return (
                <CartItem 
                  key={`${item.id}-${i}`}
                  product={item}
                  handleUseBonuses={handleUseBonuses}
                  handleBetweenCities={handleBetweenCities}
                />
              )
            })}
            {cartItems.length === 0 && (
              <div className='flex justify-center items-center w-full h-full'>
                <div>
                  <p className='text-center'>Корзина пуста</p>
                  <Link to='/duken/catalog' className='text-center text-blue-500'>Перейти в каталог</Link>
                </div>
              </div>
            )}
          </div>
          {payment ? (
            <div className='border shadow-sm p-3 bg-white relative rounded-primary h-fit w-full lg:w-auto'>
              <p>Товары, {totalAmount} шт.</p>
              <div className='flex justify-between gap-4'>
                <p>Итого</p>
                <p>{formatNumber(totalCost)} тг.</p>
              </div>
                <>
                  <div className='flex justify-between gap-4'>
                    <p>Бонусы</p>
                    <p>- {formatNumber(bonusesSpent)} тг.</p>
                  </div>
                </>
              <div className='flex justify-between gap-4'>
                <p>К оплате</p>
                <p>{formatNumber(finalCost())} тг.</p>
              </div>

                {bonusesSpent - totalCost == 0 ? (
                  <div className="mt-3">
                    <Button 
                      onClick={buyWithBonuses}
                      fullWidth
                    >
                      Оплатить бонусами
                    </Button>
                  </div>
                ) : (
                  <div className='space-y-3 mt-3'>
                    {user?.collectionName === 'agents' && (
                      <Button
                        onClick={buyWithBalance}
                        disabled={finalCost() > user?.balance}
                        fullWidth
                    >
                        Оплатить балансом
                      </Button>
                    )}
                    <Button
                      onClick={buyWithCard}
                      fullWidth
                    >
                      Оплатить картой
                    </Button>
                  </div>
                )}

              <div className="flex justify-end">
                <Button 
                  variant='white' 
                  compact
                  className='absolute top-1 right-1'
                  onClick={back}
                >
                  Назад
                </Button>
              </div>
            </div>
          ) : (
            <div className='border shadow-sm p-3 h-fit bg-white rounded-primary w-full lg:w-auto'>
              {user?.collectionName === 'agents' && (
                <>
                  <p>Баланс: {formatNumber(user?.balance)} тг.</p>
                  <p>Бонусы: {formatNumber(user?.bonuses)} тг.</p>
                </>
              )}
              <p>Товары: {totalAmount} шт.</p>
              <div className='flex justify-between gap-4'>
                <p>Итого</p>
                <p>{formatNumber(totalCost)} тг.</p>
              </div>

              <p className='py-3 border-t mt-3'>Данные доставки</p>

              {!user?.delivery_address?.city && (
                <Button
                  onClick={() => addDelivery_h.toggle()}
                  mb={4}
                  fullWidth
                >
                  Добавить адрес доставки
                </Button>
              )}

              <Select
                data={cities}
                label='Город'
                placeholder='Ваш город'
                required
                onChange={(e) => setDeliveryData({...deliveryData, city: e})}
                value={deliveryData?.city}
                className='w-full'
              />
              <TextInput
                label='Адрес доставки'
                placeholder='Улица, дом, квартира'
                required
                value={deliveryData?.address}
                onChange={(e) => setDeliveryData({...deliveryData, address: e?.currentTarget?.value})}
                className='w-full'
              />
              <TextInput
                label='Номер телефона'
                placeholder='+7 (___) ___-__-__'
                required
                value={deliveryData?.phone}
                onChange={(e) => setDeliveryData({...deliveryData, phone: e?.currentTarget?.value})}
                className='w-full'
              />

              {(
                (user?.delivery_address?.city !== deliveryData?.city) || 
                (user?.delivery_address?.phone !== deliveryData?.phone) || 
                (user?.delivery_address?.address !== deliveryData?.address) 
              ) && (  
                <div className='flex justify-center mt-4'>
                  <Button
                    loading={addDeliveryLoading}
                    onClick={addDeliveryAddress}
                    fullWidth
                  >
                    Сохранить
                  </Button>
                </div>
              )}
              <Collapse
                in={addDelivery}
              >
                <Select
                  data={cities}
                  label='Город'
                  placeholder='Ваш город'
                  required
                  onChange={(e) => setDeliveryData({...deliveryData, city: e})}
                  value={deliveryData?.city}
                  className='w-full'
                />
                <TextInput
                  label='Адрес доставки'
                  placeholder='Улица, дом, квартира'
                  required
                  value={deliveryData?.address}
                  onChange={(e) => setDeliveryData({...deliveryData, address: e?.currentTarget?.value})}
                  className='w-full'
                />
                <TextInput
                  label='Номер телефона'
                  placeholder='+7 (___) ___-__-__'
                  required
                  value={deliveryData?.phone}
                  onChange={(e) => setDeliveryData({...deliveryData, phone: e?.currentTarget?.value})}
                  className='w-full'
                />
                <div className='flex justify-center mt-3 mb-2'>
                  <Button
                    loading={addDeliveryLoading}
                    onClick={addDeliveryAddress}
                    fullWidth
                  >
                    Сохранить
                  </Button>
                </div>
              </Collapse>

              {cartItems?.some((q) => q?.takeout) && (
                <div className='space-y-1 mt-4'>
                  <p className='py-3 border-t mt-4'>Данные самовывоза</p>
                  <TextInput
                    label='Имя'
                    placeholder='Ваше имя'
                    required
                    value={takeoutData?.name}
                    onChange={(e) => setTakeoutData({...takeoutData, name: e?.currentTarget?.value})}
                    className='w-full'
                  />
                  <TextInput
                    label='Номер телефона'
                    placeholder='+7 (___) ___-__-__'
                    required
                    value={takeoutData?.phone}
                    onChange={(e) => setTakeoutData({...takeoutData, phone: e?.currentTarget?.value})}
                    className='w-full'
                  />
                </div>
              )}

              <Button
                fullWidth
                className='mt-4'
                disabled={!terms || !deliveryTerms}
                onClick={handlePayment}
              >
                Перейти к оплате
              </Button>
              
              <div className='flex gap-2 items-center mt-3'>
                <Checkbox
                  checked={terms}
                  onChange={() => terms_h.toggle()}
                />
                <p onClick={() => terms_h.toggle()} className='cursor-pointer text-sm text-slate-400'>Соглашаюсь с правилами пользования торговой площадки и возврата</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        centered
        title='Список городов'
        opened={betweenCitiesModal?.modal}
        onClose={() => {
          setBetweenCitiesModal({
            cities: [],
            modal: false
          })
        }}
      >
        <p className='text-center'>Список городов в которые возможна доставка этого товара</p>
        <div className='flex flex-wrap gap-3 mt-4'>
          {betweenCitiesModal?.cities?.map((q) => {
            return (
              <div key={Math.random()} className='border p-3 rounded-full inline-block w-fit'>{q}</div>
            )
          })}
        </div>
      </Modal>
    </>
  )
}