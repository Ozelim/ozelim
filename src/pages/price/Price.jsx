import React from 'react'
import { PriceList } from 'modules/PriceList'
import { CourseUsefulFor } from 'pages/courses/ui/CourseUsefulFor'
import { pb } from 'shared/api'
import { usePageData } from 'shared/hooks'
import { HealthLink } from 'shared/ui/HealthLink'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Checkbox, Modal } from '@mantine/core'

import test from 'shared/assets/images/policy.pdf'
import voz from 'shared/assets/images/voz.pdf'
import { useLangContext } from 'app/langContext'

async function getPrices () {
  return await pb.collection('prices').getFullList({expand: 'prices', filter: `kz = false`})
}

async function getPricesKz () {
  return await pb.collection('prices').getFullList({expand: 'prices', filter: `kz = true`})
}

export const Price = () => {

  const matches = useMediaQuery(`(min-width: 767px)`)

  const {lang, kz} = useLangContext()

  async function submit (data) {
    return await pb.collection('bids').create({
      ...data,
      type: 'price',
      status: 'created',
    })
  }

  const {text, headings} = usePageData('price')

  const [prices, setPrices] = React.useState([]) 

  React.useEffect(() => {
    if (kz) {
      getPricesKz()
      .then(res => {
        setPrices(res)
      })
    } else {
      getPrices()
      .then(res => {
        setPrices(res)
      })
    }
  }, [lang])

  const [opened, { open, close }] = useDisclosure(false)

  const [isChecked, setIsChecked] = React.useState(null)

  const onChangeChecked = (val) => {
    if (val === isChecked) {
      setIsChecked(null)
    } else {
      setIsChecked(val)
    }
  }

  const [a, setA] = React.useState(false)
  const [v, setV] = React.useState(false)

  return (
    <>
      <div>
        <div className='space-y-16'>
          {prices?.map((price) => {
            return (
              <div key={price.id}>
                <CourseUsefulFor price={price} />
                <PriceList list={price?.expand?.prices} />
                <div className="mt-6 px-4">
                  {kz ? (
                    <Checkbox
                      onChange={() => onChangeChecked(price?.id)}
                      className="flex justify-center -mb-4"
                      label={
                        <>
                          "Мен пайдаланушы <span 
                              className='underline cursor-pointer' 
                              onClick={matches ? open : () => {}}
                            >
                            </span> <span
                              className='underline cursor-pointer' 
                              onClick={matches ? () => setA(true) : () => {}}
                            >
                              {matches 
                                ? 'келісімінің шарттарын'
                                : <a href={'/policy.pdf'} target='_blank'>келісімінің шарттарын</a>
                              }
                            </span> қабылдаймын"
                        </>
                      }
                    />
                  ) : (
                    <Checkbox
                      onChange={() => onChangeChecked(price?.id)}
                      className="flex justify-center -mb-4"
                      label={
                        <>
                          "Я принимаю <span 
                              className='underline cursor-pointer' 
                              onClick={matches ? open : () => {}}
                            >
                              {/* {matches 
                                ? 'условия пользовательского соглашения'
                                : <a href={'/policy.pdf'} target='_blank'> условия пользовательского соглашения</a>
                              } */}
                            </span> <span
                              className='underline cursor-pointer' 
                              onClick={matches ? () => setA(true) : () => {}}
                            >
                              {matches 
                                ? 'условия пользовательского соглашения'
                                : <a href={'/policy.pdf'} target='_blank'>договора оферты</a>
                              }
                            </span>
                        </>
                      }
                    />
                  )}
           
                  <HealthLink
                    onSubmit={submit} 
                    label={kz ? `Қызметке тапсырыс беру` : `Заказать услугу`}
                    buttonProps={{
                      disabled: isChecked !== price?.id
                    }}
                  />
                  {/* <Button size="lg">Записаться на курс</Button> */}
                </div>
              </div>
            )
          })}
        </div>
        {/* <div className='mt-10 lg:mt-20'>
          <CourseUsefulFor type='new' />
          <PriceList type='new' />
        </div> */}

        <div className="container mt-6">
          <div>
            <h3 className='text-2xl text-primary-600 font-bold'>{headings?.q1}</h3>
            <ul className='mt-4'>
  
              {text?.q1 && (
                <li className='flex gap-4'>
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <span className='text-lg'>
                    {text?.q1}
                  </span>
                </li>
              )}
              {text?.q2 && (
                <li className='flex gap-4'>
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <span className='text-lg'>
                    {text?.q2}
                  </span>
                </li>
              )}
              {text?.q3 && (
                <li className='flex gap-4'>
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <span className='text-lg'>
                    {text?.q3}
                  </span>
                </li>
              )}
              {text?.q4 && (
                <li className='flex gap-4'>
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <span className='text-lg'>
                    {text?.q4}
                  </span>
                </li>
              )}
              <li className='flex gap-4'>
                <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                <span 
                  className='text-lg underline cursor-pointer'
                  onClick={matches ? () => setV(true) : () => {}}
                >
                  {matches 
                    ? 'Отмена заявки и возврат денег (.doc)'
                    : <a href={'/voz.pdf'} target='_blank'>Отмена заявки и возврат денег (.doc)</a>
                  }
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Modal
        opened={opened} 
        onClose={close} 
        centered 
        size={'xl'}
      >
        <embed 
          className="w-full h-screen" 
          src={test} 
        />
      </Modal>
      <Modal
        opened={a} 
        onClose={() => setA(false)} 
        centered 
        size={'xl'}
      >
        <embed 
          className="w-full h-screen" 
          src={test} 
        />
      </Modal>
      <Modal
        opened={v} 
        onClose={() => setV(false)} 
        centered 
        size={'xl'}
      >
        <embed 
          className="w-full h-screen" 
          src={voz} 
        />
      </Modal>
    </>
  )
}
