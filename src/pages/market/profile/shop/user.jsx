import React from 'react'
import { useShopStore } from './shopStore'
import { Button, FileInput, TextInput } from '@mantine/core'
import { pb } from 'shared/api'

export const User = () => {
 
  const {shop} = useShopStore()

  const [store, setStore] = React.useState({
    name: '',
    description: '',
    avatar: '',
  })


  async function createStore () {
    // await pb.collection('markets').create({})
  }

  return (
    <div className='max-w-xs'>
      <TextInput
        label='Название'
        value={store?.name}
        onChange={e => setStore({...store, name: e?.currentTarget?.value})}
      />
      <TextInput
        label='Описание'
        value={store?.description}
        onChange={e => setStore({...store, description: e?.currentTarget?.value})}
      />
      <div className='flex gap-4 items-end'>
        <FileInput
          label='Выбрать картинку'
          w={150}
          variant='filled'
          placeholder='png/jpg'
        />
        <Button>
          Добавить
        </Button>
      </div>

      <div className="flex gap-4 justify-center mt-4">
        <Button>
          Создать магазин
        </Button>
      </div>
      
    </div>
  )
}
