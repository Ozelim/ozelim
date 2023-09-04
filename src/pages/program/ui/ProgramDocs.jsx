import { Button, Checkbox, Modal } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import React from 'react'
import { Link } from 'react-router-dom'

import test from 'shared/assets/images/policy.pdf'

export const ProgramDocs = () => {

  const [isChecked, setIsChecked] = React.useState(true)

  const onChangeChecked = () => {
    setIsChecked(!isChecked)
  }

  const [opened, { open, close }] = useDisclosure(false)

  const matches = useMediaQuery(`(min-width: 767px)`)

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
        <embed 
          className="w-full h-screen" 
          src={test} 
        />
      </Modal>
    </>
  )
}
