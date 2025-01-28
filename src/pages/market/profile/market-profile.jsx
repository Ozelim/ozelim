import React from 'react'
import { ProfileData } from './profile-data'
import { SegmentedControl, Tabs } from '@mantine/core'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from 'shared/hooks'
import { Dashboard } from './shop/dashboard'
import { Chat } from './shop/chat'
import { UserReviews } from './user/user-reviews'
import { OrderHistory } from './user/order-history'
import { UserOrders } from './user/user-orders'

export const MarketProfile = () => {

  const {user} = useAuth()

  const [params, setParams] = useSearchParams()

  function handleSegment (e) {
    params.set('segment', e)
    setParams(params)
  }

  React.useEffect(() => {
    if (!params.get('segment')) {
      params.set('segment', 'messages')
      setParams(params)
    }
  }, [])

  if (user?.duken) return <Dashboard/>

  return (
    <div className='container-market market'>
      <div className='gap-4 py-4'>
        {/* <ProfileData/> */}
        <div className='market'>
          <SegmentedControl
            data={[
              { label: 'Заказы', value: 'orders' },
              { label: 'Сообщения', value: 'messages' },
              { label: 'Отзывы', value: 'reviews' },
              { label: 'История покупок', value: 'history' },
            ]}
            value={params.get('segment') ?? 'messages'}
            onChange={(e) => handleSegment(e)}
            fullWidth
          />

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
            {/* {params.get('segment') === 'cart' && (
              <div className='-mx-8'>
                <MarketCart/>
              </div>
              )} */}
            {params.get('segment') === 'reviews' && <UserReviews/>}
            {params.get('segment') === 'history' && <OrderHistory/>}
            {params.get('segment') === 'orders' && <UserOrders/>}
          </>
        </div>
        
      </div>
    </div>
  )
}