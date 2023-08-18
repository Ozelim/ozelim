import React from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Button, Group, Modal, NumberInput, PinInput, TextInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { pb } from 'shared/api'
import { openConfirmModal } from '@mantine/modals'
import { useAuth } from 'shared/hooks'

export const Withdraw = () => {

  const {user} = useAuth()

  const [opened, { open, close }] = useDisclosure(false)

  const [withdraw, setWithdraw] = React.useState({
    sum: '',
    owner: '',
  })

  const [card, setCard] = React.useState('')

  async function confirmWithdraw () {
    await pb.collection('withdraws').create({
      ...withdraw,
      card: card,
      user: user?.id,
      status: 'created'
    })
    .then(res => {
      showNotification({
        title: 'Уведомление',
        message: 'Заявка на вывод подана',
        color: 'green',
      })
      console.log(res, 'res')
    })
  }

  const confirm = () => {
    close()
    openConfirmModal({
      title: 'Подвердить действие',
      centered: true,
      labels: { confirm: 'Да', cancel: 'Нет' },
      onConfirm: () => confirmWithdraw(),
    })
  }

  const handleCardDisplay = () => {
    const rawText = [...card?.split(' ').join('')] // Remove old space
    const creditCard = [] // Create card as array
    rawText.forEach((t, i) => {
      if (i % 4 === 0 && i !== 0) creditCard.push(' ') // Add space
      creditCard.push(t)
    })

    return creditCard.join('') // Transform card array to string
  }

  function handleWithdrawChange(e) {
    const { value, name } = e.currentTarget
    setWithdraw({ ...withdraw, [name]: value })
  }

  const disabled =
    (withdraw?.owner?.length > 3) &&
    (Number(withdraw?.sum) >= 100 && Number(withdraw?.sum) <= user?.balance) &&
    card.length == 19


  return (
    <div className="space-y-2 mt-2">
      <Modal centered opened={opened} onClose={close} title="Вывод">
        <div className="flex flex-col gap-2">
          <TextInput
            description='Минимально 100'
            placeholder="500"
            label="Сумма"
            variant="filled"
            name="sum"
            onChange={handleWithdrawChange}
          />
          <TextInput
            value={handleCardDisplay()}
            onChange={(e) => setCard(e.currentTarget.value)}
            maxLength={19}
            placeholder="8888 8888 8888 8888"
            label="Карта для вывода"
            variant="filled"
          />
          <TextInput
            placeholder="RAUAN GOSLING"
            label="Владелец карты"
            variant="filled"
            name="owner"
            onChange={handleWithdrawChange}
          />

          <div className="mt-4">
            <Button fullWidth onClick={confirm} disabled={!disabled}>
              Подтвердить
            </Button>
          </div>
        </div>
      </Modal>
      <Button fullWidth onClick={open}>
        Вывод
      </Button>
    </div>
  )
}
