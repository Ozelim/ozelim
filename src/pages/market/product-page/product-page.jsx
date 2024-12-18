import { Button, Modal, Rating, Textarea, clsx } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import dayjs from 'dayjs'
import React from 'react'
import { useParams } from 'react-router-dom'
import { pb } from 'shared/api'
import { formatNumber, getImageUrl } from 'shared/lib'

async function getProductById (id) {
  return await pb.collection('products').getOne(id, {
    expand: 'agent, market_id'
  })
}

export const ProductPage = ({preview}) => {

  const {id} = useParams()

  const [product, setProduct] = React.useState({})

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

  return (
    <>
      <div className='container-market market'>
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
              {/* {Array(11).fill(1).map((q, i) => {
                return (
                  <img 
                    src="https://people.com/thmb/NDasPbZOWfpi2vryTpDta_MJwIY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(602x285:604x287)/newjeans-111023-1-c7ed1acdd72e4f2eb527cc38144aa2d4.jpg" 
                    alt="" 
                    className='aspect-square object-cover'
                    key={i}
                  />
                )
              })} */}
            </div>

            {(currentPic instanceof File || currentPic instanceof Blob) 
              ? <>
                <img 
                  src={URL.createObjectURL(currentPic)} 
                  alt="" 
                  className='aspect-square object-cover'
                  onClick={() => picsModal_h.open()}
                /> 
              </>
              :
                <img 
                  src={getImageUrl(product, currentPic)}
                  alt="" 
                  className='aspect-square object-cover'
                  onClick={() => picsModal_h.open()}
                />
            }

          </div>
          <div>
            <h1 className='text-3xl '>
              {product?.name ?? 'Название '}
            </h1>

            <Rating className='mt-4' size='xl' value={1}/>

            <p className='mt-4 text-3xl'>
              {formatNumber(product?.price)} ₸
            </p>

            <div className='mt-4'>
              <p className='text-xl'>
                Описание:
              </p>
              <p className='text-xl tracking-wide'>
                {product?.description}
              </p>
              
              <div className='mt-4 flex gap-4 '>
                <Button size='lg'>
                  В корзину
                </Button>

                <Button size='lg'>
                  Купить
                </Button>
              </div>
            </div>
          </div>
        </div>


        {!preview && (
          <div className='max-w-[860px] mx-auto mt-8'>
            <p className='text-2xl '>
              Отызы ({product?.reviews?.length ?? '123'})
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
