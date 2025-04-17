import React from 'react'
import { Button, PasswordInput, Select, TextInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams } from 'react-router-dom'
import { companySchema, signupCompany } from './model'
import { regions } from 'shared/lib'
import { pb } from 'shared/api'

export const CompanySignup = () => {

  const [loading, setLoading] = React.useState(false)

  const [params] = useSearchParams()

  const { control, handleSubmit, formState: {errors, isSubmitting} } = useForm({
    values: {
      bin: '',
      name: '',
      phone: '',
      region: '',
      village: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(companySchema) 
  })

  const [error, setError] = React.useState('')

  const onSubmit = async data => {
    try {
      setLoading(true)
      await signupCompany(data)
      .then(async res => {
        console.log('created succ')
        console.log(data?.email, data?.password)
        await pb.collection('agents').authWithPassword(data?.email, data?.password)
        .then(() => {
          navigate('/')
          window.location.reload()
        })
      })
    } catch (error) {
      setError('Неверные данные')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container'>
      <div className='bg-white p-4 shadow-md rounded-primary max-w-sm mx-auto'> 
        <h1 className='text-center font-head text-lg'>Регистрация</h1>
        <form 
          className='grid grid-cols-1 gap-2'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name='bin'
            control={control}
            render={({field}) => (
              <TextInput
                {...field}
                placeholder='БИН'
                label='БИН'
                error={errors.bin?.message}
                variant='filled'
                disabled={isSubmitting}

              />
            )}
          />
          <Controller
            name='name'
            control={control}
            render={({field}) => (
              <TextInput
                {...field}
                placeholder='Наименование организации'
                label='Наименование организации'
                error={errors.name?.message}
                variant='filled'
                disabled={isSubmitting}
              />
            )}
          />
          <Controller
            name='phone'
            control={control}
            render={({field}) => (
              <TextInput
                {...field}
                placeholder='Номер телефона'
                label='Номер телефона'
                error={errors.phone?.message}
                variant='filled'
                disabled={isSubmitting}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
            render={({field}) => (
              <TextInput
                {...field}
                type='email'
                placeholder='Почта'
                label='Почта'
                variant='filled'
                disabled={isSubmitting}
                // onChange={(e) => onChange('email', e.currentTarget.value)}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name='region'
            control={control}
            render={({field}) => (
              <Select
                {...field}
                data={regions}
                placeholder='Область'
                label='Область'
                variant='filled'
                error={errors.region?.message}
                disabled={isSubmitting}
                // onChange={(e) => onChange('region', e)}
              />
            )}
          />
          <Controller
            name='village'
            control={control}
            render={({field}) => (
              <TextInput
                {...field}
                placeholder='Напишите ваш населенный пункт'
                label='Населенный пункт'
                error={errors.village?.message}
                variant='filled'
                disabled={isSubmitting}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            render={({field}) => (
              <PasswordInput
                {...field}
                placeholder='Ваш пароль'
                label='Пароль'
                error={errors.password?.message}
                variant='filled'
                disabled={isSubmitting}
              />
            )}
          />
          {error && (
            <p className='text-red-500 text-sm mt-4'>{error}</p>
          )}
          <Button 
            className='mt-4' 
            type='submit'
            fullWidth
            loading={loading}
          >
            Зарегистрироваться
          </Button> 
        </form>
      </div>
    </div>
  )
}
