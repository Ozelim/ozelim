import React from 'react'
import { TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'

export const CustomerSignup = () => {

  const [data, setData] = React.useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })    

  const [error, setError] = React.useState('')

  const [loading, loading_h] = useDisclosure(false)

  async function handleCustomerSignup () {
    if (data?.password !== data?.passwordConfirm) {
      setError('Пароли не совпадают')
      return
    }

    if (data?.password.length < 6) {
      setError('Пароль должен быть не менее 6 символов')
      return
    }

    if (!data?.email.includes('@')) {
      setError('Неверный email')
      return
    }

    if (!data?.name || !data?.phone || !data?.email || !data?.password || !data?.passwordConfirm) {
      setError('Заполните все поля')
      return
    }

    loading_h.open()
    await pb.collection('customers').create({
      ...data,
      
    })
    .then(async () => {
      await pb.collection('customers').authWithPassword(data?.email, data?.password)
      .then(() => {
        loading_h.close()
        showNotification({
          title: 'Регистрация',
          message: 'Вы успешно зарегистрировались',
          color: 'green'
        })
      })
    })
    .catch((err) => {
      setError(err?.message)
      showNotification({
        title: 'Регистрация',
        message: 'Не удалось зарегистрироваться',
        color: 'red'
      })
    })
    loading_h.close()
  }

  return (
    <div className='w-full h-full'>
      <p className='text-center'>Для совершения покупок на сайте, вам необходимо зарегистрироваться</p>
      <div className='space-y-3 mt-4'>
          <TextInput
            label='Имя'
            placeholder='Ваше имя'
            required
            variant='filled'
            value={data?.name}
            onChange={(e) => setData({...data, name: e?.currentTarget?.value})}
          />
          <TextInput
            label='Номер телефона'
            placeholder='+7 (___) ___-__-__'
            required
            variant='filled'
            value={data?.phone}
            onChange={(e) => setData({...data, phone: e?.currentTarget?.value})}
          />  
          <TextInput
            label='Email'
            placeholder='Ваш email'
            required
            variant='filled'
            value={data?.email}
            onChange={(e) => setData({...data, email: e?.currentTarget?.value})}
          />
          <PasswordInput
            label='Пароль'
            placeholder='Ваш пароль'
            required
            variant='filled'
            value={data?.password}
            onChange={(e) => setData({...data, password: e?.currentTarget?.value})}
          />  
          <PasswordInput
            label='Подтвердите пароль'
            placeholder='Подтвердите пароль'
            required
            variant='filled'
            value={data?.passwordConfirm}
            onChange={(e) => setData({...data, passwordConfirm: e?.currentTarget?.value})}
          />  
        </div>
        {error && (
          <p className='text-red-500 text-center mt-4'>{error}</p>
        )}  
        <div className='flex justify-center mt-3 mb-2'>
          <Button
            fullWidth
            onClick={handleCustomerSignup}
            loading={loading}
          >
            Зарегистрироваться
          </Button> 
        </div>
      </div>
  )
}