import { Button, Checkbox, Modal } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { useLangContext } from 'app/langContext'
import React from 'react'
import { Link } from 'react-router-dom'

import test from 'shared/assets/images/policy.pdf'

export const ProgramDocs = () => {

  const {kz} = useLangContext()

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
          <section id="docs" className="mt-10">
            <div className="text-center">
              {kz ? (
                <Checkbox
                  onChange={onChangeChecked}
                  className="flex justify-center"
                  label={
                    <>
                      "Мен пайдаланушы <span 
                          className='underline cursor-pointer' 
                          onClick={matches ? open : () => {}}
                        >
                          {matches 
                            ? 'келісімінің шарттарын'
                            : <a href={'/test.pdf'} target='_blank'> келісімінің шарттарын</a>
                          }
                        </span> қабылдаймын"
                    </>
                  }
                />
              ) : (
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
                              : <a href={'/test.pdf'} target='_blank'> условия пользовательского соглашения</a>
                            }
                          </span>, и договора оферты."
                      </>
                    }
                  />
                )
              }
                <Button component={Link} to="https://oz-elim.kz/login?id=111111111111111" className="mt-3" size="md" disabled={isChecked}>
                  {kz ? `Серіктес болу` : `Стать партнером`}
                </Button>
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
