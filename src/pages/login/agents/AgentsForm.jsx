import React from 'react'
import { Button, PasswordInput, Select, TextInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
// import { loginSchema } from '../model/loginSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useSearchParams } from 'react-router-dom'
import { pb } from 'shared/api'
import { agentSchema, signupAgent } from './model'
import { regions } from 'shared/lib'

export const AgentsForm = ({onComplete}) => {

  const [loading, setLoading] = React.useState(false)

  const [params] = useSearchParams()

  const { control, handleSubmit, formState: {errors, isSubmitting} } = useForm({
    values: {
      iin: '',
      fio: '',
      phone: '',
      region: '',
      village: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(agentSchema) 
  })

  const [error, setError] = React.useState('')

  const onSubmit = async data => {
    setLoading(true)
    await pb.collection('agents').getOne(params.get('agent'))
    .then(sponsor => {
      if (sponsor?.verfied) {        
        signupAgent({
          ...data, 
          passwordConfirm: data?.password,
          sponsor: sponsor?.id
        })
        .then(async res => {
          await pb.collection('agents').update(sponsor?.id, {
            creeps: [...sponsor?.creeps, res?.id]
          })
          await pb.collection('agents').authWithPassword(data?.email, data?.password)
          .then(() => {
            onComplete(res)
          })
        })
        .catch(err => {
          setError('Неверные данные')
        })
        .finally(() => {
          setLoading(false)
        })
      } else {
        signupAgent({
          ...data, 
          passwordConfirm: data?.password,
        })
        .then(async res => {
          await pb.collection('agents').authWithPassword(data?.email, data?.password)
          .then(() => {
            onComplete(res)
          })
        })
        .catch(err => {
          setError('Неверные данные')
        })
        .finally(() => {
          setLoading(false)
        })
      }
    })
    .catch(err => {
      signupAgent({
        ...data, 
        passwordConfirm: data?.password,
      })
      .then(async res => {
        await pb.collection('agents').authWithPassword(data?.email, data?.password)
        .then(() => {
          onComplete(res)
        })
      })
      .catch(err => {
        setError('Неверные данные')
      })
      .finally(() => {
        setLoading(false)
      })
    })
  }

  return (
    <div className='bg-white p-4 shadow-md rounded-primary'> 
      <h1 className='text-center font-head text-lg'>Регистрация</h1>
      <form 
        className='grid grid-cols-1 gap-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name='iin'
          control={control}
          render={({field}) => (
            <TextInput
              {...field}
              placeholder='Ваш ИИН'
              label='ИИН'
              error={errors.iin?.message}
              variant='filled'
              disabled={isSubmitting}

            />
          )}
        />
        <Controller
          name='fio'
          control={control}
          render={({field}) => (
            <TextInput
              {...field}
              placeholder='Имя фамилия отчество'
              label='ФИО'
              error={errors.fio?.message}
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
              placeholder='Ваш номер телефона'
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
              placeholder='Ваша почта'
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
              placeholder='Ваша область'
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
              type='password'
            />
          )}
        />
        {error && (
          <p className='text-red-500 text-sm mt-4'>{error}</p>
        )}
        {/* <Link to={'https://oz-elim.kz/login?reset=true'} className='underline text-gray-500 text-sm mt-4'>Восстановить пароль</Link> */}
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
  )
}
