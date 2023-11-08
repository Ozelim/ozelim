import React from 'react'

import { Button, TextInput } from '@mantine/core'
import { instance, pb } from 'shared/api'
import { sha512 } from 'js-sha512'
import axios from 'axios'


export const Test = () => {

  const [val, setVal] = React.useState({
    order: '',
  })

  const [p, setP] = React.useState('')
        
  const data = {
    ORDER: 357277697,
    AMOUNT: 500,
    CURRENCY: 'KZT',
    MERCHANT:'ECOM_JYSAN',
    TERMINAL: 'WEB00008',
    NONCE: '1699357277697',
    CLIENT_ID: '85201',
    DESC:'test',
    DESC_ORDER:'est_crd_1',
    P_SIGN: `46ce30d0c6bbfc5a7f137691effb5e17d62c8822c70f0c285dc6c18701595f6de900493fe2d568d8664bc135933364a70a47d7b221c9c045c8901916c5626386`,
  }
    

  async function submit (e) {
    try {
        e.preventDefault()
        const formData = new FormData()
        formData.append('ORDER', val?.order)
        formData.append('AMOUNT', data?.AMOUNT)
        formData.append('CURRENCY', data?.CURRENCY)
        formData.append('MERCHANT',data?.MERCHANT)
        formData.append('TERMINAL', data?.TERMINAL)
        formData.append('P_SIGN', p)
        formData.append('DESC', data?.DESC)
        formData.append('BACKREF', data?.BACKREF)
        // formData.append('DESC_ORDER', `Какая то перечень херня какая то`)
        // formData.append('NAME', 'TEST USER')
        // formData.append('LANGUAGE','ru')
        // formData.append('CLIENT_ID', 69)
        // formData.append('crd_pan', '5356 5020 0543 9678')
        // formData.append('crd_exp', '04/26')
        // formData.append('crd_cvc', 537)
        // formData.append('NONCE', '1698922631531')
        // formData.append('EMAIL', 'iartichshev@crystalspring.kz')
    await axios.post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/pay`, data)
    .then(res => {
      console.log(res?.request, 'asd');
      // const searchParams = new URLSearchParams({
      //   ...res?.data?.qdata
      // });
      // console.log(searchParams, 'params');
      // window.location.replace('')
      // window.location.href = `https://ecom.jysanbank.kz/ecom/api/?${searchParams.toString()}`;
      // console.log(res?.data, 'res');
      
      // const url = `https://ecom.jysanbank.kz/ecom/api?ORDER=447135152&AMOUNT=500&CURRENCY=KZT&MERCHANT=ECOM_JYSAN&TERMINAL=WEB00008&LANGUAGE=ru&CLIENT_ID=85201&DESC=test&DESC_ORDER=test_crd_1%0D%0A&NAME=NAME+OF+CLIENT&EMAIL=&BACKREF=&NONCE=1699447135152&Ucaf_Flag=&Ucaf_Authentication_Data=&P_SIGN=8f3c90829305944652f9ae3a824927de72d6e02133bd6bff3055597f21f3f46e6b4f2c007597a8a79913fb441583fb0aa17a19cc5823451561d8df117a9f7a2c`
    })

    } catch (err) {
      console.log(err, 'err');
    }
  }

  function handleInputChange (e) {
    const { name, value } = e?.currentTarget
    setVal({...val, [name]: value})
  }

  async function generateP () {
    const inputString = `${data?.ORDER};${data?.AMOUNT};${data?.CURRENCY};${data?.MERCHANT};${data?.TERMINAL};${data?.NONCE};${data?.CLIENT_ID};${data?.DESC};${data?.DESC_ORDER};;;;;`
    const string  = ('123456789012345678901234567890' + inputString).toString()
 
    const sign = sha512(string).toString()
    setP(sign)
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
        <div className='flex gap-4'>
          P_SIGN: 
          {p}
        </div>
        {/* <Button
          onClick={generateP}
        >
          Сгенерировать
        </Button> */}
        <Button
          type='submit'
          // onClick={submit}
        >
          Оплатить
        </Button>
        <a 
          href={`https://ecom.jysanbank.kz/ecom/api?ORDER=${val?.order}&AMOUNT=${data?.AMOUNT}&CURRENCY=${data?.CURRENCY}&MERCHANT=${data?.MERCHANT}&TERMINAL=${data?.TERMINAL}&DESC=tvari&P_SIGN=${p}`} target='_blank'
          // href='https://ecom.jysanbank.kz/ecom/api?456123567;0.99;EUR;ECOMM002;ECOMM001;1699278365507;12;Cлоны от Мерчанта в ассортименте;1. Печь настольная 2000W ВУ-109 - 1шт2. Робот письменный CВВ22 - 1шт3. Дом нежилой фруктовый инд.050022 - 4 шт.Покупайте наших слонов!;iartichshev@crystalspring.kz;https://www.google.kz/?#q=crystalspring.kz;;;' target='_blank'
        >
          asdasd
        </a>
      </form>
    </div>
  )
}
