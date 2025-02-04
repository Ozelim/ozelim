import React from 'react'
import { pb } from 'shared/api'
import { Product } from 'pages/market/product'
import {
  ActionIcon,
  Button,
  CloseButton,
  FileButton,
  LoadingOverlay,
  Modal,
  Rating,
  Select,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core'

import { useDisclosure } from '@mantine/hooks'
import { ProductPage } from 'pages'
import { cities, formatNumber, getImageUrl } from 'shared/lib'
import { openConfirmModal } from '@mantine/modals'
import { useCategoriesStore } from 'pages/market/categoriesStore'
import { useShopStore } from '../shop/shopStore'

import { FaEye } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { FaDeleteLeft } from 'react-icons/fa6'
import { useAuth } from 'shared/hooks'
import { showNotification } from '@mantine/notifications'
import { useSearchParams } from 'react-router-dom'
import { EditProduct } from './edit-product'

export const Products = () => {
  
  const [params, setParams] = useSearchParams()

  const { user } = useAuth()
  const { shop, getShopById } = useShopStore()

  const [product, setProduct] = React.useState({})

  const [loading, loading_h] = useDisclosure(false)

  const [pics, setPics] = React.useState([])

  const allProducts = shop?.expand?.products

  const onModeration = allProducts?.filter((q) => {
    return q?.status === 'moderation'
  })

  const posted = allProducts?.filter((q) => {
    return q?.status === 'posted'
  })

  const rejected = allProducts?.filter((q) => {
    return q?.status === 'rejected'
  })

  const waiting = allProducts?.filter((q) => {
    return q?.status === 'waiting'
  })

  const drafted = allProducts?.filter((q) => {
    return q?.status === 'created'
  })

  const [previewData, setPreviewData] = React.useState({})

  const [preview, preview_h] = useDisclosure(false)

  function handleDeleteModal(p) {
    openConfirmModal({
      centered: true,
      title: 'Удаление товара',
      labels: { confirm: 'Удалить', cancel: 'Отмена' },
      children: 'Вы действительно хотите удалить товар?',
      onConfirm: async () => {
        await pb.collection('products').delete(p?.id)
      },
      'aria-hidden': true,
    })
  }

  function handlePreviewModal(p) {
    setPreviewData(p)
    preview_h.open()
  }

  function handleEdit(p) {
    setProduct(p)
    setPics([...p?.pics])
    params.set('edit', p?.id)
    setParams(params)
  }

  async function sendToModeration(p) {
    openConfirmModal({
      centered: true,
      title: 'Отправить на модерацию',
      children: 'Вы дейтсвительно хотите отправить товар на модерацию?',
      labels: { confirm: 'Отправить на модерацию', cancel: 'Назад' },
      onConfirm: async () => {
        loading_h.open()
        await pb
          .collection('products')
          .update(p?.id, {
            status: 'moderation',
          })
          .then(async () => {
            showNotification({
              title: 'Товар',
              message: 'Товар успешно отправлен на модерацию!',
              color: 'green',
            })
            getShopById(user?.id)
          })
          .catch((err) => {
            showNotification({
              title: 'Товар',
              message: 'Не удалось отправить товар на модерацию',
              color: 'red',
            })
          })
          .finally(() => {
            loading_h.close()
          })
      },
    })
  }

  React.useEffect(() => {
    if (product?.id !== params.get('edit')) {
      setProduct({})
      params.delete('edit')
      setParams(params)
    }
  }, [])

  if (params.get('edit') === product?.id)
    return (
      <>
        <EditProduct product={{ ...product, pics }} handlePreviewModal={handlePreviewModal} />
        <Modal
          fullScreen
          opened={preview}
          onClose={() => preview_h.close()}
          centered
          title="Предпросмотр"
        >
          <ProductPage preview={previewData} />
        </Modal>
      </>
    )

  return (
    <>
      <LoadingOverlay visible={loading} />
      <div className="w-full h-full"> 
        <div className="space-y-2">
          <p className="text-lg">Все товары</p>
          <div className="flex flex-col gap-x-4 gap-y-6">
            {posted?.map((q, i) => {
              return (
                <div className="flex gap-4 border p-3" key={i}>
                  <div className='flex gap-3'>
                    <img src={getImageUrl(q, q?.pics?.[0])} alt="" className="w-40 h-40 object-cover" />
                    <div className='max-w-sm space-y-2 my-auto'>
                      <Text>{q?.name}</Text>
                      <Text lineClamp={2} weight={400}>{q?.description}</Text>
                      <p>{formatNumber(q?.price)} ₸</p>
                      <div className='flex gap-3'>
                        <Rating readOnly value={q?.rating} fractions={3} /> ({q?.reviews_count})
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-3 max-w-sm w-full'>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <div className='ml-auto flex flex-col gap-3'>
                    <Button compact>Добавить в скидку</Button>
                    <Button compact>Редактировать</Button>
                  </div>
                  {/* <Product
                    product={q}
                    preview
                    buttons={
                      <div className="flex justify-between gap-2 mt-2">
                        <ActionIcon color="green" onClick={() => handlePreviewModal(q)}>
                          <FaEye size={40} />
                        </ActionIcon>
                        <ActionIcon color="blue" onClick={() => handleEdit(q)}>
                          <FaEdit size={40} />
                        </ActionIcon>
                        <ActionIcon color="pink" onClick={() => handleDeleteModal(q)}>
                          <FaDeleteLeft size={40} />
                        </ActionIcon>
                      </div>
                    }
                  /> */}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Modal
        fullScreen
        opened={preview}
        onClose={() => preview_h.close()}
        centered
        title="Предпросмотр"
      >
        <ProductPage preview={previewData} />
      </Modal>
    </>
  )
}
