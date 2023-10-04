import React from 'react'
import { Button, Center, Checkbox, Modal, Slider } from '@mantine/core'
import { HealthLink } from 'shared/ui/HealthLink'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'

import test from 'shared/assets/images/policy.pdf'

export const Parasha = () => {

  const [isChecked, setIsChecked] = React.useState(true)
  const [opened, { open, close }] = useDisclosure(false)
  const onChangeChecked = () => {
    setIsChecked(!isChecked)
  }

  const matches = useMediaQuery(`(min-width: 767px)`)

  async function submit (data) {
    console.log(data);
    return await pb.collection('bids').create({
      ...data,
      type: 'resort',
      status: 'created',
      data: data?.resort
  })
    .then(res => {
      console.log(res, 'res');
    })
  }

  return (
    <>
      <section className="bg-[#F7F7F5] mt-8 lg:mt-16 rounded-[20px]" id='jopa'>
        <h2 className="text-[35px] text-teal-500 font-bold">
          Заголовок
        </h2>
        <div className="grid md:grid-cols-2 md:gap-10">
          <div className="">
            <p className="mt-5 font-medium">
              текст описание текст описание текст описание текст описание текст описание текст описание текст описание 
            </p>
            <p className="mt-5  font-medium">
            текст описание текст описание текст описание текст описание текст описание текст описание текст описание 
            </p> 
          </div>
          <div className="mt-5">
            <p className="text-[#27272D] text-center">
              текст описание текст описание текст описание текст описание текст описание текст описание текст описание 
            </p>
            <Checkbox
              onChange={onChangeChecked}
              className="flex justify-center mt-5"
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
            <Center>
              <HealthLink
                label='Подать заявку'
                onSubmit={submit}
                resort
                buttonProps={{
                  disabled: isChecked
                }}
              />
              {/* <Button 
                size="md" 
                className="mt-2" 
                onClick={matches ? open : () => {}}
                disabled={!isChecked}
              >
                {matches 
                  ? 'Договор оферты'
                  : <a href={'/test.pdf'} target='_blank'>Подать заявку</a>
                }
              </Button> */}
            </Center>
          </div>
        </div>
      </section>
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
