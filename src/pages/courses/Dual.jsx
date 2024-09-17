import React from 'react'
import { CourseUsefulFor } from './ui/CourseUsefulFor'
import { CourseHeader } from './ui/CourseHeader'
import { CourseCards } from './ui/CourseCards'
import { WhyOurCourse } from './ui/WhyOurCourse'
import { TeachComfort } from './ui/TeachComfort'
import { pb } from 'shared/api'
import { usePageData } from 'shared/hooks'
import { BsBag, BsFillBagHeartFill } from 'react-icons/bs'
import { Image } from 'shared/ui'
import { Accordion, Button, Modal, Select, TextInput } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useLangContext } from 'app/langContext'
import { useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'

async function getServices () {
  return await pb.collection('dual_data').getFullList()
}

async function getVacas () {
  return await pb.collection('dual_vacas').getFullList()
}

export const Dual = () => {

  const {kz} = useLangContext()

  const {headings, text, images} = usePageData('dual')

  const [opened, handlers] = useDisclosure()

  const [services, setServices] = React.useState([])
  const [vacas, setVacas] = React.useState([])

  const [data, setData] = React.useState({
    email: '',
    phone: '',
    service: ''
  })
  const [d, setD] = React.useState({
    name: '',
    phone: '',
    vaca: ''
  })

  React.useEffect(() => {
    getServices()
    .then(res => {
      setServices(res?.[0]?.services)
    })
    getVacas()
    .then(res => {
      setVacas(res?.[0]?.vacas)
    })
  }, [])

  return (
    <>
      <main className="w-full">
        <CourseHeader headings={headings} text={text} images={images} />

        <section className="w-full mt-5">
          <div className="container">

            <div className="flex flex-col lg:flex-row mt-4 gap-8">
              <Image
                record={images}
                index={9}
                className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
              />

              <div className="w-full lg:text-left text-center">
                <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
                  {headings?.z1}
                </h1>
    
                <ul className="mt-3 text-lg font-medium text-[#5a5959] ">
                  <li>
                    {text?.z1}
                  </li>
                </ul>
                <a href={'/dual-1.pdf'} target='_blank' className='block mt-3'>
                  <Button>
                    АТТЕСТАТ на право подготовки, переподготовки сцециалистов
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <CourseCards headings={headings} text={text} />
        <WhyOurCourse headings={headings} text={text} />
        {/* <CourseUsefulFor /> */}
        <div className="w-full mt-10">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-4">
              <Image
                record={images}
                index={2} 
                className='rounded-primary w-full h-64 max-w-md mx-auto md:max-w-full'
              />
              <Image
                record={images}
                index={3} 
                className='rounded-primary w-full h-64 max-w-md mx-auto md:max-w-full'
              />
              <Image
                record={images}
                index={4} 
                className='rounded-primary w-full h-64 max-w-md mx-auto md:max-w-full'
              />
            </div>
          </div>
        </div>

        <section className="w-full mt-5">
          <div className="container">

            <div className="flex flex-col lg:flex-row mt-4 gap-8">
              <Image
                record={images}
                index={8}
                className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
              />
    
              <div className="w-full lg:text-left text-center">
                <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
                  {headings?.x1}
                </h1>
                <ul className="mt-3 text-lg font-medium text-[#5a5959] ">
                  <li>
                    {text?.x1}
                  </li>
                </ul>
                <a href={'/dual-2.pdf'} target='_blank' className='block mt-3'>
                  <Button>
                    АТТЕСТАТ на право подготовки, переподготовки сцециалистов
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <TeachComfort headings={headings} text={text} />
        <div className="container mt-8">
          <div className='flex justify-center'> 
            <Button
              onClick={() => handlers.open()}
            >
              {kz ? 'Өтініш қалдыру' : `Оставить заявку`}
            </Button>
          </div>
        </div>
        {/* <div className='text-center mt-10'>
          <Link to={'/price'} className='text-blue-500 underline'>
            {kz ? `Бағалар туралы көбірек біліңіз` : `Узнать подробнее о ценах`}
          </Link>
        </div> */}
      </main>

      <section className='container mt-8'>
        <h1 className='font-bold text-4xl text-primary-500 text-center'>Открытые вакансии</h1>
        <Accordion
          variant='separated'
          className='my-10'
          defaultValue='0'
        >
          {vacas?.map((q, i) => {
            return (
              <Accordion.Item value={`${i}`}>
                <Accordion.Control className='!text-xl !font-bold '>{i + 1}. 
                  <span className='text-primary-500'>{q?.name}</span>
                </Accordion.Control>
                <Accordion.Panel className='p-4'>
                  {q?.desc}
                </Accordion.Panel>
              </Accordion.Item>
            )
          })}
        </Accordion>
      </section>

      <section className='max-w-md mx-auto mt-8 border p-4 shadow-lg bg-white'>
          <h1 className='text-center text-xl '>Оставить заявку</h1>
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
            label='Вакансия'
            placeholder='Выберите вид услуги'
            data={vacas?.map(e => {return {label: e?.name, value: e?.name}}) ?? []}
            className='mt-3'
            variant='filled'
            onChange={e => setD({...d, vaca: e})}
          />
          <div className='flex justify-center mt-6'>
            <Button 
              disabled={!d?.name || !d?.phone || !d?.vaca}
              onClick={async () => {
                  await pb.collection('vaca_bids').create({
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
                      vaca: '',
                      phone: ''
                    })
                  })
                }
              }
            >
              Оставить заявку
            </Button>
          </div>
        </section>

      <Modal
        opened={opened}
        onClose={() => handlers.close()}
        centered
        title='Оставить заявку'
      >
        <div>
          <TextInput
            label='Эл. почта'
            value={data?.email}
            onChange={e => setData({...data, email: e?.currentTarget?.value})}
            variant='filled'
          />
          <TextInput
            label='Контактный номер'
            value={data?.phone}
            onChange={e => setData({...data, phone: e?.currentTarget?.value})}
            variant='filled'
          />
          <Select
            label='Выбрать услугу'
            data={services ?? []}
            onChange={(e) => setData({...data, service: e})}
            variant='filled'
            dropdownPosition='bottom'
          />
          <div className='flex justify-center mt-4'>
            <Button
              disabled={!data?.service || !data?.email || !data?.phone}
              onClick={async () => {
                await pb.collection('dual_bids').create({
                  ...data
                })
                .then(() => {
                  handlers.close()
                  showNotification({
                    title: 'Заявка',
                    color: 'green',
                    message: 'Заявка успешно отправлена'
                  })
                  setData({
                    email: '',
                    service: '',
                    phone: ''
                  })
                })
              }}
            >
              Оптравить
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
