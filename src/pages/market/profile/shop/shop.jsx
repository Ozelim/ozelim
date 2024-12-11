import {
  Button,
  CloseButton,
  FileButton,
  FileInput,
  Modal,
  Select,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core'
import React from 'react'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { useShopStore } from './shopStore'

import { cities, compress, formatNumber } from 'shared/lib'
import { randomId, useDisclosure } from '@mantine/hooks'
import { ProductPage } from 'pages'

async function getCategories() {
  return (await pb.collection('categories').getFullList())?.[0]
}

export const Shop = () => {
  const { user } = useAuth()

  const { shop } = useShopStore()

  const [categories, setCategories] = React.useState({})

  React.useEffect(() => {
    getCategories().then((res) => {
      setCategories(res)
    })
  }, [])

  const [preview, preview_h] = useDisclosure(false)

  const [product, setProduct] = React.useState({
    name: '',
    description: '',
    additional: '',
    price: '',
    city: '',
  })

  const [category, setCategory] = React.useState({
    main: '',
    sub: '',
  })

  const cats = categories?.categories?.map((e) => {
    return {
      label: e?.label,
      value: e?.label,
    }
  })

  const subCats = categories?.categories
    ?.filter((q) => q?.label === category?.main)?.[0]
    ?.subs?.map((e) => {
      return {
        label: e?.label,
        value: e?.label,
      }
    })

  const [pics, setPics] = React.useState([])
  const [deletedPics, setDeletedPics] = React.useState([])

  function deletePic(index) {
    const newPics = pics?.filter((_, i) => i !== index)
    setPics(newPics)
  }

  async function createProduct() {

    const formData = new FormData()

    const createdProduct = await pb.collection('products').create({
      ...product,
      market_id: shop?.id,
      agent: user?.id,
      status: 'created',
      category: category.main,
      sub_category: category.sub
    })

    for (let q of pics) {
      await compress(q, {quality: 0.5, maxWidth: 1500, maxHeight: 1500})
      .then(async res => {
        const file = new File([res], randomId().replace('mantine-', ''))
        formData.append(`pics`, file)
      })
    }

    await pb.collection('products').update(createdProduct?.id, formData)
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="max-w-xs">
          <TextInput
            label="Название"
            value={product?.name ?? ''}
            onChange={(e) => setProduct({ ...product, name: e?.currentTarget?.value })}
          />
          <Select
            data={cats ?? []}
            onChange={(e) => setCategory({ ...category, main: e })}
            label="Категория"
            value={category?.main ?? ''}
          />

          <Select
            data={subCats ?? []}
            label="Под категория"
            onChange={(e) => setCategory({ ...category, sub: e })}
            value={category?.sub ?? ''}
          />
          <div>
            <div className="flex gap-4 items-end">
              <FileButton
                onChange={(e) => setPics([...pics, e])}
                label="Выбрать картинку"
                variant="filled"
                accept="image/png,image/jpeg"
                className='mt-4'
              >
                {(props) => <Button {...props}>Добавить картинку</Button>}
              </FileButton>
            </div>
            <div className="flex gap-4 flex-wrap">
              {pics?.map((q, i) => {
                return (
                  <div className="relative">
                    <CloseButton
                      className="absolute top-5 -right-[75px]"
                      size={22}
                      bg="white"
                      onClick={() => deletePic(i)}
                    />
                    <img
                      src={URL.createObjectURL(q)}
                      alt=""
                      className="w-24 aspect-square object-cover"
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <Textarea
            label="Описание"
            value={product?.description ?? ''}
            onChange={(e) => setProduct({ ...product, description: e?.currentTarget?.value })}
            className="mt-4"
          />
          <Textarea
            label="Доп. информация"
            value={product?.additional ?? ''}
            onChange={(e) => setProduct({ ...product, additional: e?.currentTarget?.value })}
          />
          <TextInput
            label="Цена"
            value={product?.price ?? ''}
            onChange={(e) => setProduct({ ...product, price: e?.currentTarget?.value })}
          />
          <Select
            label="Город"
            data={cities}
            value={product?.city ?? ''}
            onChange={(e) => setProduct({ ...product, city: e })}
          />
          <div className="flex justify-center mt-4">
            <Button
              onClick={createProduct}
            >
              Добавить товар
            </Button>
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-col shadow-lg border p-2 h-min max-w-[268px] w-full">
            <div>
              <img
                src={pics?.[0] && URL.createObjectURL(pics?.[0])}
                alt=""
                className="aspect-square object-cover"
              />
              <Text className=" mt-3" lineClamp={2}>
                {product?.name}
              </Text>
              <Text className=" mt-2 !text-[15px]" lineClamp={3}>
                {product?.description}
              </Text>
              <p className="mt-2 font-bold ">
                {formatNumber(product?.price)} ₸
              </p>
            </div>
            <Button 
              fullWidth 
              className="mt-3 flex-shrink"
              onClick={() => preview_h.open()}
            >
              Предпросмотр
            </Button>
          </div>
        </div>
      </div>

      <Modal
        fullScreen
        opened={preview}
        onClose={() => preview_h.close()}
        centered
      >
        <ProductPage 
          preview={{
            ...product,
            category: category?.main,
            sub_category: category?.sub,
            pics
          }} 
        />
      </Modal>
    </>
  )
}