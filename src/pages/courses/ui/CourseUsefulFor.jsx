import React from 'react'
import { Modal } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Image } from 'shared/ui'
import { pb } from 'shared/api'

import test from 'shared/assets/images/policy.pdf'

export const CourseUsefulFor = ({price}) => {

  const matches = useMediaQuery(`(max-width: 1100px)`)

  const [opened, { open, close }] = useDisclosure(false)

  async function submit (data) {
    return await pb.collection('bids').create({
      ...data,
      type: 'price',
      status: 'created',
    })
  }

  const [isChecked, setIsChecked] = React.useState(true)

  const onChangeChecked = () => {
    setIsChecked(!isChecked)
  }
  
  return (
    <>
      <div className="w-full">
        <div className="container">
          {matches ? (
            <div className="grid grid-cols-1">
              <h1 className="heading text-teal-500">
                {price?.heading} 
              </h1>
              <div className="md:gap-4 mt-6">
                <Image
                  record={price}
                  index={'image'}
                  className="max-w-xl mx-auto w-full h-full rounded-primary"
                />
                <p className='mt-2 text-center text-lg'>{price?.name}</p>
                {/* <img
                  src={getImageUrl(images, images?.[1])}
                  alt=""
                  className="row-span-2 w-full h-full rounded-primary"
                /> */}
              </div>
              <ul className="space-y-4 mt-10">
                {price?.[1] && (
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">
                      {price?.[1]}
                    </p>
                  </li>
                )}
                {price?.[2] && (
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">
                      {price?.[2]}
                    </p>
                  </li>
                )}
                {price?.[3] && (
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">
                      {price?.[3]}
                    </p>
                  </li>
                )}
                {price?.[4] && (
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">
                      {price?.[4]}
                    </p>
                  </li>
                )}
              </ul>
            </div>
          ) : (
            <div className="grid grid-cols-2 mt-6 gap-10">
              <div>
                <Image
                  record={price}
                  index={'image'}
                  className="w-full max-h-full rounded-primary object-cover"
                />
                <p className='mt-2 text-lg text-center'>{price?.name}</p>
              </div>
              <div>
                <h1 className="text-2xl lg:text-4xl font-semibold font-head text-teal-500">
                  {price?.heading}
                </h1>
                <ul className="space-y-4 mt-8">
                {price?.[1] && (
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">
                      {price?.[1]}
                    </p>
                  </li>
                )}
                {price?.[2] && (
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">
                      {price?.[2]}
                    </p>
                  </li>
                )}
                {price?.[3] && (
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">
                      {price?.[3]}
                    </p>
                  </li>
                )}
                {price?.[4]?.length !== 0 && (
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">
                      {price?.[4]}
                    </p>
                  </li>
                )}
                </ul>
                {/* <div className="mt-6">
                  <Checkbox
                    onChange={onChangeChecked}
                    className="flex justify-center -mb-6"
                    label={
                      <>
                        "Я принимаю <span 
                            className='underline cursor-pointer' 
                            onClick={matches ? open : () => {}}
                          >
                            {matches 
                              ? 'условия пользовательского соглашения'
                              : <a href={'/policy.pdf'} target='_blank'> условия пользовательского соглашения</a>
                            }
                          
                          </span>, и договора оферты."
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
                </div> */}
              </div>
            </div>
          )}
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
    </>
  )
}
