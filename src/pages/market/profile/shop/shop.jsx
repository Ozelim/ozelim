import { Button, FileInput, Select, TextInput, Textarea } from '@mantine/core'
import React from 'react'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'

async function getShopById (id) {
  return await pb.collection('markets').getFirstListItem(`agent = '${id}'`)
}

async function getCategories () {
  return await pb.collection('categories').getFirstListItem()
}

export const Shop = () => {

  const {user} = useAuth()

  const [createdShop, setCreatedShop] = React.useState({})
  const [shop, setShop] = React.useState({})

  const [categories, setCategories] = React.useState({})

  React.useEffect(() => {
    getShopById(user?.id)
    .then(res => {
      setShop(res)
    })

    getCategories()
    .then(res => {
      setCategories(res)
    })
  }, [])

  const [pics, setPics] = React.useState([])
  const [deletedPics, setDeletedPics] = React.useState([])

  async function upload () {
    
  }

  if (!shop?.id) return (
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

  return (
    <div>
    </div>
  )
}
