import React from 'react'
import { pb } from 'shared/api'
import { Product } from 'pages/market/product'
import { ActionIcon, LoadingOverlay, Modal, Tabs, Button, Radio, NumberInput } from '@mantine/core'

import { useDisclosure } from '@mantine/hooks'
import { ProductPage } from 'pages'
import { openConfirmModal } from '@mantine/modals'
import { useShopStore } from '../shop/shopStore'

import { FaEye } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { FaDeleteLeft } from 'react-icons/fa6'
import { useSearchParams } from 'react-router-dom'
import { EditProduct } from './edit-product'
import { showNotification } from '@mantine/notifications'

export const Products = () => {
  
  const [params, setParams] = useSearchParams()

  const { shop } = useShopStore()

  const [product, setProduct] = React.useState({})

  const [loading] = useDisclosure(false)

  const [discountModal, discountModal_h] = useDisclosure(false)
  const [discountLoading, discountLoading_h] = useDisclosure(false)
  const [discount, setDiscount] = React.useState({
    percent: 0,
    value: 0,
    product: null,
  })

  function handleDiscountPercent(value) {
    if (value < 0) {
      setDiscount({ ...discount, percent: 0 })
    } else if (value > 100) {
      setDiscount({ ...discount, percent: 100 })
    } else {
      setDiscount({ ...discount, percent: value })
    }
  }

  const [pics, setPics] = React.useState([])

  const allProducts = shop?.expand?.products

  const onModeration = allProducts?.filter((q) => {
    return q?.status === 'moderation'
  })

  const posted = allProducts?.filter((q) => {
    return q?.status === 'posted'
  })

  const waiting = allProducts?.filter((q) => {
    return q?.status === 'waiting'
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
    setPics([...(p?.pics ?? [])])
    params.set('edit', p?.id)
    setParams(params)
  }

  React.useEffect(() => {
    if (product?.id !== params.get('edit')) {
      setProduct({})
      params.delete('edit')
      setParams(params)
    }
  }, [])

  async function handleAddDiscount() {
    discountLoading_h.open()
    await pb
      .collection('products')
      .update(discount?.product?.id, {
        discount: {
          value: discount?.value,
          start: null,
          end: null,
          status: 'waiting',
          percent: discount?.percent,
        },
      })
      .then(() => {
        showNotification({
          title: 'Скидка дня',
          message: 'Скидка добавлена успешно',
          color: 'green',
        })
        discountModal_h.close()
      })
      .finally(() => {
        discountLoading_h.close()
      })
  }

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
        <Tabs defaultValue="moderation" variant="default">
          <Tabs.List grow>
            <Tabs.Tab value="moderation">На модерации</Tabs.Tab>
            <Tabs.Tab value="waiting">Ожидающие</Tabs.Tab>
            <Tabs.Tab value="posted">Опубликованные</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="moderation" pt={20}>
            {onModeration?.length > 0 && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-x-4 gap-y-6">
                  {onModeration?.map((q, i) => {
                    return (
                      <div key={i}>
                        <Product product={q} preview />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </Tabs.Panel>
          <Tabs.Panel value="waiting" pt={20}>
            {waiting?.length > 0 && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-x-4 gap-y-6">
                  {waiting?.map((q, i) => {
                    return (
                      <div key={i}>
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
                            </div>
                          }
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </Tabs.Panel>
          <Tabs.Panel value="posted" pt={20}>
            {posted?.length > 0 && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-x-4 gap-y-6">
                  {posted?.map((q, i) => {
                    return (
                      <div key={i}>
                        <Product
                          product={q}
                          preview
                          buttons={
                            <div className="flex flex-col gap-2">
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
                              <Button
                                compact
                                onClick={() => {
                                  setDiscount({
                                    ...discount,
                                    product: q,
                                  })
                                  discountModal_h.open()
                                }}
                              >
                                Добавить в скидку дня
                              </Button>
                            </div>
                          }
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </Tabs.Panel>
        </Tabs>
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

      <Modal
        opened={discountModal}
        onClose={() => discountModal_h.close()}
        centered
        title="Скидка дня"
        aria-hidden={discountModal}
      >
        <div className="flex flex-col gap-2">
          <p className="text-lg">{discount?.product?.name}</p>
          <NumberInput
            value={discount?.percent}
            onChange={(value) => {
              handleDiscountPercent(value)
            }}
            label="Скидка в процентах"
            min={0}
            max={100}
            step={1}
            className="w-1/2 mx-auto"
          />
          <Radio.Group
            value={discount?.value}
            onChange={(value) => {
              setDiscount({ ...discount, value })
            }}
            className="flex gap-2 justify-center"
            label="Срок действия"
            mt={20}
          >
            <Radio value="12" label="12 часов" />
            <Radio value="24" label="24 часа" />
            <Radio value="48" label="48 часов" />
          </Radio.Group>
          <div className="flex justify-center gap-4 mt-4">
            <Button loading={discountLoading} variant="outline">
              Отмена
            </Button>
            <Button
              loading={discountLoading}
              onClick={handleAddDiscount}
              disabled={discount?.percent === 0 || discount?.value === 0}
            >
              Добавить
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
