import React from 'react'
import dayjs from 'dayjs'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { formatNumber, getImageUrl } from 'shared/lib'
import { Button, Tabs, Text, TextInput } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { useDisclosure } from '@mantine/hooks'
import { OrderItem } from './order-item'
async function getOrders (id) {
  return await pb.collection('orders').getFullList({
    filter: `user = '${id}' && status != 'canceled' && status != 'delivered' && status != 'received'`,
    expand: 'product_id, market_id'
  })
}

async function getEndedOrders (id, page = 1) {
  return await pb.collection('orders').getList(page, 20, {
    filter: `user = '${id}' && status = 'delivered' && status = 'received'`,
    expand: 'product_id, market_id'
  })
}

async function getCanceledOrders (id, page = 1) {
  return await pb.collection('orders').getList(page, 20, {
    filter: `user = '${id}' && status = 'canceled'`,
    expand: 'product_id, market_id'
  })
}

const statuses = {
  waiting: 'Ожидает оплаты',
  processing: 'В обработке',
  paid: 'Оплачено',
  moving: 'В пути',
  delivered: 'Доставлено', 
  received: 'Получено',
  returned: 'Возвращен',
  canceled: 'Отменен'
}

export const UserOrders = () => {

  const {user} = useAuth()

  const [orders, setOrders] = React.useState([])

  const [endedOrders, setEndedOrders] = React.useState({})
  const [canceledOrders, setCanceledOrders] = React.useState({})

  async function handleOrders (type) {
    if (type === 'orders') await getOrders(user?.id)
    .then(res => {
      setOrders(res)
    })
    if (type === 'canceled') await getCanceledOrders(user?.id)
    .then(res => {
      setCanceledOrders(res)
    })
    if (type === 'ended') await getEndedOrders(user?.id)
    .then(res => {
      setEndedOrders(res)
    })
  }

  React.useEffect(() => {
    handleOrders('orders')
    handleOrders('canceled')
    handleOrders('ended')
  }, [])

  const [orderToCancel, setOrderToCancel] = React.useState(null)
  const [cancelingOrder, cancelingOrder_h] = useDisclosure(false) 
  const [cancelOrderLoading, cancelOrderLoading_h] = useDisclosure(false)
  const [cancelOrderData, setCancelOrderData] = React.useState({
    name: '',
    iban: '',
    iin: ''
  })

  function handleCancelOrder (q) {

    if (q?.pay_type === 'card') {
      setOrderToCancel(q)
      cancelingOrder_h.open()
      return
    }

    cancelOrderModal(q)
  }

  function handleCancelOrderBack () {
    setOrderToCancel(null)
    cancelingOrder_h.close()
  }

  async function cancelOrder (order) {
    cancelOrderLoading_h.open()
    await pb.collection('orders').update(order?.id ?? orderToCancel?.id, {
      status: 'canceled',
      refund_data: {...cancelOrderData}
    })
    .then(async () => {

      if (orderToCancel?.id && orderToCancel?.pay_type === 'card') {
        await pb.collection('agents').update(orderToCancel?.user, {
          'bonuses+': orderToCancel?.bonuses_spent
        })
      }

      if (order?.id && order?.pay_type === 'bonuses') {
        await pb.collection('agents').update(order?.user, {
          'bonuses+': order?.bonuses_spent,
        })
      }

      if (order?.id && order?.pay_type === 'balance') {
        await pb.collection('agents').update(order?.user, {
          'bonuses+': order?.bonuses_spent,
          'balance+': order?.total_cost - order?.bonuses_spent ?? 0,
        })
      }
      
      await handleOrders('orders')
      await handleOrders('canceled')
    })
    cancelingOrder_h.close()
    cancelOrderLoading_h.close()
  }

  async function cancelOrderModal (q) {
    openConfirmModal({
      title: 'Отмена заказа',
      children: 'Вы уверены, что хотите отменить заказ?',
      centered: true,
      labels: { confirm: 'Отменить', cancel: 'Назад' },
      onConfirm: async () => await cancelOrder(q)
    })
  }

  if (cancelingOrder) {
    return (
      <div className='w-full h-full'>
        <form className='max-w-sm mx-auto my-8 bg-white p-3 shadow-sm border rounded-primary'>
          <TextInput
            label="Владелец счета"
            placeholder='ФИО'
            value={cancelOrderData?.name}
            onChange={(e) => setCancelOrderData({...cancelOrderData, name: e.target.value})}
            variant='filled'
            required
          />
          <TextInput
            label='ИИН'
            placeholder="030627129340"
            value={cancelOrderData?.iin}
            onChange={(e) => setCancelOrderData({...cancelOrderData, iin: e.target.value})}
            variant='filled'
            required
          />
          <TextInput
            label='Номер счета карты (IBAN)'
            placeholder="KZ123456789123456789"
            value={cancelOrderData?.iban}
            onChange={(e) => setCancelOrderData({...cancelOrderData, iban: e.target.value})}
            variant='filled'
            required
          />
          <div className="flex justify-center mt-4 gap-4">
            <Button
              onClick={handleCancelOrderBack}
            >
              Назад
            </Button>
            <Button
              onClick={cancelOrderModal}
              loading={cancelOrderLoading}
            >
              Отменить заказ
            </Button>
          </div>
        </form>
      </div>
    )
  }
  
  return (
    <div className='w-full'>
      <Tabs
        className='mt-3'
        defaultValue='orders'
      >
        <Tabs.List position='center'>
          <Tabs.Tab value='orders'>Актуальные</Tabs.Tab>
          <Tabs.Tab value='ended'>Завершенные</Tabs.Tab>
          <Tabs.Tab value='canceled'>Отмененные</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='orders' pt={20}>
          {orders?.length === 0 && (
            <div className='flex justify-center items-center h-full'>
              <p className='text-lg'>У вас нет активных заказов</p>
            </div>
          ) }
          <div className="flex flex-col gap-4 mt-4">
            {orders?.map((q, i) => {  
              return (
                <OrderItem
                  key={i}
                  order={q}
                  handleCancelOrder={handleCancelOrder}
                />
            )})}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value='ended' pt={20}>
          {endedOrders?.items?.length === 0 && (
            <div className='flex justify-center items-center h-full'>
              <p className='text-lg'>У вас нет завершенных заказов</p>
            </div>
          )}
          <div className="flex flex-col gap-4 mt-4">
            {endedOrders?.items?.map((q, i) => {  
              return (
                <OrderItem
                  key={i}
                  order={q}
                  handleCancelOrder={handleCancelOrder}
                />
            )})}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value='canceled' pt={20}>
          {canceledOrders?.items?.length === 0 && (
            <div className='flex justify-center items-center h-full'>
              <p className='text-lg'>У вас нет отмененных заказов</p>
            </div>
          ) }
          <div className="flex flex-col gap-4 mt-4">
            {canceledOrders?.items?.map((q, i) => {  
              return (
                <OrderItem
                  key={i}
                  order={q}
                  handleCancelOrder={handleCancelOrder}
                />
            )})}
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}