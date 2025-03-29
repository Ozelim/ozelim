import React from 'react'
import { NewLayout } from "shared/ui";

import { MantineProvider, createEmotionCache } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'

import dayjs from 'dayjs'
import { ImageModal } from 'shared/ui'
import { LangProvider } from "app/langContext";
import { MarketNavbar } from 'widgets/market/navbar';
import { MarketFooter } from 'widgets/market/footer';
import { CustomerSignupModal } from 'pages/market/login/customer-signup'

import 'dayjs/locale/ru'

dayjs.locale('ru')

import '../../app/index.css'


const cache = createEmotionCache({
  key: 'market',
  prepend: false
})

export const marketLayout = (
  <LangProvider>
    <MantineProvider
      withGlobalStyles
      withCSSVariables
      emotionCache={cache}
      theme={{
        primaryColor: 'teal',
        primaryShade: 6,
        fontFamily: 'Comfortaa, sans-serif',
        defaultRadius: 'lg'
      }}
    >
        <ModalsProvider 
          modals={{
            image: ImageModal,
            customerSignup: CustomerSignupModal
          }}
        >
        <NewLayout
          headerSlot={<MarketNavbar/>}
          footerSlot={<MarketFooter/>}
        />
        <Notifications position='top-right'/>
      </ModalsProvider>
    </MantineProvider>
  </LangProvider>
)