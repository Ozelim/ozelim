import React from 'react'

import { Button, TextInput } from '@mantine/core'
import { pb } from 'shared/api'
import axios from 'axios'
import { sha512 } from 'js-sha512'


export const Test = () => {

  const [val, setVal] = React.useState({
    order: '',
  })

  const [p, setP] = React.useState('')

  const data = {
    ORDER: val?.order,
    AMOUNT: 100,
    CURRENCY: 'KZT',
    MERCHANT:'TEST_ECOM',
    TERMINAL: 'WEB100004',
    NONCE: '123456789',
    DESC:'ТЕСТ',
    BACKREF: 'https://www.google.kz',
    P_SIGN: p,
  }

  async function submit (e) {
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



    await axios.post(`https://ecom.jysanbank.kz/ecom/api`, formData, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      }
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
    const inputString = `${val?.order};${data?.AMOUNT};${data?.CURRENCY};${data?.MERCHANT};${data?.TERMINAL};${data?.NONCE};;${data?.DESC};;;${data?.BACKREF};;;`
    const string  = ('01234567890123456789012' + inputString).toString()
 
    const sign = sha512(string).toString()
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
