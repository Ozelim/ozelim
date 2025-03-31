import React from 'react'
import { useShopStore } from './shopStore'
import { Button, FileInput, TextInput } from '@mantine/core'
import { pb } from 'shared/api'

export const ShopData = () => {
 
  const {shop} = useShopStore()

  async function createStore () {
    // await pb.collection('markets').create({})
  }

  return (
    <div className='max-w-xs p-3 border shadow-sm rounded-primary bg-white'>
      <TextInput
        label='Название'
        value={shop?.name}
        variant='filled'
        readOnly
      />
      <TextInput
        label='Описание'
        value={shop?.desc}
        variant='filled'
        readOnly
      />
      <TextInput
        label='Контакты'
        value={shop?.phone}
        variant='filled'
        readOnly
      />
    </div>
  )
}
