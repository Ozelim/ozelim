import { Button, Checkbox } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'

export const ProgramDocs = () => {
  const [isChecked, setIsChecked] = React.useState(true)

  const onChangeChecked = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div className="w-full">
      <div className="container">
        <section id="docs" className=" mt-10">
          <div className="text-center">
            <Checkbox
              onChange={onChangeChecked}
              className="flex justify-center"
              label="Я принимаю условия пользовательского соглашения, и договора оферты."
            />
            <Link to="/login">
              <Button className="mt-3" size="md" disabled={isChecked}>
                Стать дистрибьютором
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
