import React from 'react'

import { Button, TextInput } from '@mantine/core'
import { pb } from 'shared/api'
import axios from 'axios'

export const Test = () => {

  const [value, setValue] = React.useState({})


   // Ваша строка значений полей заказа, к которой добавлен секретный ключ
  const inputString = 'order=1233211234;amount=666;currency=KZT;merchant=TEST_ECOM;terminal=WEB10004;desc=ТЕСТ01234567890123456789012';

  async function sha512(str) {
    return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
      return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
    });
  }
  

  async function submit (e) {
    e.preventDefault()
    const p = await sha512(inputString)
    console.log(p);
    const formData = new FormData()
    formData.append('ORDER',1233211234)
    formData.append('AMOUNT', 'KZT')
    formData.append('CURRENCY',1233211234)
    formData.append('MERCHANT','TEST_ECOM')
    formData.append('DESC','ТЕСТ')
    formData.append('LANGUAGE','ru')
    formData.append('CLIENT_ID', 69)
    formData.append('TERMINAL', 'WEB10004'),
    formData.append('NAME', 'TEST USER')
    formData.append('crd_pan', '4413 2800 4692 5120')
    formData.append('crd_exp', '04/23')
    formData.append('crd_cvc', 618)
    formData.append('NONCE', '1698922631529')
    formData.append('EMAIL', 'iartichshev@crystalspring.kz')
    formData.append('BACKREF', 'https://www.google.kz/#q=crystalspring.kz')
    formData.append('DESC_ORDER', `Какая то перечень херня какая то`)
    formData.append('P_SIGN', p)
    
    await axios.post(`https://ecom.jysanbank.kz/ecom/api`, formData
      // SHARED_SECRET: '',
      // ORDER: 1233211234,
      // AMOUNT: 666,
      // CURRENCY: 'KZT',
      // MERCHANT: 'TEST_ECOM',
      // TERMINAL: 'WEB10004',
      // DESC: 'ТЕСТ',
      // P_SIGN: `ec15a559be256dba0194cc80f92ffaf5e76b72b451aba5ec904ef01c065b5d4df31001fb72b2560b690f2b8c23b2f3547ee00df1df439540f1d5542469088734`
    )
    .then(res => {
      console.log(res, 'res');
    })
    .catch(err => {
      console.log(err, 'err');
    })
  }

  return (
    <div className='flex justify-center items-center h-full'>
      <form 
        className='max-w-sm w-full'
        onSubmit={submit}
      >
        <TextInput
          value={value.card}
        />
        <TextInput
          value={value.term}
        />
        <TextInput
          value={value.cvv}
        />
        <Button
          type='submit'
        >
          Оплатить
        </Button>
      </form>
    </div>
  )
}
