import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { Button, PasswordInput } from '@mantine/core'
import { resetPassword } from '../model/actions'
import * as yup from 'yup'
import { useSearchParams } from 'react-router-dom'

const passwordSchema = yup.object({
  password: yup.string().min(8, "Минимум 8 символов").max(20, "Максимум 20 символов").required("Пароль обязателен для заполнения"),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают')
})

export const NewPassword = () => {

  const [params] = useSearchParams()

  const { control, handleSubmit, setValue, clearErrors, formState: {errors, isSubmitting, isLoading} } = useForm({
    values: {
      password: '',
      password_confirmation: ''
    },
    resolver: yupResolver(passwordSchema) 
  })

  const [err, setErr] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const onSubmit = data => {
    setLoading(true)
    resetPassword(
      params?.get('token'), 
      data?.password, 
      data?.password, 
    )
    .then(res => {
      // onComplete(res)
      console.log(res);
    })
    .catch(err => {
      setErr('Неверные данные')
      console.log(err, 'asd');
    })
    .finally(() => {
      setLoading(false)
    })
  }

  function handleChange (name, val) {
    setValue(name, val)
    clearErrors(name)
    setErr('')
  }

  return (
    <div className='bg-white p-4 shadow-md rounded-primary'> 
      <h1 className='text-center font-head text-lg'>Восстановление пароля</h1>
      <form 
        className='grid grid-cols-1 gap-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name='password'
          control={control}
          render={({field}) => (
            <PasswordInput
              {...field}
              placeholder='******'
              label='Новый пароль'
              error={errors.password?.message}
              variant='filled'
              disabled={isSubmitting}
              onChange={e => handleChange('password', e.currentTarget.value)}
            />
          )}
        />
        <Controller
          name='password_confirmation'
          control={control}
          render={({field}) => (
            <PasswordInput
              {...field}
              placeholder='******'
              label='Подтвердите пароль'
              error={errors.password_confirmation?.message}
              variant='filled'
              disabled={isSubmitting}
              onChange={e => handleChange('password_confirmation', e.currentTarget.value)}
            />
          )}
        />
        {err && (
          <p className='text-red-500 text-sm mt-4'>{err}</p>
        )}
        <Button
          className='mt-4' 
          type='submit'
          fullWidth
          loading={loading}
        >
          Изменить пароль
        </Button>
      </form>
    </div>
  )
}
