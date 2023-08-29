import { Button, Center, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'
import { getExtension, getImageUrl } from 'shared/lib'

import test from 'shared/assets/images/test.pdf'

export const ProgramRules = ({ headings, text }) => {

  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <div className="w-full">
        <div className="container">
          <section className="bg-[#F7F7F5] mt-16 rounded-[20px] ">
            <h2 className="text-[35px] text-heading font-bold">
              {headings?.text2_head}
            </h2>
            <div className="flex">
              <div className="w-2/4">
                <p className="mt-5 font-medium">{text?.text5}</p>
                <p className="mt-5  font-medium">{text?.text6}</p>
              </div>
              <div className="w-2/4 ml-11 mt-5">
                <p className="text-[#27272D]">{text?.text7}</p>
                <Center>
                  <Button size="md" className="mt-5" onClick={open}>
                    Договор офферты
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
          src={test} 
          frameborder="0" 
        />
      </Modal>
    </>
  )
}
