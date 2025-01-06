import React from 'react'
import { ProfileData } from './profile-data'
import { SegmentedControl, Tabs } from '@mantine/core'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from 'shared/hooks'
import { Dashboard } from './shop/dashboard'
import { MarketCart } from '../cart/market-cart'

export const MarketProfile = () => {

  const {user} = useAuth()

  const [params, setParams] = useSearchParams()

  function handleSegment (e) {
    params.set('segment', e)
    setParams(params)
  }

  if (user?.duken) return <Dashboard/>

  return (
    <div className='container-market market'>
      <div className='grid md:grid-cols-[20%_auto] gap-4'>
        <ProfileData/>
        <div className='market'>
          <SegmentedControl
            data={[
              { label: 'Сообщения', value: 'messages' },
              // { label: 'Корзина', value: 'cart' },
              { label: 'Отзывы', value: 'comments' },
              { label: 'История покупок', value: 'orders' },
            ]}
            value={params.get('segment') ?? 'messages'}
            onChange={(e) => handleSegment(e)}
            fullWidth
          />

          <div className='flex justify-between items-center gap-4 border shadow-md p-3 mt-4'>
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
          </div>

          <div className='p-4'>
            {params.get('segment') === 'messages' && (
              <div>messages</div>
            )}
            {/* {params.get('segment') === 'cart' && (
              <div className='-mx-8'>
                <MarketCart/>
              </div>
              )} */}
            {params.get('segment') === 'comments' && (
              <div>comments</div>
            )}
            {params.get('segment') === 'orders' && (
              <div>orders</div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  )
}