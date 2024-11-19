import React from 'react'
import { Button, Modal, Select, TextInput } from '@mantine/core'
import { TourOperators } from 'modules/TourOperators'
import { pb } from 'shared/api'
import { getImageUrl } from 'shared/lib'
import { ImgSkeleton } from 'shared/ui/ImgSkeleton'
import { usePageData } from 'shared/hooks'
import { Image } from 'shared/ui'
import { showNotification } from '@mantine/notifications'
import ins from 'shared/assets/images/insurance-1.png'
import { useDisclosure } from '@mantine/hooks'
import { useLangContext } from 'app/langContext'

async function getRights () {
  return await pb.collection('insurance_data').getFullList()
}

export const CharityFund = () => {

  const {images, headings, text} = usePageData('insurance')

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
    await pb.collection('insurance_bids').create({
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
    })
  }

  return (
    <div className="w-full">
      <div className="container">
        <section>
          <div className="grid lg:grid-cols-[40%_auto]">
            <div className="mt-10">
              <h1 className="text-5xl font-semibold text-primary-500 ">
                {headings?.main}
              </h1>
              <p className="mt-5 text-xl font-medium">
                {headings?.submain}
              </p>
            </div>
            <img
              className="aspect-video mt-10 lg:mt-0 w-full max-w-xl mx-auto lg:max-w-full lg:mx-0 object-contain rounded-primary"
              src={getImageUrl(images, images?.[1])}
              alt="kid"
            />
          </div>
        </section>
    
        <h1 className="heading mt-10 text-primary-500">{headings?.grid}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6 mt-5 md:mt-10">
          <div className="p-6 rounded-primary shadow-md bg-white">
            <h4 className="text-2xl font-semibold font-head text-primary-500">
              {headings?.card1}
            </h4>
            <p className="paragraph mt-2">{text?.card1}</p>
          </div>
          <div className="p-6 rounded-primary shadow-md bg-white">
            <h4 className="text-2xl font-semibold font-head text-primary-500">
              {headings?.card2}
            </h4>
            <p className="paragraph mt-2">{text?.card2}</p>
          </div>
          <div className="p-6 rounded-primary shadow-md bg-white">
            <h4 className="text-2xl font-semibold font-head text-primary-500">
              {headings?.card3}
            </h4>
            <ul className="mt-3 text-lg font-medium paragraph list-disc">
              <li>
                {text?.card3}
              </li>
              <li>{text?.card31}</li>
              <li>{text?.card32}</li>
              <li>{text?.card33}</li>
            </ul>
          </div>
          <div className="p-6 rounded-primary shadow-md bg-white">
            <h4 className="text-2xl font-semibold font-head text-primary-500">
              {headings?.card4}
            </h4>
            <ul className="mt-3 text-lg font-medium paragraph list-disc">
              <li>
                {text?.card4}
              </li>
              <li>{text?.card41}</li>
              <li>{text?.card42}</li>
              <li>{text?.card43}</li>
              <li>{text?.card44}</li>
              <li>{text?.card45}</li>
            </ul>
            <p className='paragraph mt-2'>{text?.card46}  </p>
          </div>
        </div>
    
        <section className="mt-8 lg:mt-16 flex flex-col lg:flex-row gap-10">
          <img
            className="aspect-video object-cover rounded-primary w-full mx-auto lg:mx-0 max-w-xl"
            src={getImageUrl(images, images?.[5])}
            alt="kid"
          />
          <div className="w-full">
            <h1 className="text-3xl  font-semibold text-primary-500">
              {headings?.help}
            </h1>
            <p className="mt-2 ">{text?.help}</p>

            <a href={'/insurance-1.pdf'} target='_blank'>
              <Button>
                Страховая памятка
              </Button>
            </a>
          </div>
        </section>

        <h1 className="text-5xl font-bold text-center mt-10 text-primary-500">
          {headings?.history}
        </h1>
        <TourOperators images={images} text={text} />
        <div>
          <h1 className="text-4xl text-primary-500 font-bold text-center">
            {headings?.q}
          </h1>
          <div className='grid lg:grid-cols-[70%_auto] mt-8 gap-4'>
            <div>
              <h2 className='text-center text-primary-500 text-2xl'>
                {headings?.w}
              </h2>
              <p className='mt-2'>
                {text?.e}
              </p>
              
              <h2 className='text-center text-primary-500 text-2xl'>
                {headings?.r}
              </h2>
              <p className='mt-2'>
                {text?.t}
              </p>
              
            </div>
            <Image
              record={images}
              index={6}
              className='mx-auto'
            />
          </div>

          <h2 className='text-center text-primary-500 text-2xl mt-6'>
            {headings?.y}
          </h2>
          <p className='mt-2'>
            {text?.u}
          </p>
          
          <h2 className='text-center text-primary-500 text-2xl mt-8'>{headings?.i}</h2>

        </div>

        <div className='mt-8'>
          <h1 className="text-4xl text-primary-500 font-bold text-center">
            {headings?.o}
          </h1>
          <Image
            record={images}
            index={7}
            className='mx-auto mt-5'
          />

          <h2 className='text-center text-primary-500 text-2xl mt-6'>{headings?.p}</h2>

          <ul className="mt-3 text-lg font-medium paragraph list-disc">
            <li>{text?.a}</li>
            <li>{text?.s}</li>
            <li>{text?.d}</li>
            <li>{text?.f}</li>
          </ul>
          
        </div>

        <section className="mt-8 lg:mt-16 flex flex-col lg:flex-row gap-10">
          <img
            className="aspect-video object-cover rounded-primary w-full mx-auto lg:mx-0 max-w-xl"
            src={getImageUrl(images, images?.[8])}
            alt="kid"
          />
          <div className="w-full">
            <h1 className="text-3xl  font-semibold text-primary-500">
              {headings?.zz}
            </h1>
            <p className="mt-2 ">{text?.zz}</p>
            <a href={'/insurance-1.png'} target='_blank'>
              <Button>
                Страховая лицензия
              </Button>
            </a>
          </div>
        </section>

        <div className='flex justify-center mt-4'>
          <Button
            onClick={() => handlers1.open()}
          >
            {kz ? 'Өтініш қалдыру' : `Оставить заявку`}
          </Button>
        </div>

        <Modal
          opened={opened1}
          onClose={() => handlers1.close()}
          centered
          title='Оставить заявку'
        >
        <section className='max-w-md mx-auto border p-4 shadow-lg bg-white'>
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
            data={types ?? []}
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
      </div>
    </div>
  )
}
