import React from 'react'
import { LoginForm } from 'features/auth/loginWithEmail'
import { SignupForm } from 'features/auth/signupWithLink'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { showNotification } from '@mantine/notifications'
import { useAuth } from 'shared/hooks'
import { NewPassword, SendResetToEmail } from 'features/auth/forgotPassword'
import { AgentsForm } from './agents/AgentsForm'
import { pb } from 'shared/api'
import { Tabs } from '@mantine/core'

export const Login = () => {

  const {user, loading} = useAuth()

  const [params, setParams] = useSearchParams()

  const navigate = useNavigate() 

  React.useEffect(() => {
    if (!loading) {
      if (user) {
        navigate('/')
      }
    }
  }, [loading])

  function onComplete () {
    navigate('/')
    window.location.reload()
    showNotification({
      title: 'Уведомление', 
      message: 'Вход выполнен успешно'
    })
  }

  async function auth (data) {
    await pb.collection('agents').authWithPassword(data?.email, data?.password)
    .then(res => {
      onComplete(res)
    })
  }

  if (params.get('id')) return (
    <div className='max-w-sm mx-auto'>
      <SignupForm onComplete={onComplete}/>
    </div>
  )

  if (params.get('token')) return (
    <div className='max-w-sm mx-auto'>
      <NewPassword/>
    </div>
  )

  if (params.get('reset')) return (
    <div className='max-w-sm mx-auto h-full'>
      <SendResetToEmail/>
    </div>
  )

  function goToSignup () {
    params.set('signup', true)
    params.set('agent', 111924111111111)
    setParams(params)
  }

  function goToLogin () {
    params.delete('signup')
    setParams(params)
  }

  return (
    <div className='max-w-sm mx-auto'>
      {params.get('signup') ? (
        <>
          <AgentsForm
            onComplete={onComplete}
          />
          <div className='mt-4 text-center text-sm'>Уже есть аккаунт? <span onClick={goToLogin} className='text-primary-500 cursor-pointer'>Войти</span> </div>
        </>
      ) : (
        <Tabs
          variant='outline'
          defaultValue='user'
        >
          <Tabs.List grow>
            <Tabs.Tab value='user'>Пользователь</Tabs.Tab>
            <Tabs.Tab value='partner'>Партнер</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='partner' pt={16}>
            <LoginForm onComplete={onComplete} />
            <div className='mt-4 text-center text-sm'>Еще нет аккаунта? <span onClick={goToSignup} className='text-primary-500 cursor-pointer'>Зарегистрироваться</span> </div>
          </Tabs.Panel>
          <Tabs.Panel value='user' pt={16}>
            <LoginForm onComplete={onComplete} auth={auth} />
            <div className='mt-4 text-center text-sm'>Еще нет аккаунта? <span onClick={goToSignup} className='text-primary-500 cursor-pointer'>Зарегистрироваться</span> </div>
          </Tabs.Panel>
        </Tabs>
      )}
    </div>
  )
}
