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
  Select,
  TextInput,
  Textarea,
} from '@mantine/core'

import { useDisclosure } from '@mantine/hooks'
import { ProductPage } from 'pages'
import { cities, getImageUrl } from 'shared/lib'
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
          <p className="text-lg">Черновики</p>
          <div className="grid grid-cols-5 gap-x-4 gap-y-6">
            {drafted?.map((q, i) => {
              return (
                <div className="mx-auto" key={i}>
                  <Product
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
                        <Button compact color="green" onClick={() => sendToModeration(q)}>
                          На модерацию
                        </Button>
                      </div>
                    }
                  />
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <p className="text-lg">На модерации</p>
          <div className="grid grid-cols-5 gap-x-4 gap-y-6">
            {onModeration?.map((q, i) => {
              return (
                <div className="mx-auto" key={i}>
                  <Product product={q} preview />
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <p className="text-lg">Ожидающие</p>
          <div className="grid grid-cols-5 gap-x-4 gap-y-6">
            {waiting?.map((q, i) => {
              return (
                <div className="mx-auto" key={i}>
                  <Product
                    product={q}
                    preview
                    buttons={
                      <>
                        <p className="mt-2 shrink">Ожидает подтверждения</p>
                        <Button
                          fullWidth
                          className="mt-3 flex-shrink"
                          onClick={() => handlePreviewModal({ ...q})}
                        >
                          Предпросмотр
                        </Button>
                      </>
                    }
                  />
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 space-y-2">
          <p className="text-lg">Опубликованные</p>
          <div className="grid grid-cols-5 gap-x-4 gap-y-6">
            {posted?.map((q, i) => {
              return (
                <div className="mx-auto" key={i}>
                  <Product
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
                  />
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
