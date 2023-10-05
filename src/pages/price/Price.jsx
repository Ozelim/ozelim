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

async function getPrices () {
  return await pb.collection('prices').getFullList({expand: 'prices'})
}

export const Price = () => {

  const matches = useMediaQuery(`(max-width: 1100px)`)

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
    getPrices()
    .then(res => {
      setPrices(res)
    })
  }, [])

  const [opened, { open, close }] = useDisclosure(false)

  const [isChecked, setIsChecked] = React.useState(true)

  const onChangeChecked = () => {
    setIsChecked(!isChecked)
  }

  const [a, setA] = React.useState(false)
  const [v, setV] = React.useState(false)

  return (
    <>
      <div>
        <div className='space-y-16'>
          {prices?.map((price) => {
            return (
              <div>
                <CourseUsefulFor price={price} />
                <PriceList list={price?.expand?.prices} />
                <div className="mt-6 px-4">
                  <Checkbox
                    onChange={onChangeChecked}
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
                          </span> условия <span
                            className='underline cursor-pointer' 
                            onClick={matches ? () => setA(true) : () => {}}
                          >
                            {matches 
                              ? 'условия пользовательского соглашения'
                              : <a href={'/dogone.pdf'} target='_blank'>договора оферты</a>
                            }
                          </span>
                      </>
                    }
                  />
                  <HealthLink
                    onSubmit={submit} 
                    label='Заказать услугу'
                    buttonProps={{
                      disabled: isChecked
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
              <li className='flex gap-4'>
                <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                <span className='text-lg underline'>
                  {matches 
                    ? 'Отмена заявки и возврат денег (.doc)'
                    : <a href={'/dogone.pdf'} target='_blank'>Отмена заявки и возврат денег (.doc)</a>
                  }
                </span>
              </li>
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
        onClose={setA} 
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
        onClose={setV} 
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
