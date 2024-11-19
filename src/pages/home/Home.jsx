import React from 'react'
import { pb } from 'shared/api'
import { useLangContext } from 'app/langContext'
import { Image } from 'shared/ui'
import { usePageData } from 'shared/hooks'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Button, Modal, Select, TextInput } from '@mantine/core'
import { AiOutlineInstagram, AiOutlineYoutube } from 'react-icons/ai'
import { RiTiktokFill } from 'react-icons/ri'
import Kazmap from 'shared/assets/images/hero.jpg'

async function getServices() {
  return await pb.collection('home_data').getFullList()
}

export const Home = () => {

  const {kz, qq} = useLangContext()

  const { headings, images, text } = usePageData('home')

  const matches = useMediaQuery(`(min-width: 767px)`)

  const [services, setServices] = React.useState({})

  React.useEffect(() => {
    getServices()
    .then(res => {
      setServices(res?.[0])
    })
  }, [])

  const [opened, handlers] = useDisclosure(false)

  const [q, setQ] = React.useState({
    name: '',
    email: '',
    phone: '',
    service: ''
  })

  return (
    <>
      {/* <Franchise /> */}
      <div className="w-full">
        <div className="container">
          <div>
            <img
              src={Kazmap}
              alt=""
              className="max-w-full mx-auto lg:mx-0 rounded-r-primary object-cove"
            />
            <div className='text-center py-8'>
              <p className="text-2xl lg:text-4xl mt-2 text-primary-500">
                {qq(headings?.main, headings?.main2_kz)}
              </p>
              <p className="mt-5 text-xl lg:text-2xl">
                {qq(headings?.main2, headings?.main2_kz)}
              </p>
              {/* <Button component={RouterLink} to="/resorts" size="md" className='mt-4'>
                {qq(`Сотрудничество`, `Серiктестiк`)}
              </Button> */}
            </div>

          </div>
        </div>
      </div>

      <div className="container mt-8">

        <h1 className='heading text-primary-500 '>
          {headings?.[1]}
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 '>
          <div>
            <Image
              record={images}
              index={1}
              className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
            />

            <p className='mt-2 md:mt-4 text text-xl'>
              {text?.[1]}
            </p>
          </div>
          <div>
            <Image
              record={images}
              index={2}
              className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
            />
            <p className='mt-2 md:mt-4 text text-xl'>
              {text?.[2]}
            </p>
          </div>
          <div>
            <Image
              record={images}
              index={3}
              className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
            />

            <p className='mt-2 md:mt-4 text text-xl'>
              {text?.[3]}
            </p>
          </div>
        </div>
      </div>

      {/* <section className='mt-6 text-center container'>
        <h2 className='font-semibold text-[20px]'>
          Документы Ассоциации
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
      
      <section className='mt-8 container'>
        <div className=" mt-4 gap-8 flex items-center flex-col">
        <h1 className="text-center text-2xl md:text-3xl font-bold font-head text-teal-500 flex justify-center items-center h-full">
            {headings?.[2]}
          </h1>
          <Image
            record={images}
            index={4}
            className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
          />
          {/* {getImageUrl(images, images?.[1]) ? (
            <img
              className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0"
              src={getImageUrl(images, images?.[1])}
              loading="lazy"
              alt="travel"
            />
          ) : (
            <div className="lg:max-w-xl w-full m-auto bg-zinc-200" />
          )} */}

        </div>
        <div className="grid lg:grid-cols-5 gap-6 mt-8">
          <div>
            <h2 className='text-2xl text-primary-500'>{headings?.z1}</h2>
            <p className='mt-2 border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>
              {text?.[4]}
            </p>
          </div>
          <div>
            <h2 className='text-2xl text-primary-500'>{headings?.z2}</h2>
            <p className='mt-2 border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>
              {text?.[5]}
            </p>
          </div>
          <div>
            <h2 className='text-2xl text-primary-500'>{headings?.z3}</h2>
            <p className='mt-2 border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>
              {text?.[6]}
            </p>
          </div>
          <div>
            <h2 className='text-2xl text-primary-500'>{headings?.z4}</h2>
            <p className='mt-2 border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>
              {text?.[7]}
            </p>
          </div>
          <div>
            <h2 className='text-2xl text-primary-500'>{headings?.z5}</h2>
            <p className='mt-2 border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>
              {text?.[8]}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full mt-6 lg:mt-10 container">
        <h1 className="text-4xl text-primary-500 font-bold">
          {headings?.[3]}
          {/* Руководитель Ассоциации туристов Казахстана */}
        </h1>
        <div className='flex flex-col md:flex-row gap-8 mt-5'>
          <Image
            className="max-w-2xl w-full rounded-primary max-h-80 object-cover"
            record={images}
            index={5}
          />
          <div>
            <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
              <li>• {text?.[9]}</li>
              <li>• {text?.[10]}</li>
              <li>• {text?.[11]}</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="w-full mt-8">
        <div className="container">
          {/* <h1 className="text-3xl max-w-3xl m-auto font-bold text-center font-head">
            <span className="text-primary-500">{headings?.heading}</span>
          </h1> */}
          <div className="flex flex-col lg:flex-row mt-4 gap-8">
            <Image
              record={images}
              index={9}
              className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
            />
            {/* {getImageUrl(images, images?.[1]) ? (
              <img
                className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0"
                src={getImageUrl(images, images?.[1])}
                loading="lazy"
                alt="travel"
              />
            ) : (
              <div className="lg:max-w-xl w-full m-auto bg-zinc-200" />
            )} */}
            <div className="w-full lg:text-left text-center">
              <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
                {headings?.x1}
              </h1>
              {/* <img
                className="max-w-2xl w-full block lg:hidden mt-4"
                src={FitnessIcon}
                alt="fitness"
              /> */}
              <ul className="mt-3 text-lg font-medium text-[#5a5959] ">
                <li>
                  {text?.x1}
                </li>
              </ul>
              <Button className='mt-4'>
                <a href={'/home-1.pdf'} target='_blank'>
                  {qq(`Справка о Гос. Регистрации`)}
                </a>
              </Button>
              <div>
                  <a href={'/ustav.pdf'} target='_blank'>
                    <Button className='mt-4'>
                     Устав Ассоциации туристов Казахстана "Oz Elim"
                    </Button>
                  </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className='mt-6 lg:mt-10 container'>
        <Image
          className="max-w-2xl w-full rounded-primary max-h-80 object-cover mx-auto"
          record={images}
          index={6}
        />
        <div className="grid lg:grid-cols-5 gap-6 lg:mt-8">
          <p className=' border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>
            {text?.[12]}
          </p>
          <p className=' border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>
            {text?.[13]}
          </p>
          <p className=' border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>
            {text?.[14]}
          </p>
          <p className=' border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>
            {text?.[15]}
          </p>
          <p className=' border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>
            {text?.[16]}
          </p>
        </div>
      </section> */}
      
      <section className='mt-10 container'>
        <h1 className="text-3xl lg:text-4xl font-bold mt-1 text-primary-500">
          {headings?.[4]}
        </h1>
        <p>
          {headings?.[5]}
        </p>
        <div className="grid lg:grid-cols-3 gap-6 mt-4">
          <p className=' border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>{text?.[17]}</p>
          <p className=' border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>{text?.[18]}</p>
          <p className=' border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>{text?.[19]}</p>
        </div>
        <div className='flex flex-col justify-center items-center mt-8'>
          {/* <Button>
            Оставить заявку
          </Button> */}
          <p className='text-2xl text-primary-500'>
            {headings?.[6]}
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6 mt-4">
          <p className=' border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>{text?.[20]}</p>
          <p className=' border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>{text?.[21]}</p>
          <p className=' border p-4 shadow-lg rounded-primary bg-white text-slate-500 tracking-wider '>{text?.[22]}</p>
        </div>
        <div className='grid lg:grid-cols-3 gap-6 mt-4'>
          <p className='underline cursor-pointer text-primary-500'>
            <a href={'/home-11.pdf'} target='_blank'>
              Положение о членстве в Ассоциации
            </a>
          </p>
          <p className='underline cursor-pointer text-primary-500'>
            <a href={'/home-2.pdf'} target='_blank'>
              Договор о членстве в Ассоциации
            </a>
          </p>
          <p className='underline cursor-pointer text-primary-500'>
              <a href={'/home-3.pdf'} target='_blank'>
                Заявление на вступление в Ассоциацию
              </a>
          </p>
        </div>
        <div className='flex flex-col justify-center items-center mt-8'>
          <Button onClick={() => handlers.open()}>
            Оставить заявку
          </Button>
        </div>
        <div className='text-center mt-8'>
          <h1 className="text-3xl lg:text-4xl font-bold mt-1 text-primary-500">
            {headings?.[7]}
          </h1>
          <p className="text-[#888888] text">
            {text?.[23]}
          </p>
        </div>
      </section>
      <section className="mt-10 lg:mt-24">
        <div className="container">
          <div className="text-center">
            {/* <h1 className="text-4xl font-medium text-primary-500">
              {headings?.[4]} 
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h1> */}
            <div className='grid gap-8 mt-5 max-w-3xl mx-auto'>
              <p className="text text-left">{text?.[24]}</p>
            </div>
            <div className="flex justify-center items-center gap-10 mt-6">
              <a 
                target='_blank'
                href="https://www.instagram.com/oz_elim_kaz?igsh=MTBlbHc0YjJrZTU0cw=="
              >
                <div className="border border-solid border-gray-300 rounded-full p-4 md:p-7 hover:bg-teal-600 transition-all ">
                  <AiOutlineInstagram className="text-4xl md:text-7xl flex-shrink-0 text-[#ee2a7b]" />
                </div>
                <p className="text-primary-600 mt-2">Instagram</p>
              </a>
              <a 
                target='_blank'
                href="https://wa.me/77470512252"
              >
                <div className="border border-solid border-gray-300 rounded-full p-4 md:p-7 hover:bg-teal-600 transition-all ">
                  <RiTiktokFill className="text-4xl md:text-7xl flex-shrink-0 text-black hover:text-white" />
                </div>
                <p className="text-primary-600 mt-2">TikTok</p>
              </a>
              <a  
                href="https://www.youtube.com/channel/UCOm22rq5ELyWBJWNImiv3Ww"
                target='_blank'
              >
                <div className="border border-solid border-gray-300 rounded-full p-4 md:p-7 hover:bg-teal-600 transition-all ">
                  <AiOutlineYoutube className="text-4xl md:text-7xl flex-shrink-0 text-red-600 hover:text-white" />
                </div>
                <p className="text-primary-600 mt-2">YouTube</p>
              </a>
            </div>
          </div>
        </div>
      </section>
      <Modal
        centered
        opened={opened}
        onClose={() => handlers.close()}
        title='Оставить заявку'
      >
        <div>
          <TextInput
            label='Наименование организации'
            value={q?.name}
            onChange={e => setQ({...q, name: e?.currentTarget?.value})}
            variant='filled'
          />
          <TextInput
            label='Эл. почта'
            value={q?.email}
            onChange={e => setQ({...q, email: e?.currentTarget?.value})}
            variant='filled'
          />
          <TextInput
            label='Контактный номер'
            value={q?.phone}
            onChange={e => setQ({...q, phone: e?.currentTarget?.value})}
            variant='filled'
          />
          <Select
            label='Услуги'
            placeholder='Выберите услугу'
            data={services?.services?.map(e => {return {label: e, value: e}}) ?? []}
            className='mt-3'
            variant='filled'
            onChange={e => setQ({...q, service: e})}
          />
          <div className='flex justify-center mt-4'>
            <Button
              disabled={!q?.name || !q?.email || !q?.phone}
              onClick={async () => {
                await pb.collection('123').create({
                  ...q
                })
                .then(() => {
                  handlers.close()
                  showNotification({
                    title: 'Заявка',
                    color: 'green',
                    message: 'Заявка успешно отправлена'
                  })
                  setQ({
                    email: '',
                    name: '',
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