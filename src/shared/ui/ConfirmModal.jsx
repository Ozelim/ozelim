import { Button, Text } from '@mantine/core'
import { modals } from '@mantine/modals'

export function ConfirmModal({ equal, answer, onSubmit }) {
  const openModal = () =>
    modals.openConfirmModal({
      title: 'Подтвердите перевод',
      size: 'lg',
      children: (
        <Text size="sm">Вы уверены что хотите перевести эти средства ?</Text>
      ),
      labels: { confirm: 'ДА', cancel: 'НЕТ' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => onSubmit(),
    })

  return (
    <Button disabled={equal != answer} onClick={openModal}>
      Перевести
    </Button>
  )
}
