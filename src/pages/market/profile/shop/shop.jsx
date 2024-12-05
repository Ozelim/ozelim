import { Button, FileInput, Select, TextInput, Textarea } from '@mantine/core'
import React from 'react'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { useShopStore } from './shopStore'

async function getCategories () {
  return (await pb.collection('categories').getFullList())?.[0]
}

export const Shop = () => {

  const {user} = useAuth()

  const {shop} = useShopStore()

  const [createdShop, setCreatedShop] = React.useState({})

  const [categories, setCategories] = React.useState({})

  React.useEffect(() => {

    getCategories()
    .then(res => {
      setCategories(res)
    })
  }, [])

  const [pics, setPics] = React.useState([])
  const [deletedPics, setDeletedPics] = React.useState([])

  const cats = categories?.categ

  async function upload () {
    
  }
    return (
      <div className='max-w-xs'>
        <TextInput
          label='Название'
        />
        <Select
          data={[]}
          label='Категория'
        />
        <div className='flex gap-4 items-end'>
          <FileInput 
            onChange={e => setPics([...pics, e])}  
            label='Выбрать картинку'
            w={150}
            variant='filled'
            placeholder='png/jpg'
          />
          <Button
            onClick={upload}
          >
            Добавить
          </Button>
        </div>
        <Textarea 
          label='Описание'
        />
        <Textarea
          label='Доп. информация'
        />
        <TextInput
          label='Цена'
        />
        <TextInput
          label='Город'
        />
        <div className='flex justify-center mt-4'>
          <Button>
            Создать магазин
          </Button>
        </div>
      </div>
    )
}
