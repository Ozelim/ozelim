import React from 'react'

import { Button, TextInput } from '@mantine/core'
import { instance, pb } from 'shared/api'
import { sha512 } from 'js-sha512'
import zxc from 'crypto-js/sha512' 
import axios from 'axios'
import { useAuth } from 'shared/hooks'

export const Test = () => {

  const { user } = useAuth()

  const [val, setVal] = React.useState({
    order: '',
  })

  async function submit (e) {
    try {
      e.preventDefault()
      const randomNumber = Math.floor(Math.random() * 10000000)
      const token = `01234567890123456789012`

      const data = {
        ORDER: randomNumber,
        AMOUNT: 30000,
        CURRENCY: 'KZT',
        MERCHANT:'TEST_ECOM',
        TERMINAL: 'WEB10004',
        NONCE: randomNumber + 107,
        DESC: 'Оплата',
        CLIENT_ID: user?.id,
        DESC_ORDER: 'Оплата 2',
        EMAIL: user?.email,
        BACKREF: `localhost:4000/verification/${user?.id}`,
        Ucaf_Flag: '',
        Ucaf_Authentication_Data: '',
      }

      const dataString = `${data?.ORDER};${data?.AMOUNT};${data?.CURRENCY};${data?.MERCHANT};${data?.TERMINAL};${data?.NONCE};${data?.CLIENT_ID};${data?.DESC};${data?.DESC_ORDER};${data?.EMAIL};${data?.BACKREF};${data?.Ucaf_Flag};${data?.Ucaf_Authentication_Data};`
      
      console.log(dataString, 'data string');

      const all = token + dataString
      console.log(all, 'all');
      const sign = sha512(all).toString()
      console.log(sign, 'sign');

      await axios.post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/pay`, {
        ...data,
        P_SIGN: sign
      })
      .then(res => {
        const searchParams = new URLSearchParams(JSON.parse(res?.config?.data));
        console.log(res, 'data');
        // console.log(searchParams, 'params');
        // window.location.replace('')
        // console.log(res?.data, 'res');
        const url = `https://ecom.jysanbank.kz/ecom/api?${searchParams}`
        window.location.href = url;
      })

    } catch (err) {
      console.log(err, 'err');
    }
  }

  function handleInputChange (e) {
    const { name, value } = e?.currentTarget
    setVal({...val, [name]: value})
  }

  return (
    <div className='flex justify-center items-center h-full'>
      <form 
        className='container'
        action='https://ecom.jysanbank.kz/ecom/api'
        method='post'
        onSubmit={submit}
      >
        <TextInput
          value={val?.order}
          name='order'
          onChange={handleInputChange}
        />
        <Button
          type='submit'
          // onClick={submit}
        >
          Оплатить
        </Button>
      </form>
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