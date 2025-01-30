import React from 'react'
import { Button, CloseButton, FileButton, Text, Textarea, TextInput } from '@mantine/core'
import { useSearchParams } from 'react-router-dom'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { compress } from 'shared/lib'
import { randomId } from '@mantine/hooks'

async function verifyEmail(token) {
  return await pb.collection('merchants').confirmVerification(token)
}

const shopSchema = yup.object({
  phone: yup.string().required('Телефон обязателен для заполнения'),
  address: yup.string().required('Адрес обязателен для заполнения'),
  desc: yup.string().required('Описание обязательно для заполнения'),
  name: yup.string().required('Название обязательно для заполнения'),
})

export const ShopForm = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const {user} = useAuth()

  const token = searchParams.get('token')

  const { control, handleSubmit, clearErrors, getValues, setError, setValue, formState: {errors, isSubmitting, isLoading} } = useForm({
    values: {
      phone: '',
      address: '',
      desc: '',
      name: '',
    },
    resolver: yupResolver(shopSchema) 
  })

  const [files, setFiles] = React.useState([])

  function handleFiles (file) {
    console.log(file, 'a');
    
    setFiles([...files, file])
  }

  function handleFileRemove (file) {
    const newFiles = files.filter(f => f !== file)
    setFiles(newFiles)
  }

  async function verify () {
    if (user?.verified) return
    await verifyEmail(token)
    .then(res => {
      console.log(res)
    })
  }

  async function submit () {

    const formData = new FormData()

    const createdMarket = await pb.collection('markets').create({
      ...getValues(),
      merchant: user?.id,
      status: 'created',
    })

    for (let f of files) {
      const file = new File([f], randomId().replace('mantine-', ''))
      formData.append(`docs`, file)
    }

    await pb.collection('markets').update(createdMarket?.id, formData)
  }

  function handleChange (name, val) {
    setValue(name, val)
    clearErrors(name)
    // setErr('')
  }

  React.useEffect(() => {
    verify()
  }, [])

  return (
    <div className='w-full h-full'>
      <div className="container-market !mt-8 market">
        <h1 className='text-2xl text-center'>Форма магазина</h1>
        <div className='h-full flex justify-center items-center flex-col mt-4'>
          <form 
            className='max-w-sm flex flex-col items-center gap-3 border p-4 w-full rounded-primary'
            onSubmit={handleSubmit(submit)}
          >
            <TextInput
              value={user?.email ?? ''}
              readOnly
              label='Email'
              variant='filled'
              className='w-full'
            />
            <Controller
              name='name'
              control={control}
              render={({field}) => (
                <TextInput
                  {...field}
                  label='Название магазина'
                  variant='filled'
                  className='w-full'
                  error={errors.name?.message}
                  onChange={e => handleChange('name', e.currentTarget.value)}
                />
              )}
            />
            <Controller
              name='phone'
              control={control}
              render={({field}) => (
                <TextInput
                  {...field}
                  label='Контактный телефон'
                  variant='filled'
                  className='w-full'
                  error={errors.phone?.message}
                  onChange={e => handleChange('phone', e.currentTarget.value)}
                />
              )}
            />
            <Controller
              name='address'
              control={control}
              render={({field}) => (
                <TextInput
                  {...field}
                  label='Адрес'
                  variant='filled'
                  className='w-full'
                  error={errors.address?.message}
                  onChange={e => handleChange('address', e.currentTarget.value)}
                />
              )}
            />
            <Controller
              name='desc'
              control={control}
              render={({field}) => (
                <Textarea
                  {...field}
                  label='Описание магазина'
                  variant='filled'
                  className='w-full'
                  error={errors.desc?.message}
                  onChange={e => handleChange('desc', e.currentTarget.value)}
                />
              )}
            />
            <div className='w-full'>
              <div className='flex justify-center mt-2'>
                <FileButton onChange={handleFiles} accept="image/png,image/jpeg" variant='outline' compact>
                  {(props) => <Button {...props}>Загрузить документ</Button>}
                </FileButton>
              </div>
              <div className='flex flex-col gap-2 mt-3 w-full'>
                {files?.map((file, i) => ( 
                  <div className='flex justify-between gap-2' key={i}> 
                    <Text color='gray.6' lineClamp={1} key={i}>{file?.name}</Text>
                    <CloseButton onClick={() => handleFileRemove(file)}/>
                  </div>
                ))}
              </div>
            </div>
            <Button
              type='submit'
            >
              Создать мазагин
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
