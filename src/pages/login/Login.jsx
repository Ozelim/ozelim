import React from 'react'
import { LoginForm } from 'features/auth/loginWithEmail'
import { SignupForm } from 'features/auth/signupWithLink'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { showNotification } from '@mantine/notifications'
import { useAuth } from 'shared/hooks'
import { NewPassword, SendResetToEmail } from 'features/auth/forgotPassword'

export const Login = () => {

  const {user, loading} = useAuth()

  const [params] = useSearchParams()

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

  if (params.get('id')) return (
    <div className='max-w-sm mx-auto'>
      <SignupForm/>
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

  return (
    <div className="max-w-sm mx-auto">
      <LoginForm onComplete={onComplete} />
    </div>
  )
}
