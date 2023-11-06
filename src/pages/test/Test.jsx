import React from 'react'

import { Button, TextInput } from '@mantine/core'
import { pb } from 'shared/api'
import axios from 'axios'

import qs from 'qs'

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

    const data = {
      ORDER: val?.order,
      AMOUNT: 666,
      CURRENCY: 'KZT',
      MERCHANT:'ECOM_JYSAN',
      DESC:'ТЕСТ',
      DESC_ORDER: `Какая то перечень херня какая то`,
      TERMINAL: 'WEB10004',
      NAME: 'TEST USER',
      LANGUAGE:'ru',
      CLIENT_ID: 69,
      crd_pan: '5356 5020 0543 9678',
      crd_exp: '04/26',
      crd_cvc: 537,
      NONCE: '1698922631531',
      EMAIL: 'iartichshev@crystalspring.kz',
      BACKREF: 'https://www.google.kz',
      P_SIGN: p,
    }

    const options = {
      method: 'POST',
      headers: {
      },
      data: qs.stringify(data),
    }
    
    await axios({
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': 'https://oz-elim.kz',
      },
      // data: data,
      url: `https://ecom.jysanbank.kz/ecom/api?ORDER=${val?.order}&AMOUNT=666&CURRENCY=KZT&MERCHANT=ECOM_JYSAN&TERMINAL=WEB00008&LANGUAGE=ru&CLIENT_ID=85201&DESC=test&DESC_ORDER=test_crd_1%0D%0A&NAME=NAME+OF+CLIENT&EMAIL=&BACKREF=&NONCE=1699007797058&Ucaf_Flag=&Ucaf_Authentication_Data=&P_SIGN=5a80185aa02a04791e74e98770f00807d463098f2a78d73e1bf12b917792b1afc2f4c5faed4af5d355a2d45e5b828c614feb8b7d503ed009689498ed934b0a9c`
    })
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
