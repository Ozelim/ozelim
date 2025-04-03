import React from 'react'
import { ActionIcon, Button, LoadingOverlay, Modal, Pagination, Rating, Tabs, Textarea, clsx } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import dayjs from 'dayjs'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { FaRegHeart } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { pb } from 'shared/api'
import { formatNumber, getImageUrl } from 'shared/lib'

import { useCartStore } from '../cart/cartStore'
import { useAuth } from 'shared/hooks'
import { showNotification } from '@mantine/notifications'

import 'react-quill/dist/quill.snow.css';
import { Product } from '../product'

async function getProductById (id) {
  return await pb.collection('products').getOne(id, {
    expand: 'agent, market_id'
  })
}

async function getReviewsByProductId (id, page = 1) {
  return await pb.collection('reviews').getList(page, 20, {
    filter: `product_id = '${id}' && status = 'posted'`,
    expand: 'user',
    sort: '-created'
  })
}

async function getReviewsByUser (id, userId) {
  return await pb.collection('reviews').getFullList({
    filter: `product_id = '${id}' && status = 'created' && (user = '${userId}' || customer = '${userId}')`,
    expand: 'user',
    sort: '-created'
  })
}

async function getProductsFromThisShop (id) {
  return await pb.collection('products').getList(1, 10, {
    filter: `market_id = '${id}'`,
    expand: 'market_id'
  })
}

export const ProductPage = ({preview}) => {

  const {user} = useAuth()

  const {id} = useParams()

  const [product, setProduct] = React.useState({})

  const [productsFromThisShop, setProductsFromThisShop] = React.useState([])

  const {addToCart, cartItems} = useCartStore()

  const addedToCart = cartItems?.find((q) => q?.id === product?.id)

  const [waitingReviews, setWaitingReviews] = React.useState([])

  const [reviews, setReviews] = React.useState([])
  const [page, setPage] = React.useState(1)

  async function handleProductData () {
    await getProductById(id)
    .then(res => {
      setProduct(res)
    })
  }

  async function handleReviewsData (page = 1) {
    await getReviewsByProductId(id, page)
    .then(res => { 
      setReviews(res)
      setPage(res?.page)
    })
    .catch(err => { 
      console.log(err?.response, 'err');
    })
  }

  async function handleUserReviews () {
    await getReviewsByUser(id, user?.id)
    .then(res => { 
      setWaitingReviews(res)
    })
    .catch(err => { 
      console.log(err?.response, 'err');
    })
  }

  async function handleProductsFromThisShop () {
    await getProductsFromThisShop(product?.market_id)
    .then(res => {
      setProductsFromThisShop(res)
    })
  }

  React.useEffect(() => {
    if (preview) {
      setProduct(preview)
    } else {
      handleProductData()
      handleReviewsData(1)
      handleUserReviews()
      handleProductsFromThisShop()
    }
  }, [])

  const [currentPic, setCurrentPic] = React.useState(product?.pics?.[0])

  React.useEffect(() => {
    setCurrentPic(product?.pics?.[0])
  }, [preview, product])

  const [picsModal, picsModal_h] = useDisclosure(false)

  function viewPic (index) {
    const newPic = product?.pics?.filter((_, i) => i == index)?.[0]
    setCurrentPic(newPic)
  }

  const [loading, loading_h] = useDisclosure(false)

  const [selectedOptions, setSelectedOptions] = React.useState({})
  const [amount, setAmount] = React.useState(1) 

  const [review, setReview] = React.useState({
    comment: '',
    rating: 0
  })

  function calculateRating () {
    const sum = reviews?.items?.reduce((a, b) => a + b?.rating, 0)
    return sum / reviews?.items?.length
  }

  async function addReview () {
    loading_h.open()

    if (waitingReviews?.length >= 1) {
      showNotification({
        title: 'Отзыв',
        message: 'Вы можете оставить только один отзыв',
        color: 'red'
      })
      setReview({ comment: '', rating: 1 })
      loading_h.close()
      return 
    }

    await pb.collection('reviews').create({
      ...review,
      product_id: product?.id,
      market_id: product?.market_id,
      ...(user?.collectionName === 'agents' ? {user: user?.id} : {customer: user?.id}),
      status: 'created'
    })
    .then(async () => {

      const revs = await pb.collection('reviews').getFullList({
        fields: 'rating',
      })

      const sum = revs?.reduce((a, b) => a + b?.rating, 0)
      const overallRating = sum / revs?.length
      
      await pb.collection('products').update(product?.id, {
        rating: overallRating,
        reviews_count: revs?.length
      })
      setReview({
        comment: '',
        rating: 1
      })
      handleReviewsData()
      handleUserReviews()
      showNotification({
        title: 'Отзыв',
        message: 'Отзыв будет добавлен после проверки',
        color: 'green'
      })
    })
    .finally(() => {
      loading_h.close() 
    })
  }
  

  function increment () {
    if (amount == product?.amount) return
    setAmount(amount + 1)
  }

  function decrement () { 
    if (amount === 1) return
    setAmount(amount - 1)
  }

  function selectOption (option, variant) {
    if (selectedOptions[option] === variant) {
      setSelectedOptions({
        ...selectedOptions,
        [option]: null
      })
      return
    }
    setSelectedOptions({
      ...selectedOptions,
      [option]: variant
    })
  }

  async function addToFavorites () {

    if (user?.favorites?.includes(product?.id)) {
      await pb.collection('agents').update(user?.id, {
        favorites: user?.favorites?.filter((q) => q !== product?.id)
      })
      .then(() => {
        showNotification({
          title: 'Избранное',
          message: 'Товар удален из избранного',
          color: 'green'
        })
      })
      .catch(() => {
        showNotification({
          title: 'Избранное',
          message: 'Не удалось удалить товар из избранного',
          color: 'red'
        })
      })
      return
    }

    await pb.collection('agents').update(user?.id, {
      favorites: [...user?.favorites ?? [], product?.id]
    })
    .then(() => {
      showNotification({
        title: 'Избранное',
        message: 'Товар добавлен в избранное',
        color: 'green'
      })
    })
    .catch(() => {
      showNotification({
        title: 'Избранное',
        message: 'Не удалось добавить товар в избранное',
        color: 'red'
      })
    })
  }

  return (
    <>
      <div className='container-market market'>
        <p className='text-xl my-4'>Детали товара</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className='grid grid-cols-1 md:grid-cols-[15%_auto] gap-4 overflow-hidden md:max-h-[60vh]'>
            <div className="flex md:flex-col gap-4 w-full overflow-x-auto sm:overflow-y-auto bg-white p-2 rounded-primary border h-fit shadow-equal">
              {product?.pics?.map((q, i) => {
                if (q instanceof File) {
                  return (
                    <img 
                      src={URL.createObjectURL(q)}
                      alt="" 
                      className={clsx('w-20 md:w-full aspect-square object-cover cursor-pointer rounded-primary', {
                        'border-4 p-0.5': currentPic === q
                      })}
                      key={i}
                      onClick={() => viewPic(i)}
                    />
                  ) 
                } else {
                  return (
                    <img 
                      src={getImageUrl(product, q)}
                      alt="" 
                      className={clsx('w-20 md:w-full aspect-square object-cover cursor-pointer rounded-primary', {
                        'border-4 p-0.5': currentPic === q
                      })}
                      key={i}
                      onClick={() => viewPic(i)}
                    />
                  )
                }
              })}
            </div>

            {(currentPic instanceof File || currentPic instanceof Blob) 
              ? <>
                <img 
                  src={URL.createObjectURL(currentPic)} 
                  alt="" 
                  className='aspect-square object-cover cursor-pointer rounded-primary md:max-h-[60vh] w-full'
                  onClick={() => picsModal_h.open()}
                /> 
              </>
              :
                <img 
                  src={getImageUrl(product, currentPic)}
                  alt="" 
                  className='aspect-square object-cover cursor-pointer rounded-primary md:max-h-[60vh] w-full'
                  onClick={() => picsModal_h.open()}
                />
            }

          </div>
          <div className='bg-white p-3 rounded-primary border flex flex-col shadow-equal'>
            <div className="flex-1">
              <h1 className='text-2xl sm:text-3xl font-bold'>
                {product?.name ?? 'Название '}
              </h1>

              <div className='flex flex-col sm:flex-row sm:justify-between gap-4 items-start sm:items-center'>
                <p className='mt-4 text-2xl sm:text-3xl'>
                  {formatNumber(product?.price)} ₸
                </p>

                <Rating className='mt-4' size='lg' value={calculateRating()} readOnly fractions={3} />
              </div>

              <div className='mt-4'>
                <p className='text-base sm:text-xl tracking-wide'>
                  {product?.description}
                </p>

                <div className='mt-4'>
                  <p className='text-base sm:text-lg'>
                    Количество: {formatNumber(product?.amount) ?? 1} шт.
                  </p>
                </div>
                <div className='mt-4'>
                  {product?.options?.map((q) => {
                    return ( 
                      <div key={q?.id} className='mt-4'>
                        {q?.option}:
                        <div className="flex flex-wrap gap-4 mt-2">
                          {q?.variants?.map((e, i) => {
                            return (
                              <Button 
                                variant={selectedOptions[q?.option] === e ? 'filled' : 'outline'}
                                color={selectedOptions[q?.option] === e ? 'pink.6' : 'gray'}
                                size='sm'
                                className={'!border-slate-300'}
                                onClick={() => selectOption(q?.option, e)}
                                key={i}
                              >
                                {e}
                              </Button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                  <div className='flex gap-4'>
                    <p>Город:</p>
                    <p>{product?.city}</p>
                  </div>
                  {product?.takeout && (
                    <div className='flex gap-4'>
                      <p>Самовывоз:</p>
                      <p>Да</p>
                    </div>
                  )}
                  <div className='flex gap-4'>
                    <p>Доставка по городу:</p>
                    <p>{product?.city_delivery ? 'Да' : 'Нет'}</p>
                  </div>

                  <div className='flex gap-4'>
                    <p>Доставка по всему Казахстану:</p>
                    <p>{product?.everywhere ? 'Да' : 'Нет'}</p>
                  </div>
                  
                  {(!product?.everywhere && product?.between_cities) && (
                    <div className='flex flex-col sm:flex-row gap-4'>
                      <p className='whitespace-nowrap'>Доставка в другие города:</p>
                      <div className='flex flex-wrap gap-2'>
                        {product?.between_cities && product?.between_cities?.map((q, i) => {
                          return (
                            <p key={i} className='px-2 py-1 border rounded-full'>{q}</p>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
            </div>
            <div className='mt-4 flex flex-col sm:flex-row gap-4 border-y py-4'>
              <div className='flex gap-3 items-center'>
                <ActionIcon
                  onClick={decrement}
                  className='text-xl !border !border-slate-200' 
                  disabled={product?.count === 1}
                  size='md'
                >
                  <AiOutlineMinus color='black' size={15}/>
                </ActionIcon>
                <p className='border px-4 py-1'>
                  {amount}
                </p>
                <ActionIcon 
                  onClick={increment}
                  className='text-xl !border !border-slate-200 '
                  size='md'
                >
                  <AiOutlinePlus color='black' size={15}/>
                </ActionIcon>
              </div>
              {addedToCart ? (
                <Button 
                  size='lg'
                  component={Link}
                  to={'/duken/cart'}
                  className='w-full sm:w-auto'
                >
                  Перейти в корзину
                </Button>
              ) : (
                <Button 
                  size='lg'
                  onClick={() => addToCart({
                    ...product, 
                    count: amount, 
                    selectedOptions,
                  })}
                  className='w-full sm:w-auto'
                >
                  Добавить в корзину
                </Button>
              )}

              <ActionIcon 
                className={clsx('!border !border-slate-200 !p-3 !h-12 !w-12 !rounded-full mx-auto md:mx-0', {
                  '!bg-red-600': user?.favorites?.includes(product?.id)
                })}
                onClick={addToFavorites}
              >
                <FaRegHeart size={'100%'} color={user?.favorites?.includes(product?.id) ? 'white' : 'black'}  />
              </ActionIcon>

            </div>
          </div>
        </div>

        <Tabs
          className='mt-8'
          defaultValue='description'
        >
          <Tabs.List>
            <Tabs.Tab value='description'>Описание</Tabs.Tab>
            <Tabs.Tab 
              value='reviews'
            >
              Отзывы ({reviews?.items?.length})
            </Tabs.Tab>
          </Tabs.List>
          
          <Tabs.Panel value='description' p={16}>
            <div dangerouslySetInnerHTML={{__html: product?.content}} className='reset max-w-[700px] mx-auto bg-white p-3 rounded-primary border overflow-hidden break-words shadow-equal' />
          </Tabs.Panel>

          <Tabs.Panel 
            value='reviews'
            className='relative'
          >
            <LoadingOverlay
              visible={loading}
              opacity={0.7}
              color='gray'
              zIndex={100}
            />
            {!preview && (
              <div className='max-w-[860px] mx-auto mt-8'>
                <p className='text-2xl '>
                  Отзывы
                </p>
                <div className='mt-4'>
                  <div className='gap-4 items-center'>
                    <div className='bg-white p-3 rounded-primary border shadow-equal'>
                      <Textarea
                        label='Комментарий'
                        value={review.comment}
                        onChange={(e) => setReview({...review, comment: e.currentTarget.value})}
                        variant='filled'
                      />
                    </div>
                    <div className='flex flex-col sm:flex-row justify-between mt-4 gap-4'>
                      <div className='bg-white p-3 border rounded-primary shadow-equal'>
                        <p className='text-sm'>Оценка</p>
                        <Rating
                          size='md'
                          value={review.rating}
                          onChange={(e) => setReview({...review, rating: e})}
                        />
                      </div>
                      <Button
                        onClick={addReview}
                        className='w-full sm:w-auto'
                      >
                        Оставить отзыв
                      </Button>
                    </div>
                  </div>
                  <div className='flex flex-col gap-6 mt-4'> 
                    {waitingReviews?.map((q, i) => {
                      return (
                        <div 
                          key={i}
                          className='flex flex-col sm:flex-row gap-4 border-t-2 first:border-none pt-6'
                        >
                          {q?.expand?.user?.avatar && (
                            <img 
                              alt="avatar" 
                              src={getImageUrl(q?.expand?.user, q?.expand?.user?.avatar)}
                              className='w-20 h-20 aspect-square object-cover rounded-full'
                            />
                          )}
                          {!q?.expand?.user?.avatar && (
                            <div 
                              className='w-20 h-20 aspect-square object-cover rounded-full bg-slate-300'
                            />
                          )}
                          <div>
                            <p>{q?.expand?.user?.fio}</p>
                            <div className='mt-1 flex flex-wrap gap-4'>
                              <Rating size='sm' readOnly value={q?.rating} />
                              <p>{dayjs(q?.created).format('DD MMMM YYYY')}</p>
                            </div>
                            <p className='mt-2'>
                              {q?.comment}
                            </p>

                          </div>
                        </div>
                      )
                    })}

                    {reviews?.items?.map((q, i) => {
                      return (
                        <div 
                          key={i}
                          className='flex flex-col sm:flex-row gap-4 border-t-2 first:border-none pt-6 relative'
                        >
                          {q?.expand?.user?.avatar && (
                            <img 
                              alt="avatar" 
                              src={getImageUrl(q?.expand?.user, q?.expand?.user?.avatar)}
                              className='w-20 h-20 aspect-square object-cover rounded-full'
                            />
                          )}
                          {!q?.expand?.user?.avatar && (
                            <div 
                              className='w-20 h-20 aspect-square object-cover rounded-full bg-slate-300'
                            />
                          )}
                          <div className='flex-1'>
                            <p>{q?.expand?.user?.fio}</p>
                            <div className='mt-1 flex flex-wrap gap-4'>
                              <Rating size='sm' readOnly value={q?.rating} />
                              <p>{dayjs(q?.created).format('DD MMMM YYYY')}</p>
                            </div>
                            <p className='mt-2'>
                              {q?.comment}
                            </p>
                            {q?.reply && (
                              <div className='mt-4 ml-4 pl-4 border-l-2'>
                                <p className='text-sm text-gray-500'>Ответ:</p>
                                <p className='mt-1'>{q?.reply}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                    <div className='flex justify-center my-4'> 
                      <Pagination
                        value={page}
                        onChange={(e) => handleReviewsData(e)}
                        total={reviews?.totalPages ?? 1}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Tabs.Panel>
        </Tabs>

        {!preview && (
          <div className='mt-8'>
            <p className='text-base sm:text-lg md:text-xl'>Другие товары этого магазина</p>
            <div className='container-market'>
              <div className='grid sm:grid-cols-2 min-[1024px]:grid-cols-3 min-[1200px]:grid-cols-4 min-[1450px]:grid-cols-5 gap-x-2 md:gap-x-4 gap-y-4 md:gap-y-8 !mt-4 md:!mt-8'>
              {productsFromThisShop?.items?.map((q) => {
                return (
                  <Product key={q?.id} product={q} />
                )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Modal
        opened={picsModal}
        onClose={() => picsModal_h.close()}
        centered={true}
        fullScreen
      >
        <div className='grid grid-cols-1 md:grid-cols-[10%_auto] gap-4'>
          <div className='flex flex-row md:flex-col gap-4 mt-4 overflow-x-auto md:overflow-x-hidden'>
            {product?.pics?.map((q, i) => {
              if (q instanceof File) {
                return (
                  <img 
                    src={URL.createObjectURL(q)}
                    alt="" 
                    className={clsx('aspect-square object-cover w-16 md:w-24 flex-shrink-0', {
                      'border-4 p-0.5': currentPic === q
                    })}
                    key={i}
                    onClick={() => viewPic(i)}
                  />
                ) 
              } else {
                return (
                  <img 
                    src={getImageUrl(product, q)}
                    alt="" 
                    className={clsx('aspect-square object-cover w-16 md:w-24 flex-shrink-0', {
                      'border-4 p-0.5': currentPic === q
                    })}
                    key={i}
                    onClick={() => viewPic(i)}
                  />
                )
              }
            })}
          </div>
          <div className='max-w-full h-auto mt-4 md:mt-0'>
            {currentPic && (
              currentPic instanceof File 
                ? 
                  <img 
                    src={URL.createObjectURL(currentPic)} 
                    alt="" 
                    className='aspect-auto object-contain mx-auto max-w-full md:max-h-[90vh]'
                    onClick={() => picsModal_h.open()}
                  /> 
                :
                  <img 
                    src={getImageUrl(product, currentPic)}
                    alt="" 
                    className='aspect-auto object-contain mx-auto max-w-full md:max-h-[90vh]'
                    onClick={() => picsModal_h.open()}
                  />
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}