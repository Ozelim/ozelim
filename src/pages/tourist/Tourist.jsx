import React from 'react'
import { Accordion, Button, Modal, Select, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { pb } from 'shared/api'
import { usePageData } from 'shared/hooks'
import { Image } from 'shared/ui'
import { useLangContext } from 'app/langContext'
import { showNotification } from '@mantine/notifications'

async function getRights () {
  return await pb.collection('tourist_data').getFullList()
}

export const Tourist = () => {

  const {headings, text, images} = usePageData('tourist')
  const {kz} = useLangContext()

  const [opened1, handlers1] = useDisclosure()

  const [data, setData] = React.useState({
    name: '',
    phone: '',
  })

  const [types, setTypes] = React.useState([])

  const [type, setType] = React.useState('')

  React.useEffect(() => {
    getRights()
    .then(res => {
      setTypes(res?.[0]?.types)
    })
  }, [])

  async function send () {
    await pb.collection('tourist_bids').create({
      ...data, 
      type: type,
    })
    .then(res => {
      setData({
        name: '',
        phone: '',
      })
      setType('')
      showNotification({
        title: 'Заявка',
        color: 'green',
        message: 'Заявка успешно отправлена'
      })
      handlers1.close()
    })
  }

  return (
    <>
      <div className='w-full'>
        <div className="container">
        <section className="flex flex-col lg:flex-row mt-4 gap-8">
            <Image
              record={images}
              index={1}
              className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
            />

            <div className="w-full lg:text-left text-center">
              <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
                {headings?.q1}
              </h1>

              <ul className="mt-3 text-lg font-medium text-[#5a5959] ">
                <li>
                  {text?.q1}
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className='font-semibold text-[20px] mt-5 text-primary-500'>
              {headings?.q2}
              {/* Lorem, ipsum dolor. */}
            </h2>
            <ul className="space-y-4 px-4 mt-5">
              <li>
                <div className='flex gap-4'>
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-lg text-primary-500">
                    {text?.q2}
                  </p>
                </div>
                <p className="text-left mt-3 text ml-4">{text?.q3} </p>
              </li>
              <li>
                <div className='flex gap-4'>
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-lg text-primary-500">
                    {text?.q4}
                  </p>
                </div>
                <p className="text-left mt-3 text ml-4">{text?.q5} </p>
              </li>
              <li>
                <div className='flex gap-4'>
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-lg text-primary-500">
                    {text?.q6}
                  </p>
                </div>
                <p className="text-left mt-3 text ml-4">{text?.q7} </p>
              </li>
            </ul>
          </section>


          <section className="flex flex-col lg:flex-row mt-4 gap-8">
            <Image
              record={images}
              index={2}
              className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
            />

            <div className="w-full lg:text-left text-center">
              <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
                {headings?.q3}
              </h1>

              <p className="text-xl font-medium mt-3">
                {headings?.q4}
              </p>
              <p className="mt-3 text-lg font-medium">
                {text?.q8}
              </p>
            </div>
            
          </section>

          <section className="w-full mt-5">

              <div className="flex flex-col lg:flex-row mt-4 gap-8">
                <Image
                  record={images}
                  index={3}
                  className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
                />

                <div className="w-full lg:text-left text-center">
                  <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
                    {headings?.q5}
                  </h1>
      
                  <div className="mt-3 text-lg font-medium">
                    {text?.q9}
                  </div>
                </div>
              </div>
          </section>

          <section className="w-full mt-5">
            <div className="container">

              <div className="flex flex-col lg:flex-row mt-4 gap-8">
                <Image
                  record={images}
                  index={4}
                  className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
                />

                <div className="w-full lg:text-left text-center">
                  <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
                    {headings?.q6}
                  </h1>
                  <h1 className="text-xl md:text-2xl font-bold font-head">
                    {headings?.q7}
                  </h1>
      
                  <div className="mt-3 text-lg font-medium">
                    {text?.q10}
                  </div>
                  <div className="mt-3 text-lg font-medium">
                    {text?.q11}
                  </div>
                  <div className="mt-3 text-lg font-medium">
                    {text?.q12}
                  </div>
                  <div className="mt-3 text-lg font-medium">
                    {text?.q13}
                  </div>
                  <div className="mt-3 text-lg font-medium">
                    {text?.q14}
                  </div>
                  <div className="mt-3 text-lg font-medium">
                    {text?.q15}
                  </div>
                  <div className="mt-3 text-lg font-medium">
                    {text?.q16}
                  </div>
                  <div className="mt-3 text-lg font-medium">
                    {text?.q17}
                  </div>
                  <div className="mt-3 text-lg font-medium">
                    {text?.q18}
                  </div>
                  <div className="mt-3 text-lg font-medium">
                    {text?.q19}
                  </div>
                  <div className="mt-3 text-lg font-medium">
                    {text?.q20}
                  </div>
                  <div className="mt-3 text-lg font-medium">
                    {text?.q21} 
                  </div>

                </div>
              </div>
            </div>
          </section>

          <section className='mt-8'>
            <h1 className="text-4xl text-primary-500 font-bold text-center">
              {headings?.q8}
            </h1>
            <Image
              record={images}
              index={5}
              className='mx-auto mt-5 max-w-2xl max-h-[500px]'
            />
          </section>

          <section className='mt-10'>
            <h1 className='font-bold text-4xl text-primary-500 text-center'>
              Услуги
            </h1>
            <Accordion
              variant='separated'
              className='my-10'
              defaultValue='0'
            >
              {types.map((q, i) => {
                return (
                  <Accordion.Item value={`${i}`}>
                    <Accordion.Control className='!text-xl !font-bold '>{i + 1}. 
                      <span className='text-primary-500'>{q?.label}</span>
                    </Accordion.Control>
                    <Accordion.Panel className='p-4'>
                      {q?.description}
                    </Accordion.Panel>
                  </Accordion.Item>
                )
              })}
            </Accordion>
          </section>

          <div className='flex justify-center mt-4'>
            <Button
              onClick={() => handlers1.open()}
            >
              {kz ? 'Өтініш қалдыру' : `Оставить заявку`}
            </Button>
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
          value={data?.name}
          onChange={e => setData({...data, name: e?.currentTarget?.value})}
        />
        <TextInput
          label='Контактный номер'
          placeholder='Ваш номер'
          className='mt-3'
          variant='filled'
          value={data?.phone}
          onChange={e => setData({...data, phone: e?.currentTarget?.value})}
        />
        <Select
          label='Вид услуги'
          placeholder='Выберите вид услуги'
          data={[...types?.map(q => { return {label: q?.label, value: q?.label}})] ?? []}
          className='mt-3'
          variant='filled'
          onChange={e => setType(e)}
        />
        <div className='flex justify-center mt-6'>
          <Button 
            disabled={!data?.name || !data?.phone || !type}
            onClick={send}
          >
            Оставить заявку
          </Button>
        </div>
      </section>
      </Modal>
    </>
  )
}