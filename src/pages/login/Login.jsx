import React from 'react'
import { LoginForm } from 'features/auth/loginWithEmail'
import { SignupForm } from 'features/auth/signupWithLink'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { showNotification } from '@mantine/notifications'
import { useAuth } from 'shared/hooks'

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

  return (
    <div className="max-w-sm mx-auto">
      <LoginForm onComplete={onComplete} />
    </div>
  )
}
