import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from 'shared/hooks'
import { Dashboard } from './shop/dashboard'
import { Chat } from './user/chat'
import { UserReviews } from './user/user-reviews'
import { OrderHistory } from './user/order-history'
import { UserOrders } from './user/user-orders'
import { useNotificationStore } from './user/notificationStore'
import { readNotification } from 'shared/lib'
import { SegmentedControl, Button } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Link } from 'react-router-dom'

export const MarketProfile = () => {

  const mediaQuery = useMediaQuery('(max-width: 878px)')

  const {user} = useAuth()

  const [params, setParams] = useSearchParams()

  const {nots} = useNotificationStore()

  async function handletab (e) {
    params.set('tab', e)
    setParams(params)

    if (e === 'orders' && nots?.order) {
      await readNotification(nots?.id, 'order')
    }
    
    if (e === 'messages' && nots?.messages) {
      await readNotification(nots?.id, 'messages')
    }
  }

  React.useEffect(() => {
    if (!params.get('tab')) {
      params.set('tab', 'orders')
      setParams(params)
    }
  }, [])

  if (user?.collectionName === 'merchants' && !user?.posted) return (
    <div className='container-market market h-screen'>
      <div className="flex justify-center items-center w-full h-full flex-col gap-2">
        Мы рассматриваем вашу заявку на создание магазина, ожидайте
        <Button component={Link} to='/duken' variant='subtle' color='teal'>
          На главную
        </Button>
      </div>
    </div>
  )

  if (user?.duken) return <Dashboard/>

  return (
    <>
      <div className='container-market market h-full'>
        <div className='market h-full mt-8'>
          <div className='bg-white p-3 border shadow-sm rounded-primary'>
            <SegmentedControl
              data={[
                { label: <span>Заказы {nots?.order && <div className='bg-primary-500 w-4 h-4 rounded-full absolute right-2 top-2'/>}</span>, value: 'orders' },
                { label: <span>Сообщения {nots?.messages && <div className='bg-primary-500 w-4 h-4 rounded-full absolute right-2 top-2'/>}</span>, value: 'messages' },
                { label: 'Отзывы', value: 'reviews' },
                { label: 'История покупок', value: 'history' },
                { label: 'Профиль', value: 'profile' },
              ]}
              value={params.get('tab') ?? 'orders'}
              onChange={(e) => handletab(e)}
              fullWidth
              color='teal.6'
              radius='md'
              orientation={mediaQuery ? 'vertical' : 'horizontal'}
            />
          </div>
          <>
            {params.get('tab') === 'messages' && <Chat/>}
            {params.get('tab') === 'reviews' && <UserReviews/>}
            {params.get('tab') === 'history' && <OrderHistory/>}
            {params.get('tab') === 'orders' && <UserOrders/>}
            {params.get('tab') === 'profile' && <div className='mt-4'>
              <p>Профиль</p>
            </div>}
          </>
        </div>
      </div>
    </>
  )
}