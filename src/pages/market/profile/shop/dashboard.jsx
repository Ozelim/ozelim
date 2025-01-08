import React from 'react'
import { MantineProvider, clsx, createEmotionCache } from '@mantine/core'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from 'shared/hooks'
import { Shop } from './shop'
import { User } from './user'
import { useShopStore } from './shopStore'
import { Products } from '../products/products'
import { Reviews } from './reviews'
import { Messages } from './messages'

const cache = createEmotionCache({
  key: 'mantine',
  prepend: false,
})

export const Dashboard = () => {
  const [params, setParams] = useSearchParams()

  const { getShopById } = useShopStore()

  const { user } = useAuth()

  React.useEffect(() => {
    getShopById(user?.id)
  }, [])

  const array = [
    { label: 'Общее', path: 'stats' },
    { label: 'Профиль', path: 'user' },
    { label: 'Магазин', path: 'shop' },
    { label: 'Товары', path: 'products' },
    { label: 'Отзывы', path: 'reviews' },
    { label: 'Сообщения', path: 'messages' },
  ]

  function handleTab(e) {
    params.set('tab', e)
    setParams(params)
  }

  return (
    <MantineProvider
      withGlobalStyles
      withCSSVariables
      emotionCache={cache}
      theme={{
        primaryColor: 'pink',
        primaryShade: 6,
      }}
    >
      <div className=" market">
        <div className="grid grid-cols-[200px_auto]">
          <div className="flex flex-col border shadow-md bg-pink-600 h-screen">
            {array.map((page, i) => {
              return (
                <div
                  key={i}
                  className={clsx('p-4 text-sm inline cursor-pointer text-white', {
                    'bg-white !text-pink-600': params.get('tab') === page.path,
                  })}
                  onClick={() => handleTab(page?.path)}
                >
                  <span>{page?.label}</span>
                </div>
              )
            })}
          </div>
          <div className="p-4">
            {params.get('tab') === 'stats' && <></>}
            {params.get('tab') === 'user' && <User />}
            {params.get('tab') === 'shop' && <Shop />}
            {params.get('tab') === 'products' && <Products />}
            {params.get('tab') === 'reviews' && <Reviews/>}
            {params.get('tab') === 'messages' && <Messages/>}
          </div>
        </div>
      </div>
    </MantineProvider>
  )
}
