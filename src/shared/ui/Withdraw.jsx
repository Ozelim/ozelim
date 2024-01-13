import React from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Button, Group, LoadingOverlay, Modal, NumberInput, PinInput, Select, TextInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { pb } from 'shared/api'
import { openConfirmModal } from '@mantine/modals'
import { useAuth } from 'shared/hooks'
import { showNotification } from '@mantine/notifications'

export const Withdraw = () => {

  const {user} = useAuth()

  const [opened, { open, close }] = useDisclosure(false)

  const [loading, setLoading] = React.useState(false)

  const banks = [
    "Народный банк Казахстана",
    "Kaspi Bank",
    "Банк ЦентрКредит",
    "Forte Bank",
    "Евразийский банк",
    "First Heartland Jusan Bank",
    "Bank RBK",
    "Bereke Bank",
    "Банк Фридом Финанс Казахстан",
    "Ситибанк Казахстан",
    "Home Credit Bank Kazakhstan",
    "Нурбанк"
  ]

  const [withdraw, setWithdraw] = React.useState({
    sum: '',
    owner: '',
    bank: null,
    iban: '',
    iin: ''
  })

  const [card, setCard] = React.useState('')

  async function confirmWithdraw () {
    setLoading(true)
    await pb.collection('withdraws').create({
      ...withdraw,
      card: card,
      user: user?.id,
      status: 'created',
    })
    .then(async res => {
      await pb.collection('users').update(user?.id, {
        balance: user?.balance - Number(withdraw?.sum)
      })
      .then(() => {
        showNotification({
          title: 'Уведомление',
          message: 'Заявка на вывод подана',
          color: 'green',
        })
        window.location.reload()
      })
    })
    .catch(err => {
      setLoading(false)
    })
  }

  const confirm = () => {
    close()
    openConfirmModal({
      title: 'Подвердить действие',
      centered: true,
      labels: { confirm: 'Да', cancel: 'Нет' },
      children: (
        <>Вы действительно хотите вывести средства?</>
      ),
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
    if (name === 'sum') {
      if (/^[0-9\b]+$/.test(value) || value === '') {
        setWithdraw({ ...withdraw, sum: value})
      }
      return
    }
    setWithdraw({ ...withdraw, [name]: value })
  }

  const disabled =
    withdraw?.bank && (withdraw?.owner?.length > 3) &&
    (Number(withdraw?.sum) >= 100 && Number(withdraw?.sum) <= user?.balance) &&
    // card.length == 19
    withdraw?.iban?.length == 20 && withdraw?.iin?.length == 12

  return (
    <div>
      <LoadingOverlay visible={loading} />
      <div className="space-y-2 mt-2">
        <Modal centered opened={opened} onClose={close} title="Вывод">
          <div className="flex flex-col gap-2">
            <TextInput
              description='Минимально 100'
              placeholder="500"
              label="Сумма"
              variant="filled"
              name="sum"
              value={withdraw?.sum}
              onChange={handleWithdrawChange}
            />
            <Select
              data={banks}
              label='Банк:'
              value={withdraw?.bank}
              onChange={(e) => setWithdraw({...withdraw, bank: e})}
            />
            {/* <TextInput
              value={handleCardDisplay()}
              onChange={(e) => setCard(e.currentTarget.value)}
              maxLength={19}
              placeholder="8888 8888 8888 8888"
              label="Номер счета карты (IBAN)"
              variant="filled"
            /> */}
            <TextInput
              placeholder="KZ123456789123456789"
              label="Номер счета карты (IBAN)"
              variant="filled"
              name="iban"
              maxLength={20}
              onChange={handleWithdrawChange}
            />
            <TextInput
              placeholder="ФИО"
              label="Владелец счета"
              variant="filled"
              name="owner"
              onChange={handleWithdrawChange}
            />
            <NumberInput
              placeholder="030627129340"
              label="ИИН"
              variant="filled"
              name="iin"
              maxLength={12}
              onChange={handleWithdrawChange}
            />
            <div className="mt-4">
              <Button 
                fullWidth 
                onClick={confirm} 
                disabled={!disabled}
              >
                Подтвердить
              </Button>
            </div>
          </div>
        </Modal>
        <Button fullWidth onClick={open}>
          Вывод
        </Button>
      </div>
    </div>
  )
}
