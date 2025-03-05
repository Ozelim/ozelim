import React from 'react'
import dayjs from 'dayjs'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { formatNumber, getImageUrl } from 'shared/lib'
import { Button, Tabs, Text, TextInput } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { useDisclosure } from '@mantine/hooks'

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
          <div className="flex flex-col gap-4 mt-4">
            {orders?.map((q, i) => {  
              
              const p = q?.expand?.product_id
              const statusToCancel = q?.status === 'paid' || q?.status === 'waiting' || q?.status === 'processing'

              return (
                <div key={i} className='flex gap-4 bg-white border shadow-sm rounded-primary overflow-hidden'>
                  <img 
                    src={getImageUrl(p, p?.pics?.[0])} 
                    alt={''} 
                    className='w-28 h-28 object-cover my-auto'
                  />
                  <div className='space-y-1 py-2 max-w-xs w-full overflow-hidden'>
                    <Text lineClamp={1}>{p?.name}</Text>
                    <p className='text-sm'>Количество: {q?.product?.count}</p>
                    <p className='text-sm'>Потрачено бонусов: {formatNumber(q?.bonuses_spent)}</p>
                    {q?.pay_type === 'balance' && (
                      <p className='text-sm'>Оплачено балансом: {formatNumber(q?.total_cost - q?.bonuses_spent)}</p>
                    )}
                    {q?.pay_type === 'card' && (
                      <p className='text-sm'>Оплачено картой: {formatNumber(q?.total_cost - q?.bonuses_spent)}</p>
                    )}
                    {q?.pay_type === 'bonuses' && (
                      <p className='text-sm'>Оплачено бонусами: {formatNumber(q?.bonuses_spent)}</p>
                    )}
                  </div>
                  <div className='py-2 ml-4 space-y-1'>
                    <p className='text-sm space-x-2'> 
                      <span className='text-base'>
                        Заказ: 
                      </span>
                      <span className='tracking-wider text-base'>
                        {q?.id}
                      </span>
                    </p>
                    <p className='text-sm space-x-2'> 
                      <span>
                        Дата:
                      </span>
                      <span>
                        {dayjs(q?.created).format('DD.MM.YYYY')}
                      </span>
                    </p>
                    <p className='text-sm'> 
                      <span>
                        Статус:
                      </span>
                      <Button
                        compact
                        variant='subtle'
                      >
                        {statuses[q?.status]}
                      </Button>
                    </p>
                    <p className='text-sm space-x-2'> 
                      <span>
                        Оплачено:
                      </span>
                      <span>
                        {formatNumber(q?.product?.price * q?.product?.count)} ₸
                      </span>
                    </p>
                  </div>
                  {statusToCancel && (
                    <div className='ml-auto flex items-end'>
                      <Button
                        compact
                        size='sm'
                        variant='white'
                        onClick={() => handleCancelOrder(q)}
                      >
                        Отменить заказ
                      </Button>
                    </div>
                  )}
                </div>
            )})}
          </div>
        </Tabs.Panel>
        <Tabs.Panel value='ended' pt={20}></Tabs.Panel>
        <Tabs.Panel value='canceled' pt={20}>

          {canceledOrders?.items?.map((q, i) => {  
                
            const p = q?.expand?.product_id
            const statusToCancel = q?.status === 'paid' || q?.status === 'waiting' || q?.status === 'processing'

            return (
              <div key={i} className='flex gap-4 bg-white border shadow-sm rounded-primary overflow-hidden'>
                <div key={i} className='max-w-[400px] w-full flex gap-4'>
                  <img 
                    src={getImageUrl(p, p?.pics?.[0])} 
                    alt={''} 
                    className='w-24 h-24 object-cover'
                  />
                  <div>
                    <Text lineClamp={1}>{p?.name}</Text>
                    <p className='text-sm'>Количество: {q?.product?.count}</p>
                    <p className='text-sm'>Потрачено бонусов: {formatNumber(q?.bonuses_spent)}</p>
                    {q?.pay_type === 'balance' && (
                      <p className='text-sm'>Оплачено балансом: {formatNumber(q?.bonuses_spent)}</p>
                    )}
                    {q?.pay_type === 'card' && (
                      <p className='text-sm'>Оплачено картой: {formatNumber(q?.total_cost - q?.bonuses_spent)}</p>
                    )}
                    {q?.pay_type === 'bonuses' && (
                      <p className='text-sm'>Оплачено бонусами: {formatNumber(q?.bonuses_spent)}</p>
                    )}
                  </div>
                </div>
                <div className='max-w-[280px] w-full'>
                  <p className='grid grid-cols-[30%_auto] gap-3'> 
                    <span className='text-[15px]'>
                      Заказ 
                    </span>
                    <span className='tracking-wide text-sm'>
                    {q?.id}
                    </span>
                </p>
                  <p className='grid grid-cols-[30%_auto] gap-3'> 
                    <span className='text-[15px]'>
                      Дата:
                    </span>
                    <span className='tracking-wide text-sm'>
                    {dayjs(q?.created).format('DD.MM.YYYY')}
                    </span>
                  </p>
                  <p className='grid grid-cols-[30%_auto] gap-3'> 
                    <span className='text-[15px]'>
                      Статус:
                    </span>
                    <Button>
                      {statuses[q?.status]}
                    </Button>
                  </p>
                  <p className='grid grid-cols-[30%_auto] gap-3'> 
                    <span className='text-[15px]'>
                      Оплачено:
                    </span>
                    <span className='tracking-wide text-sm'>
                    {formatNumber(q?.product?.price * q?.product?.count)} ₸
                    </span>
                  </p>
                </div>
                {statusToCancel && (
                  <div className='ml-auto flex items-end'>
                    <Button
                      compact
                      size='sm'
                      variant='white'
                      onClick={() => handleCancelOrder(q)}
                    >
                      Отменить заказ
                    </Button>
                  </div>
                )}
              </div>
            )}
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}