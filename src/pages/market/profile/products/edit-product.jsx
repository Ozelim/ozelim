import React from 'react'
import { Button, CloseButton, FileButton, Select, Textarea, TextInput } from '@mantine/core'
import { useCategoriesStore } from 'pages/market/categoriesStore'
import { Product } from 'pages/market/product'
import { cities, compress, formatNumber, getImageUrl } from 'shared/lib'
import ReactQuill from 'react-quill'
import { useSearchParams } from 'react-router-dom'
import { pb } from 'shared/api'
import { openConfirmModal } from '@mantine/modals'
import { useDisclosure } from '@mantine/hooks'
import { useShopStore } from '../shop/shopStore'
import { useAuth } from 'shared/hooks'
import { showNotification } from '@mantine/notifications'

export const EditProduct = ({product, handlePreviewModal}) => {

  const {shop, getShopById} = useShopStore()

  const {user} = useAuth()

  const [params, setParams] = useSearchParams()

  const { cats, categories } = useCategoriesStore()

  const [changedProduct, setChangedProduct] = React.useState({})

  const [loading, loading_h] = useDisclosure(false)

  const [category, setCategory] = React.useState({
    main: '',
    sub: '',
  })

  const [content, setContent] = React.useState('')

  const [pics, setPics] = React.useState([])
  const [deletedPics, setDeletedPics] = React.useState([])

  React.useEffect(() => {
    setPics(product?.pics)
    setContent(product?.content)
    setChangedProduct(product)
  }, [])
  
  async function deletePic (q) {

    if (q instanceof File || q instanceof Blob) {
      const newPics = pics?.filter(p => q !== p)
      setPics(newPics)
    }

    setDeletedPics([...deletedPics, q])

  }

  const subCats = categories
  ?.filter((q) => q?.label === product?.category)?.[0]
  ?.subs?.map((e) => {
    return {
      label: e?.label,
      value: e?.label,
    }
  })

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // Headers
      ["bold", "italic", "underline", "strike"], // Text styles
      [{ align: [] }], // Alignment buttons (left, center, right, justify)
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      ["blockquote", "code-block"], // Block styles
      ["link", "image"], // Media
      [{ color: [] }, { background: [] }], // Colors
      ["clean"], // Remove formatting
    ],
  };

  async function updateProduct() {

    const formData = new FormData()

    pics.forEach(q => {
      if (q instanceof File || q instanceof Blob) {
        return formData.append('pics+', q)
      } 
    })

    openConfirmModal({
      title: 'Изменение товара',
      centered: true,
      children: 'Сохранить изменение товара?',
      labels: {confirm: 'Сохранить', cancel: 'Назад'},
      onConfirm: async () => {
        loading_h.open()
        await pb.collection('products').update(product?.id, formData)
        .catch(() => {
          loading_h.close()
        })
        pb.collection('products').update(product?.id, {
          status: 'waiting',
          p_saved: changedProduct,
          ...changedProduct
        })
        .then(async () => {
          showNotification({
            title: 'Товар',
            message: 'Товар ожидает потдверждения!',
            color: 'green'
          })
          getShopById(user?.id)
        })
        .catch(err => {
          showNotification({
            title: 'Товар',
            message: 'Не удалось применить изменение',
            color: 'red'
          })
        })
        .finally(() => {
          loading_h.close()
        })
      },
      onCancel: () => {
        // edit_h.open()
        loading_h.close()
      },
      "aria-hidden": true
    })
  }

  function stopEditing () {
    params.delete('edit')
    setParams(params)
  }

  return (
    <div>
      <div className="flex gap-4 items-center">
        <p>Редактирование товара</p>
        <Button onClick={stopEditing}>
          Назад
        </Button>
      </div>
      <div className="grid grid-cols-[320px_700px_auto] gap-4 mt-4">
        <div className="max-w-xs w-full">
          <TextInput
            label="Название"
            value={changedProduct?.name ?? ''}
            onChange={(e) => setChangedProduct({ ...changedProduct, name: e?.currentTarget?.value })}
            variant="filled"
          />
          <Select
            data={cats ?? []}
            onChange={(e) => setCategory({ ...category, main: e })}
            label="Категория"
            value={product?.category ?? ''}
            variant="filled"
            disabled
          />
          <Select
            data={subCats ?? []}
            label="Под категория"
            onChange={(e) => setCategory({ ...category, sub: e })}
            value={product?.sub_category ?? ''}
            variant="filled"
            disabled
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
                if (q instanceof File || q instanceof Blob) {
                  return (
                    <div className="relative" key={i}>
                      <CloseButton
                        className="absolute top-5 -right-[75px]"
                        size={22}
                        bg="white"
                        onClick={() => deletePic(q)}
                      />
                      <img
                        src={URL.createObjectURL(q)}
                        alt=""
                        className="w-24 aspect-square object-cover"
                      />
                    </div>
                  )
                }
                return (
                  <div className="relative" key={i}>
                    <CloseButton
                      className="absolute top-5 -right-[75px]"
                      size={22}
                      bg="white"
                      onClick={() => deletePic(q)}
                    />
                    <img
                      src={getImageUrl(changedProduct, q)}
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
            value={changedProduct?.description ?? ''}
            onChange={(e) => setChangedProduct({ ...changedProduct, description: e?.currentTarget?.value })}
            variant="filled"
            className="mt-4"
          />
          <TextInput
            label="Цена"
            value={changedProduct?.price ?? ''}
            onChange={(e) => setChangedProduct({ ...changedProduct, price: e?.currentTarget?.value })}
            variant="filled"
            disabled
          />
          <Select
            label="Город"
            data={cities}
            value={changedProduct?.city ?? ''}
            onChange={(e) => setChangedProduct({ ...changedProduct, city: e })}
            variant="filled"
          />
          <div className="flex justify-center mt-4">
            <Button onClick={updateProduct}>Сохранить</Button>
          </div>
        </div>
        
        <div className="mx-auto h-full w-full">
          <ReactQuill
            value={content} 
            onChange={setContent} 
            theme="snow" 
            modules={modules} 
            className='h-full w-full pb-16'
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
              <Button 
                fullWidth 
                className="mt-3 flex-shrink" 
                onClick={() => handlePreviewModal({...changedProduct, pics})}
              >
                Предпросмотр
              </Button>
            }
          />
        </div>
      </div>
    </div>
  )
}
