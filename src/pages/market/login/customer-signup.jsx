import React from 'react'
import { TextInput, PasswordInput, Button, UnstyledButton } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useDisclosure } from '@mantine/hooks'
import { pb } from 'shared/api'
import { closeAllModals } from '@mantine/modals'
import { getId } from 'shared/lib'

export const CustomerSignupModal = () => {

  const [type, setType] = React.useState('login')

  const [signupData, setSignupData] = React.useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
  })

  const [error, setError] = React.useState('')

  const [loading, loading_h] = useDisclosure(false)

  async function handleCustomerSignup() {
    if (signupData?.password !== signupData?.passwordConfirm) {
      setError('Пароли не совпадают')
      return
    }

    if (signupData?.password.length < 6) {
      setError('Пароль должен быть не менее 6 символов')
      return
    }

    if (!signupData?.email.includes('@')) {
      setError('Неверный email')
      return
    }

    if (!signupData?.name || !signupData?.phone || !signupData?.email || !signupData?.password || !signupData?.passwordConfirm) {
      setError('Заполните все поля')
      return
    }

    loading_h.open()
    await pb
      .collection('customers')
      .create({
        ...signupData,
        emailVisibility: true,
        id: getId(15),
      })
      .then(async (res) => {
        await pb.collection('chats').create({
          id: res?.id,
          customer: res?.id,
          type: 'support',
        })
        await pb
          .collection('customers')
          .authWithPassword(signupData?.email, signupData?.password)
          .then(() => {
            showNotification({
              title: 'Регистрация',
              message: 'Вы успешно зарегистрировались',
              color: 'green',
            })
            closeAllModals()
            setTimeout(() => {
              loading_h.close()
              window.location.reload()
            }, 1000)
          })
      })
      .catch((err) => {
        setError(err?.message)
        showNotification({
          title: 'Регистрация',
          message: 'Не удалось зарегистрироваться',
          color: 'red',
        })
      })
    
    loading_h.close()
  }

  async function login () { 
    if (!loginData?.email || !loginData?.password) {
      setError('Заполните все поля')
      return
    }

    loading_h.open()

    await pb
      .collection('customers')
      .authWithPassword(loginData?.email, loginData?.password)
      .then(() => {
        showNotification({
          title: 'Вход',
          message: 'Вы успешно вошли',
          color: 'green',
        })
        closeAllModals()
        setTimeout(() => {
          loading_h.close()
          window.location.reload()
        }, 1000)
      })
      .catch((err) => {
        setError(err?.message)
        showNotification({
          title: 'Вход',
          message: 'Не удалось войти',
          color: 'red',
        })
      })
    loading_h.close()
  }

  React.useEffect(() => {
    setSignupData({
      name: '',
      phone: '',
      email: '',
      password: '',
      passwordConfirm: '',
    })
    setLoginData({
      email: '',
      password: '',
    })
    setError('')
    loading_h.close()
  }, [type])

  if (type === 'login') {
    return (
      <div className="w-full h-full bg-white rounded-lg p-4">
        <p className="text-center">
          Вход
        </p>
        <div className='space-y-3 mt-4'>
          <TextInput
            type='email'
            label="Email"
            placeholder="Ваш email"
            required
            variant="filled"
          value={loginData?.email}
          onChange={(e) => setLoginData({ ...loginData, email: e?.currentTarget?.value })}
        />  
        <PasswordInput
          label="Пароль"
          placeholder="Ваш пароль"
          required
          variant="filled"
          value={loginData?.password}
          onChange={(e) => setLoginData({ ...loginData, password: e?.currentTarget?.value })}
        />  
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className="flex justify-center mt-6 mb-2">
          <Button fullWidth onClick={login}>
            Войти
          </Button>
        </div>
        <div className='flex justify-end items-center gap-2 mt-4'>
          <p className='text-sm text-gray-500'>
            Еще нет аккаунта?
          </p>  
          <UnstyledButton disabled={loading} onClick={() => setType('signup')} variant='white' className='text-primary-500 !underline !text-sm'>
            Зарегистрироваться
          </UnstyledButton>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-white rounded-lg p-4">
      <p className="text-center">
        Регистрация
      </p>
      <div className="space-y-3 mt-4">
        <TextInput
          label="Имя"
          placeholder="Ваше имя"
          required
          variant="filled"
          value={signupData?.name}
          onChange={(e) => setSignupData({ ...signupData, name: e?.currentTarget?.value })}
        />
        <TextInput
          label="Номер телефона"
          placeholder="+7 (___) ___-__-__"
          required
          variant="filled"
          value={signupData?.phone}
          onChange={(e) => setSignupData({ ...signupData, phone: e?.currentTarget?.value })}
        />
        <TextInput
          label="Email"
          placeholder="Ваш email"
          required  
          type='email'
          variant="filled"
          value={signupData?.email}
          onChange={(e) => setSignupData({ ...signupData, email: e?.currentTarget?.value })}
        />
        <PasswordInput
          label="Пароль"
          placeholder="Ваш пароль"
          required
          variant="filled"
          value={signupData?.password}
          onChange={(e) => setSignupData({ ...signupData, password: e?.currentTarget?.value })}
        />
        <PasswordInput
          label="Подтвердите пароль"
          placeholder="Подтвердите пароль"
          required
          variant="filled"
          value={signupData?.passwordConfirm}
          onChange={(e) => setSignupData({ ...signupData, passwordConfirm: e?.currentTarget?.value })}
        />
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <div className="flex justify-center mt-6 mb-2">
        <Button fullWidth onClick={handleCustomerSignup} loading={loading}>
          Зарегистрироваться
        </Button>
      </div>
      <div className='flex justify-end items-center gap-2 mt-4'>
        <p className='text-sm text-gray-500'>
          Уже есть аккаунт?
        </p>
        <UnstyledButton disabled={loading} onClick={() => setType('login')} variant='white' className='text-primary-500 !underline !text-sm'>
          Войти
        </UnstyledButton>
      </div>
    </div>
  )
}