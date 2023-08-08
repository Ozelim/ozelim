import React from 'react'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { Modal } from 'shared/ui/Modal'

export const HealthLink = () => {
  return (
    <div className="w-full">
      <div className="container">
        <div className="mt-10">
          <h1 className="text-4xl font-semibold text-center mb-5">
            Узнать цену
          </h1>
          <div className="flex justify-center gap-5">
            <Link to="/price">
              <Button size="md">Перейти</Button>
            </Link>
            <Modal>Оставить заявку</Modal>
          </div>
        </div>
      </div>
    </div>
  )
}
