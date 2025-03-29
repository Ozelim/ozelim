import React from 'react'
import { Button, Checkbox } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { EmailVerification } from './email-verification'
import { ShopForm } from './shop-form'
import { useSearchParams } from 'react-router-dom'

export const Club = () => {

  const [searchParams] = useSearchParams()

  const [checked, checked_h] = useDisclosure(false)

  const [emailVer, emailVer_h] = useDisclosure(false)

  if (searchParams.get('token')) {
    return <ShopForm />
  }

  if (emailVer) {
    return <EmailVerification />
  }

  return (
    <div className='w-full'>
      <div className="container-market !mt-8">
        <div className='max-w-2xl mx-auto'>
          <p className='cursor-pointer open-sans'>
            Текст для проверки
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium repellendus aspernatur explicabo voluptas, error ea alias reiciendis nobis ipsa reprehenderit? Eum, recusandae dicta? Atque commodi possimus mollitia accusamus, rerum voluptate molestiae cum eius nesciunt harum quia blanditiis quos sapiente maxime eligendi adipisci iste pariatur iure, necessitatibus ut non sit reprehenderit doloremque nihil. Fuga eum cupiditate rerum cumque consectetur iste, placeat delectus. Suscipit expedita saepe ea minus odio nemo dolorem culpa accusamus ut fugit mollitia, enim doloremque quaerat sunt tempore voluptate aut non impedit totam hic rerum odit tenetur facilis. Assumenda velit minima harum repellat, nisi ex placeat sapiente eius doloribus!
          </p>
          <div className='flex justify-center'>
            <Checkbox className='mt-3' checked={checked} onChange={() => checked_h.toggle()} label="I agree to the terms and conditions" />
          </div>
        </div>
        <div className="flex justify-center mt-4 market">
          <Button
            disabled={!checked} 
            onClick={() => emailVer_h.open()}
            variant='light'
          >
            Продолжить
          </Button>
        </div>
      </div>
    </div>
  )
}
