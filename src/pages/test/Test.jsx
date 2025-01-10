import React from 'react'

import { Button, TextInput } from '@mantine/core'
import { instance, pb } from 'shared/api'
import { sha512 } from 'js-sha512'
import axios from 'axios'
import { useAuth } from 'shared/hooks'

export const Test = () => {

  const { user } = useAuth()

  const [val, setVal] = React.useState({
    order: '',
  })

  function handleInputChange (e) {
    const { name, value } = e?.currentTarget
    setVal({...val, [name]: value})
  }

  async function submit () {
    await pb.collection('agents').requestPasswordReset('aldiyar1012@gmail.com');
  } 

  return (
    <div className='flex justify-center items-center h-full'>
        {/* <Button
          type='submit'
          onClick={submit}
        >
          Кнопка
        </Button> */}
    </div>
  )
}


// const formData = new FormData()
// formData.append('ORDER', val?.order)
// formData.append('AMOUNT', data?.AMOUNT)
// formData.append('CURRENCY', data?.CURRENCY)
// formData.append('MERCHANT',data?.MERCHANT)
// formData.append('TERMINAL', data?.TERMINAL)
// formData.append('P_SIGN', p)
// formData.append('DESC', data?.DESC)
// formData.append('BACKREF', data?.BACKREF)
// formData.append('DESC_ORDER', `Какая то перечень херня какая то`)
// formData.append('NAME', 'TEST USER')
// formData.append('LANGUAGE','ru')
// formData.append('CLIENT_ID', 69)
// formData.append('crd_pan', '5356 5020 0543 9678')
// formData.append('crd_exp', '04/26')
// formData.append('crd_cvc', 537)
// formData.append('NONCE', '1698922631531')
// formData.append('EMAIL', 'iartichshev@crystalspring.kz')