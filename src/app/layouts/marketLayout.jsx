import React from 'react'
import { Layout, NewLayout } from "shared/ui";
import { Footer } from "widgets/Footer";
import { Header } from "widgets/Header";
import { SubHeader } from "widgets/SubHeader";

import { MantineProvider, createEmotionCache } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'

import dayjs from 'dayjs'
import { ImageModal } from 'shared/ui'
import { LangProvider } from "app/langContext";
import { MarketNavbar } from 'widgets/market/navbar';

import 'dayjs/locale/ru'

dayjs.locale('ru')

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
        primaryColor: 'violet',
        primaryShade: 5,
        fontFamily: 'Sofia Sans Semi Condensed, sans-serif'
      }}
    >
        <ModalsProvider 
          modals={{image: ImageModal}}
        >
        <NewLayout
          headerSlot={<MarketNavbar/>}
          footerSlot={<Footer/>}
        />
        <Notifications position='top-right'/>
      </ModalsProvider>
    </MantineProvider>
  </LangProvider>
)