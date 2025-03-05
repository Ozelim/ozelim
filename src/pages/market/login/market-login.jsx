import React from 'react'
import { Button, LoadingOverlay, PasswordInput, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { pb } from 'shared/api'
import { showNotification } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'

export const MarketLogin = () => {

  const navigate = useNavigate()

  const [data, setData] = React.useState({
    email: '',
    password: '',
  })

  function handleInputChange (e) {
    setData({
      ...data,
      [e.currentTarget.name]: e.currentTarget.value
    })
    setError('')
  }

  const [error, setError] = React.useState('')

  const [loading, loading_h] = useDisclosure(false)

  async function submit() {

    if (!data?.email || !data?.password) {
      setError('Заполните все поля')
      return
    }

    if (data?.password.length < 6) {
      setError('Пароль должен быть не менее 6 символов')
      return
    }

    if (!data?.email.includes('@')) {
      setError('Некорректный email')
      return
    }

    loading_h.open()

    await pb.collection('merchants').authWithPassword(data?.email, data?.password)
    .then(() => { 
      showNotification({
        title: 'Вход в магазин',
        message: 'Вход выполнен успешно',
        color: 'teal',
      })
      navigate('/duken')
    })
    .catch(err => {
      console.log(err?.response)
      if (err?.response?.data?.email?.code == "validation_not_unique") {
        setError('Почту уже используются')
        console.log('email already exists');
        return
      }
      if (err?.response?.data?.email?.code == "validation_is_email") {
        setError('Неверная почта')
        console.log('email wrong');
      }
    })
    loading_h.close()
  }

  return (
    <div className='w-full h-full'>
      <LoadingOverlay visible={loading}/>
      <div className="container-market !mt-8 market">
        <h1 className='text-2xl text-center'>Вход в магазин</h1>
        <div className='h-full flex justify-center items-center flex-col mt-4'>
          <div className='bg-white max-w-sm flex flex-col items-center gap-3 border p-4 w-full rounded-primary shadow-sm'>
            <TextInput
              variant='filled'
              label='Email'
              className='w-full'
              value={data?.email}
              placeholder='Введите ваш email'
              onChange={handleInputChange}
              name='email'
              type='email'
            />
            <PasswordInput
              variant='filled'
              className='w-full'
              label='Пароль'
              placeholder='********'
              value={data?.password}
              onChange={handleInputChange}
              name='password'
            />
            {error && (
              <div className='flex justify-start w-full'>
                <p className='text-red-500 text-xs'>
                  {error}
                </p>
              </div>
            )}
            <Button
              onClick={async () => await submit()}
              variant='light'
            >
              Войти
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}