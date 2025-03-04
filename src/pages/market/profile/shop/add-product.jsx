import {
  Button,
  CloseButton,
  Collapse,
  FileButton,
  FileInput,
  Modal,
  MultiSelect,
  Select,
  Slider,
  Switch,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core'
import React from 'react'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { useShopStore } from './shopStore'

import { cities, compress } from 'shared/lib'
import { randomId, useDisclosure, useMediaQuery } from '@mantine/hooks'
import { ProductPage } from 'pages'
import { Product } from 'pages/market/product'
import { useCategoriesStore } from 'pages/market/categoriesStore'

import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { FaPlus } from 'react-icons/fa'
import { set } from 'react-hook-form'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'

export const AddProduct = () => {

  const media = useMediaQuery('(min-width: 1366px)')

  const { user } = useAuth()
  const { shop } = useShopStore()
  const { categories } = useCategoriesStore()

  const [preview, preview_h] = useDisclosure(false)
  const [optionsModal, optionsModal_h] = useDisclosure(false)

  const [takeout, takeout_h] = useDisclosure(false)
  const [cityDelivery, cityDelivery_h] = useDisclosure(false)
  const [allDelivery, allDelivery_h] = useDisclosure(false)
  const [betweenCities, betweenCities_h] = useDisclosure(false)

  const [deliveryCities, setDeliveryCities] = React.useState('')
  const [takeoutAddress, setTakeoutAddress] = React.useState('')

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
        labels: {confirm: 'Ок', cancel: 'Отмена'},
        "aria-hidden": true
      })
      return
    }

    const formData = new FormData()

    console.log(product, 'produ');

    const createdProduct = await pb.collection('products').create({
      ...product,
      market_id: shop?.id,
      merchant: user?.id,
      status: 'moderation',
      category: category.main,
      sub_category: category.sub, 
      content,
      options,
      takeout: takeout ? takeoutAddress : '',
      city_delivery: cityDelivery,
      between_cities: deliveryCities,
      everywhere: allDelivery,
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
          showNotification({
            title: 'Товар создан',
            message: 'Товар успешно создан и отправлен на модерацию',
            color: 'green',
          })
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

  function handlePicsUpload (e) {
    if (!e) return
    setPics([...pics, e])
  }

  return (
    <>
      <div>
        <p>Создание товара:</p>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="max-w-xs w-full bg-white p-3 rounded-primary shadow-sm border">
            <TextInput
              label="Название"
              value={product?.name ?? ''}
              onChange={(e) => setProduct({ ...product, name: e?.currentTarget?.value })}
              variant="filled"
              required
            />
            <Select
              data={cats ?? []}
              onChange={(e) => setCategory({ ...category, main: e })}
              label="Категория"
              value={category?.main ?? ''}
              variant="filled"
              required
            />

            <Select
              data={subCats ?? []}
              label="Под категория"
              onChange={(e) => setCategory({ ...category, sub: e })}
              value={category?.sub ?? ''}
              variant="filled"
              required
            />
            <div>
              <div className="flex gap-4 items-end">
                <FileButton
                  onChange={handlePicsUpload}
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
                    <div className="relative" key={i}>
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
              required
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
                <div key={Math.random()} className='mt-4'>
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
              required
            />
            <TextInput
              label="Количество"
              value={product?.amount ?? ''}
              onChange={(e) => setProduct({ ...product, amount: e?.currentTarget?.value })}
              variant="filled"
              required
            />
            <Select
              label="Город"
              data={cities}
              value={product?.city ?? ''}
              onChange={(e) => setProduct({ ...product, city: e })}
              variant="filled"
              required
            />
            <Switch
              label='Самовывоз'
              className='mt-3'
              checked={takeout}
              onChange={e => takeout_h.toggle()}
            />

            <Collapse
              in={takeout}
            >
              <TextInput
                label='Адрес самовывоза'
                value={takeoutAddress}
                onChange={e => setTakeoutAddress(e?.currentTarget?.value)}
                variant='filled'
                className='mt-2'
                required
              />
            </Collapse>

            <Switch
              label='Доставка по городу'
              className='mt-3'
              checked={cityDelivery}
              onChange={e => cityDelivery_h.toggle()}
            />

            <Switch
              label='Доставка в другие города'
              className='mt-3'
              checked={betweenCities}
              onChange={e => betweenCities_h.toggle()}
            />
            <Collapse
              in={betweenCities}
            >
              <MultiSelect
                label='Города доставки'
                placeholder='Выберите города'
                value={deliveryCities}
                onChange={e => setDeliveryCities(e)}
                variant='filled'
                className='mt-2'
                required
                data={cities}
              />
            </Collapse>

            <Switch
              label='Доставка всему Казахстану'
              className='mt-3'
              checked={allDelivery}
              onChange={e => {
                allDelivery_h.toggle()
                betweenCities_h.close()
              }}
            />

            <div className="flex justify-center mt-4">
              <Button onClick={beforeCreateProduct}>Добавить товар</Button>
            </div>
          </div>

          <div className="max-w-[700px] mx-auto h-full w-full bg-white">
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
