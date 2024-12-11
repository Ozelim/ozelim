import React from 'react'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { useLangContext } from 'app/langContext'
import { usePageData } from 'shared/hooks'
import { Image } from 'shared/ui'
import fund1 from 'shared/assets/images/fund-01.png'
import fund2 from 'shared/assets/images/fund-37.png'
import { Button, Modal, Select, TextInput } from '@mantine/core'
import { pb } from 'shared/api'
import { showNotification } from '@mantine/notifications'

async function getFundData () {
  return await pb.collection('fund_data').getFullList()
}

export const Fund = () => {

  const { headings, images, text } = usePageData('fund')

  const [r, setR] = React.useState({})

  React.useEffect(() => {
    getFundData()
    .then(res => {
      setR(res?.[0])
    })
  }, [])

  const matches = useMediaQuery(`(min-width: 767px)`)

  const { qq, kz } = useLangContext()

  const [opened1, handlers1] = useDisclosure()

  const [d, setD] = React.useState({
    name: '',
    phone: '',
    service: ''
  })

  return (
    <>
      <div className='w-full'>
        <div className="container">
          <div className="w-full">

            <section className="w-full mt-4">
              <h1 className="text-4xl text-primary-500 font-bold">
                Эндаумент фонд
              </h1>
              <div className='flex flex-col md:flex-row gap-8 mt-6'>
                <Image
                  className="max-w-2xl w-full rounded-primary max-h-80 object-cover"
                  record={images}
                  index={1}
                />
                <div>
                  <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                    {text?.text1}

                    <a href={'/fund-ustav.pdf'} target='_blank'>
                      <Button className='mt-4'>
                        Устав Фонда
                      </Button>
                    </a>
                  </ul>

                  
                </div>
              </div>
            </section>

            <section className="mt-10 lg:mt-16">
              <div className="text-center">
                <h1 className="text-4xl font-medium text-primary-500">
                  {headings?.heading1} 
                </h1>
                <div className='grid gap-8 mt-5 max-w-3xl mx-auto'>
                  <p className="text text-left">{text?.text2}</p>
                </div>
              </div>
            </section>

            {/* <section className='mt-6 text-center'>
              <h2 className='font-semibold text-[20px]'>
                Документы фонда
              </h2>
              <p className='underline cursor-pointer text-primary-500' onClick={matches ? open : () => {}}>
                {matches 
                  ? qq(`Справка о гос.регистрации фонда, Устав фонда`, `Мемлекеттік тіркеу куәлік`)
                  : <a href={'/policynew.pdf'} target='_blank'>
                      {qq(`Справка о гос.регистрации фонда, Устав фонда`, `Мемлекеттік тіркеу куәлік`)}
                    </a>
                }
              </p>
            </section> */}

            <section className="mt-10 lg:mt-16">
              <div className="text-center">
                <h1 className="text-4xl font-medium text-primary-500">
                  {headings?.heading3} 
                </h1>
                <div className='grid gap-8 mt-5 max-w-3xl mx-auto'>
                  <p className="tracking-wider text-left underline text-primary-500 text-xl">{text?.text3}</p>
                </div>
              </div>
              <div className='grid lg:grid-cols-3 mt-4 gap-4'>
                <Image
                  record={images}
                  index={2}
                  className="max-w-[350px] w-full m-auto h-full max-h-64 rounded-primary object-cover"
                />
                <Image
                  record={images}
                  index={3}
                  className="max-w-[350px] w-full m-auto h-full max-h-64 rounded-primary object-cover"
                />
                <Image
                  record={images}
                  index={4}
                  className="max-w-[350px] w-full m-auto h-full max-h-64 rounded-primary object-cover"
                />
              </div>
            </section>
            
            <section className='mt-8'>
              <h1 className="text-4xl font-medium text-primary-500 my-4">
                {headings?.heading4} 
              </h1>
              <ul className="space-y-4 px-4">
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">
                    {text?.text4}

                  </p>
                </li>
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
              </ul>
            </section>

            <section className='w-full pt-10'>
              <h1 className='heading text-primary-500 '>{headings?.heading5}</h1>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
                <div>
                  <h2 className='md:text-2xl lg:text-4xl text-primary-500 border-b-4 border-black pb-2 md:pb-4 font-bold'>
                    {headings?.heading6}
                  </h2>
                  <p className='mt-2 md:mt-4 text text-xl'>
                    {text?.text8}
                  </p>
                </div>
                <div>
                  <h2 className='md:text-2xl lg:text-4xl text-primary-500 border-b-4 border-black pb-2 md:pb-4 font-bold'>
                    {headings?.heading7}
                  </h2>
                  <p className='mt-2 md:mt-4 text text-xl'>
                    {text?.text9}
                  </p>
                </div>
                <div>
                  <h2 className='md:text-2xl lg:text-4xl text-primary-500 border-b-4 border-black pb-2 md:pb-4 font-bold'>
                    {headings?.heading8}
                  </h2>
                  <p className='mt-2 md:mt-4 text text-xl'>
                    {text?.text10}
                  </p>
                </div>
              </div>
            </section>

            <section className="w-full mt-8">
              <h1 className="text-4xl text-primary-500 font-bold">
                {headings?.heading9}
              </h1>
              <div className='flex flex-col md:flex-row gap-8 mt-6'>
                <Image
                  className="max-w-2xl w-full rounded-primary max-h-80 object-cover"
                  record={images}
                  index={5}
                />
                <div className='flex flex-col'>
                  <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                    {text?.text11}
                  </ul>
                  <a href={'/fund-1-2.pdf'} target='_blank'>
                    <Button className='mt-4'>
                      Свидетельство о авторском праве
                    </Button>
                  </a>
                  <a href={'/fund-3-37.pdf'} target='_blank'>
                    <Button className='mt-4'>
                    ⁠Авторская система создания и управления Эндаумент фондами в Казахстане
                    </Button>
                  </a>
                </div>
              </div>
            </section>

            <section className="mt-10 lg:mt-16">
              {/* <div className='text-center'>
                  <h2 className='text-slate-400 text-[14px]'>
                    Документы
                  </h2>
                <img src={'/fund1.png'} alt="" />
                <p className='underline cursor-pointer text-primary-500'>
                  <div className='flex gap-4 flex-wrap my-3'>
                    <img src={fund1} alt="" className='max-w-[280px] mx-auto'/>
                  </div>

                </p>
              </div> */}
              <div>
                <h1 className="text-4xl font-medium text-primary-500 text-center">
                  {headings?.heading99} 
                </h1>

                <ul className="space-y-4 mt-5">
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">
                      {text?.text991}
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">
                      {text?.text992}
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">
                      {text?.text993}
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">
                      {text?.text994}
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">
                      {text?.text995}
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">
                      {text?.text996}
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">
                      {text?.text997}
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">
                      {text?.text998}
                    </p>
                  </li>
                </ul>
              </div>
            </section>


            <section className='mt-8'>
              <h1 className="text-4xl text-primary-500 font-bold text-center">
                {headings?.heading10}
              </h1>
              <div className='flex flex-col md:flex-row gap-8 mt-6'>
                <Image
                  className="max-w-2xl w-full rounded-primary max-h-80 object-cover"
                  record={images}
                  index={6}
                />
                <div>
                  <h2 className='font-semibold text-[20px] text-primary-500'>
                    {headings?.heading11}
                  </h2>
                  <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                    {text?.text12}
                  </ul>
                  <div className="flex mt-4">
                  <Button
                    onClick={() => handlers1.open()}
                  >
                    {kz ? 'Өтініш қалдыру' : `Оставить заявку`}
                  </Button>
                  </div>
                </div>
              </div>
            </section>
            
          </div>
        </div>
      </div>

      <Modal
        opened={opened1}
        onClose={() => handlers1.close()}
        centered
        title='Оставить заявку'
      >
        <section className='max-w-md mx-auto border px-4 pb-4 shadow-lg bg-white'>
          <TextInput
            label='Имя'
            placeholder='Ваше имя'
            className='mt-3'
            variant='filled'
            value={d?.name}
            onChange={e => setD({...d, name: e?.currentTarget?.value})}
          />
          <TextInput
            label='Контактный номер'
            placeholder='Ваш номер'
            className='mt-3'
            variant='filled'
            value={d?.phone}
            onChange={e => setD({...d, phone: e?.currentTarget?.value})}
          />
          <Select
            label='Услуга'
            placeholder='Выберите услугу'
            data={r?.services?.map(e => {return {label: e, value: e}}) ?? []}
            className='mt-3'
            variant='filled'
            onChange={e => setD({...d, service: e})}
          />
          <div className='flex justify-center mt-6'>
            <Button 
              disabled={!d?.name || !d?.phone}
              onClick={async () => {
                  await pb.collection('fund_bids').create({
                    ...d
                  })
                  .then(() => {
                    showNotification({
                      title: 'Заявка',
                      color: 'green',
                      message: 'Заявка успешно отправлена'
                    })
                    setD({
                      name: '',
                      phone: '',
                    })
                    handlers1.close()
                  })
                }
              }
            >
              Оставить заявку
            </Button>
          </div>
        </section>
      </Modal>
    </>
  )
}
