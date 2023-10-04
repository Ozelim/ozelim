import { Button, Center, Modal } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import React from 'react'
import { getExtension, getImageUrl } from 'shared/lib'

import dog from 'shared/assets/images/dogtwo.pdf'

export const ProgramRules = ({ headings, text }) => {

  const [opened, { open, close }] = useDisclosure(false)

  const matches = useMediaQuery(`(min-width: 767px)`)

  return (
    <>
      <div className="w-full">
        <div className="container">
          <section className="bg-[#F7F7F5] mt-8 lg:mt-16 rounded-[20px] ">
            <h2 className="text-[35px] text-teal-500 font-bold">
              {headings?.text2_head}
            </h2>
            <div className="grid md:grid-cols-2 md:gap-10">
              <div className="">
                <p className="mt-5 font-medium">{text?.text5}</p>
                <p className="mt-5  font-medium">{text?.text6}</p> 
              </div>
              <div className="mt-5">
                <p className="text-[#27272D] text-center">
                  {text?.text7} 
                </p>
                
                <Center>
                  <Button size="md" className="mt-5" onClick={matches ? open : () => {}}>
                    {matches 
                      ? 'Договор оферты'
                      : <a href={'/dogtwo.pdf'} target='_blank'> Договор оферты</a>
                    }
                  </Button>
                </Center>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Modal 
        opened={opened} 
        onClose={close} 
        centered 
        size={'xl'}
      >
        <iframe 
          className="w-full h-screen" 
          src={dog} 
          frameborder="0" 
        />
      </Modal>
    </>
  )
}
