import {
  Button,
  CloseButton,
  FileButton,
  FileInput,
  Modal,
  MultiSelect,
  Select,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core'
import React from 'react'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { useShopStore } from './shopStore'

import { cities, compress } from 'shared/lib'
import { randomId, useDisclosure } from '@mantine/hooks'
import { ProductPage } from 'pages'
import { Product } from 'pages/market/product'
import { useCategoriesStore } from 'pages/market/categoriesStore'

import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { FaPlus } from 'react-icons/fa'
import { set } from 'react-hook-form'
import { openConfirmModal } from '@mantine/modals'

export const AddProduct = () => {

  const { user } = useAuth()
  const { shop } = useShopStore()
  const { categories } = useCategoriesStore()

  const [preview, preview_h] = useDisclosure(false)
  const [optionsModal, optionsModal_h] = useDisclosure(false)

  const [option, setOption] = React.useState({
    name: '',
    creatable: false
  })
  const [variants, setVariants] = React.useState([])

  const [options, setOptions] = React.useState([])

  const [product, setProduct] = React.useState({
    name: '',
    description: '',
    additional: '',
    price: '',
    city: '',
  })

  const [content, setContent] = React.useState('')

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }], // Headers
      ["bold", "italic", "underline", "strike"], // Text styles
      [{ align: [] }], // Alignment buttons (left, center, right, justify)
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ color: [] }, { background: [] }], // Colors
      ["clean"], // Remove formatting
    ],
  };

  const [category, setCategory] = React.useState({
    main: '',
    sub: '',
  })

  const cats = categories?.map((e) => {
    return {
      label: e?.label,
      value: e?.label,
    }
  })

  const subCats = categories
    ?.filter((q) => q?.label === category?.main)?.[0]
    ?.subs?.map((e) => {
      return {
        label: e?.label,
        value: e?.label,
      }
    })

  const [pics, setPics] = React.useState([])

  function deletePic(index) {
    const newPics = pics?.filter((_, i) => i !== index)
    setPics(newPics)
  }

  async function beforeCreateProduct() {
    openConfirmModal({
      title: 'Создание товара',
      children: 'Вы уверены что хотите создать товар?',
      onConfirm: async () => await createProduct(),
      centered: true,
      labels: {confirm: 'Создать', cancel: 'Отмена'}
    })
  }

  async function createProduct() {

    if (!product?.name || !product?.description || !product?.price || !product?.city || !category?.main || !category?.sub || !content) {
      openConfirmModal({
        title: 'Ошибка',
        children: 'Заполните все поля',
        centered: true,
        labels: {confirm: 'Ок', cancel: 'Отмена'}
      })
      return
    }

    const formData = new FormData()

    const createdProduct = await pb.collection('products').create({
      ...product,
      market_id: shop?.id,
      merchant: user?.id,
      status: 'moderation',
      category: category.main,
      sub_category: category.sub, 
      content,
      options,
    })

    for (let q of pics) {
      await compress(q, { quality: 0.5, maxWidth: 1500, maxHeight: 1500 }).then(async (res) => {
        const file = new File([res], randomId().replace('mantine-', ''))
        formData.append(`pics`, file)
      })
    }

    await pb
      .collection('products')
      .update(createdProduct?.id, formData)
      .then(async (res) => {
        await pb.collection('markets').update(shop?.id, {
          products: [...shop?.products, res?.id],
        })
        .then(() => {
          console.log('Product created')
          setProduct({})
          setOptions([])
          setContent('')
          setPics([])
          setCategory({})
        })
      })
  }

  function addOption() {
    setOption({...option, creatable: true})
  }

  function saveoption () {
    setOptions([...options, {option: option?.name, id: randomId(), variants}])
    setOption({name: '', creatable: false})
    setVariants([])
    optionsModal_h.close()
  }

  return (
    <>
      <div>
        <p>Создание товара:</p>
        <div className="grid grid-cols-[320px_700px_auto] gap-4 mt-4">
          <div className="max-w-xs w-full">
            <TextInput
              label="Название"
              value={product?.name ?? ''}
              onChange={(e) => setProduct({ ...product, name: e?.currentTarget?.value })}
              variant="filled"
            />
            <Select
              data={cats ?? []}
              onChange={(e) => setCategory({ ...category, main: e })}
              label="Категория"
              value={category?.main ?? ''}
              variant="filled"
            />

            <Select
              data={subCats ?? []}
              label="Под категория"
              onChange={(e) => setCategory({ ...category, sub: e })}
              value={category?.sub ?? ''}
              variant="filled"
            />
            <div>
              <div className="flex gap-4 items-end">
                <FileButton
                  onChange={(e) => setPics([...pics, e])}
                  label="Выбрать картинку"
                  variant="filled"
                  accept="image/png,image/jpeg"
                  className="mt-4"
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
              label="Краткое описание"
              value={product?.description ?? ''}
              onChange={(e) => setProduct({ ...product, description: e?.currentTarget?.value })}
              variant="filled"
              className="mt-4"
              autosize
            />

            <Button
              rightIcon={<FaPlus />}
              className='mt-4'
              onClick={() => optionsModal_h.open()}
              disabled={options?.length >= 2}
            >
              Добавить опции
            </Button>
            <p className='text-xs text-slate-400 mt-1'>Максимум 2 опции</p>

            {options?.map((q) => {
              return (
                <div key={q?.id} className='mt-4'>
                  {q?.option}:
                  <div className="flex gap-4 flex-wrap mt-2">
                    {q?.variants?.map((e) => {
                      return (
                        <Button variant='outline'>
                          {e}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
            
            <TextInput
              label="Цена"
              value={product?.price ?? ''}
              onChange={(e) => setProduct({ ...product, price: e?.currentTarget?.value })}
              variant="filled"
              className='mt-2'
            />
            <TextInput
              label="Количество"
              value={product?.amount ?? ''}
              onChange={(e) => setProduct({ ...product, amount: e?.currentTarget?.value })}
              variant="filled"
            />
            <Select
              label="Город"
              data={cities}
              value={product?.city ?? ''}
              onChange={(e) => setProduct({ ...product, city: e })}
              variant="filled"
            />
            <div className="flex justify-center mt-4">
              <Button onClick={beforeCreateProduct}>Добавить товар</Button>
            </div>
          </div>
          
          <div className="mx-auto h-full w-full">
            <ReactQuill 
              value={content} 
              onChange={setContent} 
              theme="snow" 
              modules={modules} 
              className='h-full w-full'
            />
          </div>

          <div className="w-fit mx-auto h-fit">
            <p className='mb-3'>Карточка товара</p>
            <Product
              product={{
                ...product,
                category: category?.main,
                sub_category: category?.sub,
                pics,
              }}
              preview
              buttons={
                <Button fullWidth className="mt-3 flex-shrink" onClick={() => preview_h.open()}>
                  Предпросмотр
                </Button>
              }
            />
          </div>
        </div>
      </div>
      <Modal
        opened={optionsModal}
        onClose={() => optionsModal_h.close()}
        title="Добавление опций"  
        centered
      >
        <div className="grid grid-cols-2 gap-4 items-end">
          <TextInput
            label='Опция'
            variant='filled'
            value={option?.name ?? ''}
            onChange={e => setOption({...option, name: e?.currentTarget?.value})}
            
          />
          <Button
            variant='outline'
            onClick={addOption}
            disabled={option?.creatable}  
          >
            Добавить опцию
          </Button>
        </div>

        {option?.creatable && ( 
          <>
            Опция: {option?.name}
            <MultiSelect
              data={[]}
              label='Добавление варианта'
              variant='filled'
              // onChange={e => setVariant(e?.currentTarget?.value)}
              onCreate={(query) => {
                setVariants((current) => [...current, query]);
                return query;
              }}
              creatable
              searchable
              clearable
              getCreateLabel={(query) => `+ добавить ${query}`}
              onChange={e => setVariants(e)}
            />
          </>
        )}

        <div className="flex justify-center mt-4">
          <Button onClick={saveoption}>
            Сохранить
          </Button>
        </div>

      </Modal>
      <Modal
        fullScreen
        opened={preview}
        onClose={() => preview_h.close()}
        centered
        title="Предпросмотр"
      >
        <ProductPage
          preview={{
            ...product,
            category: category?.main,
            sub_category: category?.sub,
            pics,
            content
          }}
        />
      </Modal>
    </>
  )
}
