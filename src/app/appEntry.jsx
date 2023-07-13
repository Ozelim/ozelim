import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { MantineProvider, createEmotionCache } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './appRouter'

import 'dayjs/locale/ru'
import dayjs from 'dayjs'

dayjs.locale('ru')

const cache = createEmotionCache({
  key: 'mantine',
  prepend: false
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withCSSVariables
      emotionCache={cache}
      theme={{
        primaryColor: 'teal',
        primaryShade: 5,
        defaultRadius: 'md',
      }}
    >
      <ModalsProvider>
        <RouterProvider router={appRouter}/>
        <Notifications/>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>,
)
