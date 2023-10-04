import React from 'react'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { Modal } from 'shared/ui/Modal'
import { pb } from 'shared/api'

export const HealthLink = ({ onSubmit, label, heading, buttonProps, data, resort }) => {

  return (
    <div className="w-full">
      <div className="container">
        <div className="mt-10">
          {heading && (
            <h1 className="text-4xl font-semibold text-center mb-5">
              {heading}
            </h1>
          )}
          <div className="flex justify-center gap-5">
            <Modal onSubmit={onSubmit} buttonProps={buttonProps} data={data} resort={resort}>
              {label}
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}
