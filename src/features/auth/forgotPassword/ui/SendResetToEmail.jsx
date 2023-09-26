import React from 'react'
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { sendPasswordReset } from '../model/actions'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const emailSchema = yup.object({
  email: yup.string().email("Неверный формат почты").required("Заполните данное поле"),
})

export const SendResetToEmail = () => {

  const { control, handleSubmit, clearErrors, getValues, setError, setValue, formState: {errors, isSubmitting, isLoading} } = useForm({
    values: {
      email: '',
    },
    resolver: yupResolver(emailSchema) 
  })

  const [sended, setSended] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const [err, setErr] = React.useState('')

  const onSubmit = data => {
    setLoading(true)
    sendPasswordReset(data?.email)
    .then(res => {
      console.log(res, 'res');
      // onComplete(res)
      setSended(true)
    })
    .catch(err => {
      setErr('Неверные данные')
      console.log(err?.response, 'asd');
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

  if (sended) return (
    <div className='h-full flex justify-center items-center'>
      <div className='bg-white p-4 shadow-md  rounded-primary '> 
        <p>Письмо с восстановлием было отправлено на почту {getValues('email')}</p>
      </div>
    </div>
  )

  return (
    <div className='bg-white p-4 shadow-md rounded-primary'> 
      <h1 className='text-center font-head text-lg'>Вход</h1>
      <form 
        className='grid grid-cols-1 gap-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name='email'
          control={control}
          render={({field}) => (
            <TextInput
              {...field}
              type='email'
              placeholder='Ваша почта'
              label='Почта'
              error={errors.email?.message}
              variant='filled'
              disabled={isSubmitting}
              onChange={(e) => handleChange('email', e.currentTarget.value)}
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
          Восстановить
        </Button>
      </form>
  </div>
  )
}
