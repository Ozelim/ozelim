import { Button, Select, TextInput } from '@mantine/core'
import React from 'react'
import { pb } from 'shared/api'
import { usePageData } from 'shared/hooks'
import { Image } from 'shared/ui'

async function getRights () {
  return await pb.collection('rights_data').getFullList()
}

export const Rights = () => {

  const {headings, text, images} = usePageData('rights')

  const [types, setTypes] = React.useState([])

  const [type, setType] = React.useState('')

  React.useEffect(() => {
    getRights()
    .then(res => {
      setTypes(res?.[0]?.types)
    })
  }, [])

  const [data, setData] = React.useState({
    name: '',
    phone: '',
    type
  })

  async function send () {
    console.log(data, 'a');
    await pb.collection('righs_bids').create(...data)
    .then(res => {
      setData({
        name: '',
        phone: '',
        type: ''
      })
      showNotification({
        title: 'Заявка',
        color: 'green',
        message: 'Заявка успешно отправлена'
      })
    })
  }

  return (
    <div className='w-full'>
      <div className="container">

        <div className="grid lg:grid-cols-2 mt-6 gap-10">
          <div>
            <Image
              record={images}
              index={1}
              className="w-full max-w-[400px] mx-auto max-h-[400px] rounded-primary object-cover object-top"
            />
            <h2 className="text-center pt-2 font-head text-2xl px-6 ">
              {headings?.heading1}
            </h2>
            <p className="px-4 text-center text">
              {text?.text1}
            </p>
            <div className='text-center'>
              <a href={headings?.link} target="_blank" className="underline text-blue-300">
                Перейти по ссылке
              </a>
            </div>
            {/* <p className='mt-2 text-lg text-center'>{headings?.name}</p> */}
          </div>
          <div>
            <h1 className="text-2xl lg:text-4xl font-semibold font-head text-teal-500">
              {headings?.heading2}
            </h1>
            <p className="text mt-5">
              {text?.text2}
            </p>
            {/* <ul className="space-y-4 mt-8">
              <li className="flex gap-4">
                <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
              </li>
              <li className="flex gap-4">
                <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                <p className="text">
                  {text?.text3}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, enim!
                </p>
              </li>
              <li className="flex gap-4">
                <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                <p className="text">
                  {text?.text4}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, enim!
                </p>
              </li>
              <li className="flex gap-4">
                <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
              <p className="text">
                  {text?.text5}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, enim!
                </p>
              </li>
            </ul> */}
          </div>
        </div>

        <section className="w-full mt-4">
          <h1 className="text-4xl text-primary-500 font-bold">
            {headings?.heading3}
          </h1>
          <div className='flex flex-col md:flex-row gap-8 mt-6'>
            <Image
              className="max-w-2xl w-full rounded-primary max-h-80 object-cover"
              record={images}
              index={2}
            />
            <div>
              <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                {text?.text3}
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, veniam. */}
              </ul>
            </div>
          </div>
        </section>

        <div className='grid gap-8 mt-5 max-w-3xl mx-auto'>
          <p className="text-left">{text?.text4} </p>
        </div>

        <div>
          <h2 className='font-semibold text-[20px] mt-5'>
            {headings?.heading4}
            {/* Lorem, ipsum dolor. */}
          </h2>
          <ul className="space-y-4 px-4 mt-5">
            <li className="flex gap-4">
              <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
              <p className="text">
                {text?.text5}
              </p>
            </li>
            <li className="flex gap-4">
              <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
              <p className="text">
                {text?.text6}
              </p>
            </li>
            <li className="flex gap-4">
              <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
              <p className="text">
                {text?.text7}
              </p>
            </li>
            <li className="flex gap-4">
              <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
              <p className="text">
                {text?.text8}
              </p>
            </li>
            <li className="flex gap-4">
              <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
              <p className="text">
                {text?.text9}
              </p>
            </li>
          </ul>
        </div>

        <section className="w-full mt-4">
          <h1 className="text-4xl text-primary-500 font-bold">
          {headings?.heading5}
          </h1>
          <div className='flex flex-col md:flex-row gap-8 mt-6'>
            <Image
              className="max-w-2xl w-full rounded-primary max-h-80 object-cover"
              record={images}
              index={3}
            />
            <div>
              <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                {text?.text10}
              </ul>
            </div>
          </div>
        </section>

        <section className='max-w-md mx-auto mt-8 border p-4 shadow-lg bg-white'>
          <h1 className='text-center text-xl '>Оставить заявку</h1>
          <TextInput
            label='Имя'
            placeholder='Ваше имя'
            className='mt-3'
            variant='filled'
          />
          <TextInput
            label='Контактный номер'
            placeholder='Ваш номер'
            className='mt-3'
            variant='filled'
          />
          <Select
            label='Вид услуги'
            placeholder='Выберите вид услуги'
            data={[]}
            className='mt-3'
            variant='filled'
          />
          <div className='flex justify-center mt-6'>
            <Button 
              disabled
              onClick={send}
            >
              Оставить заявку
            </Button>
          </div>
        </section>

      </div>
    </div>
  )
}