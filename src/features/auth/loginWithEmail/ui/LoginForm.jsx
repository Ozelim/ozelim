import React from 'react'
import { Button, TextInput, Divider } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { loginSchema } from '../model/loginSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginWithEmail } from '../model/login'
import { useSearchParams } from 'react-router-dom'
import { IconMail, IconLock, IconEyeOff, IconEye } from '@tabler/icons-react'

// Import PasswordInput directly from the correct path
import { PasswordInput as MantinePasswordInput } from '@mantine/core'

export const LoginForm = ({ auth, onComplete, fail }) => {
  const [loading, setLoading] = React.useState(false)
  const [params, setParams] = useSearchParams()
  const [error, setError] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    values: {
      email: '',
      password: ''
    },
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = data => {
    setLoading(true)
    loginWithEmail(data)
      .then(res => {
        onComplete(res)
        console.log(res);
      })
      .catch(err => {
        setError('Неверные данные')
        console.log(err, 'asd');
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function goToForgotPassword() {
    params.set(auth ? 'agent' : 'user', true)
    params.set('reset', true)
    setParams(params)
  }

  return (
    <div className="p-8 border bg-white shadow-md rounded-2xl max-w-[420px] mx-auto">
      <h1 className="text-center font-black text-2xl text-blue-900 tracking-wide mb-2 select-none">
        Вход в аккаунт
      </h1>
      <Divider my="md" color="blue.3" />
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(auth ? auth : onSubmit)}
        autoComplete="off"
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              type="email"
              icon={<IconMail size={18} stroke={1.7} />}
              placeholder="Ваша почта"
              label="Почта"
              error={errors.email?.message}
              size="md"
              radius="lg"
              classNames={{
                input: 'bg-blue-50/75 font-medium text-[1rem]'
              }}
              disabled={isSubmitting}
              required
              autoFocus
              autoComplete="email"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <MantinePasswordInput
              {...field}
              placeholder="Ваш пароль"
              label="Пароль"
              error={errors.password?.message}
              size="md"
              radius="lg"
              classNames={{
                input: 'bg-blue-50/75 font-medium text-[1rem]'
              }}
              icon={<IconLock size={18} stroke={1.7} />}
              disabled={isSubmitting}
              required
              autoComplete="current-password"
              
              visibilityToggleIcon={() => {
                showPassword ? <IconEyeOff /> : <IconEye />
              }}
              visible={showPassword}
              onVisibilityChange={setShowPassword}
            />
          )}
        />
        {(fail || error) && (
          <div className="transition-all mt-1 text-center text-red-600 bg-red-50 border-l-4 border-red-400 rounded-md px-2 py-1 text-sm font-medium shadow-sm">
            {fail || error}
          </div>
        )}
        <div className="flex items-center justify-between px-1 mt-1">
          <button
            type="button"
            onClick={goToForgotPassword}
            className="text-blue-600 hover:text-blue-800 text-xs font-semibold underline underline-offset-2 transition duration-100"
            tabIndex={0}
          >
            Забыли пароль?
          </button>
        </div>
        <Button
          className="mt-2 rounded-full !bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 font-bold tracking-wide text-lg shadow-lg"
          type="submit"
          fullWidth
          loading={loading}
          color={auth ? 'orange' : 'blue'}
          size="md"
          radius="xl"
          style={{ letterSpacing: '0.02em' }}
        >
          Войти
        </Button>
      </form>
    </div>
  )
}
