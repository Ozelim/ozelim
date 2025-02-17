import React from 'react'
import { Layout } from "shared/ui";
import { Footer } from "widgets/Footer";
import { Header } from "widgets/Header";
import { SubHeader } from "widgets/SubHeader";

import { MantineProvider, createEmotionCache } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'

import dayjs from 'dayjs'
import { ImageModal } from 'shared/ui'
import { LangProvider } from "app/langContext";

import 'dayjs/locale/ru'

dayjs.locale('ru')

const cache = createEmotionCache({
  key: 'mantine',
  prepend: false
})

export const baseLayout = (
  <LangProvider>
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
      <ModalsProvider 
        modals={{image: ImageModal}}
      >
        <Layout
          subheaderSlot={<SubHeader/>}
          headerSlot={<Header/>}
          footerSlot={<Footer/>}
        />
        <Notifications position='top-right'/>
      </ModalsProvider>
    </MantineProvider>
  </LangProvider>
)