import React from 'react'

import { Button, TextInput } from '@mantine/core'
import { pb } from 'shared/api'
import axios from 'axios'

export const Test = () => {

  const [val, setVal] = React.useState({
    order: '',
  })

  const [p, setP] = React.useState('')

  async function submit (e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('ORDER', val?.order)
    formData.append('AMOUNT', 666)
    formData.append('CURRENCY', 'KZT')
    formData.append('MERCHANT','ECOM_JYSAN')
    formData.append('DESC','ТЕСТ')
    formData.append('DESC_ORDER', `Какая то перечень херня какая то`)
    formData.append('TERMINAL', 'WEB10004'),
    formData.append('NAME', 'TEST USER')
    formData.append('LANGUAGE','ru')
    formData.append('CLIENT_ID', 69)
    formData.append('crd_pan', '5356 5020 0543 9678')
    formData.append('crd_exp', '04/26')
    formData.append('crd_cvc', 537)
    formData.append('NONCE', '1698922631531')
    formData.append('EMAIL', 'iartichshev@crystalspring.kz')
    formData.append('BACKREF', 'https://www.google.kz')
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

  function handleInputChange (e) {
    const { name, value } = e?.currentTarget
    setVal({...val, [name]: value})
  }

  async function generateP () {
    const inputString = `${val?.order};666;KZT;ECOM_JYSAN;WEB10004;1698922631531;69;ТЕСТ;Какая то перечень херня какая то;https://www.google.kz;`
    const secret = '01234567890123456789012'
  
    const data  = (inputString + secret).toString()
  
    async function sha512(str) {
      return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
        return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
      });
    }
    const sign = await sha512(data) 
    setP(sign)
  }

  return (
    <div className='flex justify-center items-center h-full'>
      <form 
        className='container'
      >
        <TextInput
          value={val?.order}
          name='order'
          onChange={handleInputChange}
        />
        {/* <TextInput
          value={value.card}
        />
        <TextInput
          value={value.term}
        />
        <TextInput
          value={value.cvv}
        /> */}

        <div className='flex gap-4'>
          P_SIGN: 
          {p}
        </div>
        <Button
          onClick={generateP}
        >
          Сгенерировать
        </Button>
        <Button
          onClick={submit}
        >
          Оплатить
        </Button>
      </form>
    </div>
  )
}
