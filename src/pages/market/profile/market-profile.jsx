import React from 'react'
import { ProfileData } from './profile-data'
import { SegmentedControl, Tabs } from '@mantine/core'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from 'shared/hooks'
import { Dashboard } from './shop/dashboard'
import { Chat } from './user/chat'
import { UserReviews } from './user/user-reviews'
import { OrderHistory } from './user/order-history'
import { UserOrders } from './user/user-orders'
import { useNotificationStore } from './user/notificationStore'
import { readNotification } from 'shared/lib'

export const MarketProfile = () => {

  const {user} = useAuth()

  const [params, setParams] = useSearchParams()

  const {nots} = useNotificationStore()

  async function handleSegment (e) {
    params.set('segment', e)
    setParams(params)

    if (e === 'orders' && nots?.order) {
      await readNotification(nots?.id, 'order')
    }
    
    if (e === 'messages' && nots?.messages) {
      await readNotification(nots?.id, 'messages')
    }
  }

  React.useEffect(() => {
    if (!params.get('segment')) {
      params.set('segment', 'orders')
      setParams(params)
    }
  }, [])

  if (user?.collectionName === 'merchants' && !user?.posted) return (
    <div className='container-market market'>
      <div className="flex justify-center items-center w-full h-full">
        Магазин еще не создан
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
              ]}
              value={params.get('segment') ?? 'orders'}
              onChange={(e) => handleSegment(e)}
              fullWidth
              color='teal.6'
              radius='md'
            />
          </div>

          {/* <div className='flex justify-between items-center gap-4 border shadow-md p-3 mt-4'>
            <div className='flex items-center gap-4'>
              <img 
                src="https://people.com/thmb/NDasPbZOWfpi2vryTpDta_MJwIY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(602x285:604x287)/newjeans-111023-1-c7ed1acdd72e4f2eb527cc38144aa2d4.jpg" 
                alt="" 
                className='w-20 object-cover aspect-square'
              />
              <div>
                <p>Lorem, ipsum.</p>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div>
              Lorem, ipsum dolor.
            </div>
          </div> */}
          <>
            {params.get('segment') === 'messages' && <Chat/>}
            {params.get('segment') === 'reviews' && <UserReviews/>}
            {params.get('segment') === 'history' && <OrderHistory/>}
            {params.get('segment') === 'orders' && <UserOrders/>}
          </>
        </div>
      </div>
    </>
  )
}