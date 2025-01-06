import { ActionIcon, Button, Modal, Rating, SegmentedControl, Tabs, Textarea, clsx } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import dayjs from 'dayjs'
import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { FaRegHeart } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { pb } from 'shared/api'
import { formatNumber, getImageUrl } from 'shared/lib'

import 'react-quill/dist/quill.snow.css';
import { useCartStore } from '../cart/cartStore'

async function getProductById (id) {
  return await pb.collection('products').getOne(id, {
    expand: 'agent, market_id'
  })
}

export const ProductPage = ({preview}) => {

  const {id} = useParams()

  const [product, setProduct] = React.useState({})

  const { addToCart, cartItems } = useCartStore()

  console.log(cartItems, 'items');

  React.useEffect(() => {
    if (preview) {
      setProduct(preview)
    } else {
      getProductById(id)
      .then(res => {
        setProduct(res)
      })
    }
  }, [])

  const [currentPic, setCurrentPic] = React.useState(product?.pics?.[0])

  React.useEffect(() => {
    setCurrentPic(product?.pics?.[0])
  }, [preview, product])

  const [picsModal, picsModal_h] = useDisclosure(false)

  function viewPic (index) {
    const newPic = product?.pics?.filter((_, i) => i == index)?.[0]
    console.log(newPic, 'newPic');
    setCurrentPic(newPic)
  }

  const [selectedOptions, setSelectedOptions] = React.useState({})
  const [amount, setAmount] = React.useState(1) 

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

  return (
    <>
      <div className='container-market market'>
        <p className='text-xl my-4'>Детали товара</p>
        <div className="grid grid-cols-2 gap-4">
          <div className='grid grid-cols-[15%_auto] gap-4 overflow-hidden h-[558px]'>
            <div className="flex flex-col gap-4 w-full overflow-y-auto">

              {product?.pics?.map((q, i) => {
                if (q instanceof File) {
                  return (
                    <img 
                      src={URL.createObjectURL(q)}
                      alt="" 
                      className={clsx('aspect-square object-cover cursor-pointer', {
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
                      className={clsx('aspect-square object-cover cursor-pointer', {
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
                  className='aspect-square object-cover cursor-pointer'
                  onClick={() => picsModal_h.open()}
                /> 
              </>
              :
                <img 
                  src={getImageUrl(product, currentPic)}
                  alt="" 
                  className='aspect-square object-cover cursor-pointer'
                  onClick={() => picsModal_h.open()}
                />
            }

          </div>
          <div>
            <h1 className='text-3xl font-bold'>
              {product?.name ?? 'Название '}
            </h1>

            <div className='flex justify-between gap-4 items-center'>
              <p className='mt-4 text-3xl'>
                {formatNumber(product?.price)} ₸
              </p>

              <Rating className='mt-4' size='lg' value={1}/>
            </div>


            <div className='mt-4'>
              <p className='text-xl tracking-wide'>
                {product?.description}
              </p>

              <div className='mt-4'>
                <p className='text-lg'>
                  Количество: {formatNumber(product?.amount) ?? 1} шт.
                </p>
              </div>
              <div className='mt-4'>
                {product?.options?.map((q) => {
                  return ( 
                    <div key={q?.id} className='mt-4'>
                      {q?.option}:
                      <div className="flex gap-4 flex-wrap mt-2">
                        {q?.variants?.map((e, i) => {
                          return (
                            <Button 
                              variant={selectedOptions[q?.option] === e ? 'filled' : 'outline'}
                              color={selectedOptions[q?.option] === e ? 'pink.6' : 'gray'}
                              size='sm'
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
              
              <div className='mt-4 flex gap-4 border-y py-4'>

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

                <Button 
                  size='lg'
                  onClick={() => addToCart({
                    ...product, 
                    count: amount, 
                    selectedOptions,
                  })}
                >
                  Добавить в корзину
                </Button>

                <ActionIcon className='!border !border-slate-200 !p-3 !h-12 !w-12 !rounded-full'>
                  <FaRegHeart size={'100%'} color='black' />
                </ActionIcon>
              </div>
            </div>
          </div>
        </div>


        <Tabs
          className='mt-8'
          defaultValue='description'
        >
          <Tabs.List>
            <Tabs.Tab value='description'>Описание</Tabs.Tab>
            <Tabs.Tab value='reviews'>Отзывы</Tabs.Tab>
          </Tabs.List>
          
          <Tabs.Panel value='description' p={16}>
            <div dangerouslySetInnerHTML={{__html: product?.content}} className='reset max-w-[700px] mx-auto' />
          </Tabs.Panel>
          <Tabs.Panel value='reviews'>
            {!preview && (
              <div className='max-w-[860px] mx-auto mt-8'>
                <p className='text-2xl '>
                  Отзывы ({product?.reviews?.length ?? '123'})
                </p>
                <div className='mt-4'>
                  <div className='gap-4 items-center'>
                    <Textarea
                      label='Отзыв'
                    />
                    <div className='flex justify-end mt-4'>
                      <Button>
                        Оставить отзыв
                      </Button>
                    </div>
                  </div>
                  <div className='flex flex-col gap-6 mt-4'> 
                    {Array(5).fill(1).map((q, i) => {
                      return (
                        <div 
                          key={i}
                          className='flex gap-4 border-t-2 first:border-none pt-6'
                        >
                          <img 
                            alt="" 
                            src="https://people.com/thmb/NDasPbZOWfpi2vryTpDta_MJwIY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(602x285:604x287)/newjeans-111023-1-c7ed1acdd72e4f2eb527cc38144aa2d4.jpg" 
                            className='w-20 h-20 aspect-square object-cover'
                          />
                          <div>
                            <p>Lorem, ipsum.</p>
                            <div className='mt-1 flex gap-4'>
                              <Rating size='sm'/>
                              <p>{dayjs(new Date()).format('DD MMMM YYYY')}</p>
                            </div>

                            <p className='mt-2'>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit delectus eius tempora corrupti nostrum modi id. Qui consequuntur asperiores laudantium. Eligendi numquam at corrupti nemo repellat quis adipisci optio cum!
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nulla libero perferendis minus suscipit ipsam quo id saepe maxime recusandae, animi asperiores esse, dolore vero quam optio molestiae illo inventore!
                            </p>

                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </Tabs.Panel>
        </Tabs>

      </div>
      
      <Modal
        opened={picsModal}
        onClose={() => picsModal_h.close()}
        centered={true}
        fullScreen
      >
        <div className='grid grid-cols-[10%_auto]'>
          <div className='flex flex-col gap-4 mt-4'>
            {product?.pics?.map((q, i) => {
              if (q instanceof File) {
                return (
                  <img 
                    src={URL.createObjectURL(q)}
                    alt="" 
                    className={clsx('aspect-square object-cover w-24', {
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
                    className={clsx('aspect-square object-cover w-24', {
                      'border-4 p-0.5': currentPic === q
                    })}
                    key={i}
                    onClick={() => viewPic(i)}
                  />
                )
              }
            })}
          </div>
          <div className='max-w-full h-auto'>
            {currentPic && (
              currentPic instanceof File 
                ? 
                  <img 
                    src={URL.createObjectURL(currentPic)} 
                    alt="" 
                    className='aspect-square object-cover mx-auto max-w-full max-h-[90vh]'
                    onClick={() => picsModal_h.open()}
                  /> 
                :
                  <img 
                    src={getImageUrl(product, currentPic)}
                    alt="" 
                    className='aspect-square object-cover mx-auto max-w-full max-h-[90vh]'
                    onClick={() => picsModal_h.open()}
                  />
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}
