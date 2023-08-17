import { useDisclosure } from '@mantine/hooks'
import React from 'react'
import { Button, Group, Modal, TextInput } from '@mantine/core'
import { ConfirmModal } from './ConfirmModal'
import { Controller, useForm } from 'react-hook-form'
import { pb } from 'shared/api'

export const Withdraw = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    values: {
      amount: '',
      card: '',
      name: '',
    },
  })

  const onSubmit = async (data) => {
    await pb.collection('withdraw').create(data)
  }

  return (
    <div className="space-y-2 mt-2">
      <Modal centered opened={opened} onClose={close} title="Вывод">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="сумма перевода"
                label="Сумма"
                variant="filled"
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="ФИО"
                label="ФИО"
                variant="filled"
              />
            )}
          />
          <Controller
            name="card"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="4444 4444 4444 4444"
                label="Номер карты"
                variant="filled"
              />
            )}
          />
          <ConfirmModal onSubmit={onSubmit} />
        </form>
      </Modal>
      <Button fullWidth onClick={open}>
        Вывод
      </Button>
    </div>
  )
}
