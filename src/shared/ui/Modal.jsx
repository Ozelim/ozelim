import { useDisclosure } from '@mantine/hooks'
import { Modal as ModalM, Button, Group, TextInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { showNotification } from '@mantine/notifications'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLangContext } from 'app/langContext'

const schema = yup.object({
  name: yup.string().required('Заполните данное поле'),
  phone: yup.string().required('Заполните данное поле'),
  email: yup.string().email("Неверный формат почты").required("Заполните данное поле"),
})

export function Modal({ children, onSubmit, buttonProps, data, resort }) {

  const {qq} = useLangContext()

  const [opened, { open, close }] = useDisclosure(false)

  const { control, handleSubmit, clearErrors, setValue, formState: { errors },
  } = useForm({
    values: {
      name: '',
      phone: '',
      email: '',
      resort: '',
    },
    resolver: yupResolver(schema),
  })

  function handle(val) {
    onSubmit({
      ...val, 
      data,
    })
    .then(() => {
      close()
      showNotification({
        title: 'Заявка',
        message: 'Заявка успешно отправлена',
        color: 'green'
      })
    })
    .catch(() => {
      close()
      showNotification({
        title: 'Заявка',
        message: 'Не удалось отправить заявку',
        color: 'red'
      })
    })
    .finally(() => {
      setValue('email', '')
      setValue('name', '')
      setValue('phone', '')
    })
  }

  function onChange (name, e) {
    setValue(name, e)
    clearErrors(name)
  }

  return (
    <>
      <ModalM opened={opened} onClose={close} title="Заявка" centered>
        <form onSubmit={handleSubmit(handle)} className="flex flex-col gap-2">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                type="email"
                placeholder="Ваша почта"
                label="Почта"
                variant="filled"
                error={errors?.email?.message}
                onChange={(e) => onChange('email', e.currentTarget.value)}
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Ваше ФИО"
                label="ФИО"
                variant="filled"
                error={errors.name?.message}
                onChange={(e) => onChange('name', e.currentTarget.value)}
                // disabled={isSubmitting}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Ваш номер"
                label="Номер телефона"
                variant="filled"
                error={errors?.phone?.message}
                onChange={(e) => onChange('phone', e.currentTarget.value)}
                // disabled={isSubmitting}
              />
            )}
          />
          {resort && (
            <Controller
              name="resort"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="Название курорта"
                  label="Курорт"
                  variant="filled"
                  error={errors?.resort?.message}
                  onChange={(e) => onChange('resort', e.currentTarget.value)}
                  // disabled={isSubmitting}
                  required
                />
              )}
            />
          )}
          <Button 
            className="mt-4" 
            type="submit" 
            fullWidth
          >
            {qq('Отправить', 'Жіберу')}
          </Button>
        </form>
      </ModalM>

      <Group position="center" className='w-full'>
        <Button 
          size="md" 
          onClick={open}
          {...buttonProps} 
        >
          {children}
        </Button>
      </Group>
    </>
  )
}
