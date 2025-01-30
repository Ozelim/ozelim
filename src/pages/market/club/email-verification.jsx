import React from 'react'
import { Button, LoadingOverlay, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { pb } from 'shared/api'

export const EmailVerification = () => {

  const [email, setEmail] = React.useState('')

  const [loading, loading_h] = useDisclosure(false)

  async function sendVerification() {
    loading_h.open()

    const tempPassword = Math.random().toString(36).slice(-8)

    await pb.collection('merchants').create({
      email: email,
      password: tempPassword,
      passwordConfirm: tempPassword,
      emailVisibility: true,
    })
    .then(async res => {
      await pb.collection('merchants').requestVerification(email)
      await pb.collection('merchants').authWithPassword(email, tempPassword)
    })
    .catch(err => {
      console.log(err?.response)
      if (err?.response?.data?.email?.code == "validation_not_unique") {
        // pb.collection('merchants').requestVerification(email)
        console.log('email already exists');
      }
    })
    
    loading_h.close()
  }

  return (
    <div className='w-full h-full'>
      <LoadingOverlay visible={loading}/>
      <div className="container-market !mt-8 market">
        <h1 className='text-2xl text-center'>Подтверждение почты</h1>
        <div className='h-full flex justify-center items-center flex-col mt-4'>
          <div className='max-w-sm flex flex-col items-center gap-3 border p-4 w-full rounded-primary'>
            <TextInput
              variant='filled'
              label='Email'
              className='w-full'
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <Button
              onClick={async () => await sendVerification()}
            >
              Отправить
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
