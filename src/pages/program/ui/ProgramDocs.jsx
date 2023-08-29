import { Button, Checkbox, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'
import { Link } from 'react-router-dom'

import test from 'shared/assets/images/policy.pdf'

export const ProgramDocs = () => {

  const [isChecked, setIsChecked] = React.useState(true)

  const onChangeChecked = () => {
    setIsChecked(!isChecked)
  }

  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <div className="w-full">
        <div className="container">
          <section id="docs" className=" mt-10">
            <div className="text-center">
              <Checkbox
                onChange={onChangeChecked}
                className="flex justify-center"
                label={
                  <>"Я принимаю <span className='underline cursor-pointer' onClick={open}>условия пользовательского соглашения</span>, и договора оферты."</>
                }
              />
              <Link to="https://oz-elim.kz/login?id=111111111111111">
                <Button className="mt-3" size="md" disabled={isChecked}>
                  Стать дистрибьютором
                </Button>
              </Link>
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
