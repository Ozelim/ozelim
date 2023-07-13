import React from 'react'
import { LoginForm } from 'features/auth/loginWithEmail'
import { SignupForm } from 'features/auth/signupWithLink'
import { Link, useSearchParams } from 'react-router-dom'

export const Login = () => {

  const [params] = useSearchParams()

  if (params.get('id')) return (
    <div className='max-w-sm mx-auto'>
      <SignupForm/>
    </div>
  )

  return (
    <div className='max-w-sm mx-auto'>
      <LoginForm/>
    </div>
  )
}
