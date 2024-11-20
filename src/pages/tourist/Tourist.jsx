import React from 'react'
import { Accordion, Button, Modal, Select, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { pb } from 'shared/api'
import { usePageData } from 'shared/hooks'
import { Accord, Image } from 'shared/ui'
import { useLangContext } from 'app/langContext'
import { showNotification } from '@mantine/notifications'
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'

async function getRights() {
  return await pb.collection('tourist_data').getFullList()
}

export const Tourist = () => {
  const { headings, text, images } = usePageData('tourist')
  const { kz } = useLangContext()

  const [opened1, handlers1] = useDisclosure()

  const [data, setData] = React.useState({
    name: '',
    phone: '',
  })

  const [types, setTypes] = React.useState([])

  const [type, setType] = React.useState('')

  React.useEffect(() => {
    getRights().then((res) => {
      setTypes(res?.[0]?.types)
    })
  }, [])

  async function send() {
    await pb
      .collection('tourist_bids')
      .create({
        ...data,
        type: type,
      })
      .then((res) => {
        setData({
          name: '',
          phone: '',
        })
        setType('')
        showNotification({
          title: 'Заявка',
          color: 'green',
          message: 'Заявка успешно отправлена',
        })
        handlers1.close()
      })
  }

  const [embla, setEmbla] = React.useState(null)
  const autoplay = React.useRef(Autoplay({ delay: 5000 }))

  return (
    <>
      <div className="w-full">
        <div className="container">
          <section className="grid grid-cols-[60%_auto] mt-4 gap-4 rounded-primary overflow-hidden">
            <Carousel
              slideSize="98%"
              slideGap="md"
              height={384}
              // className='max-w-2xl'
              withControls={false}
              dragFree
              loop
              w={'100%'}
              align="center"
              getEmblaApi={setEmbla}
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
            >
              {Array(5)
                .fill(1)
                .map((q, i) => {
                  return (
                    <Carousel.Slide key={i}>
                      <Image
                        record={images}
                        index={i + 1}
                        className="min-w-full rounded-primary object-cover aspect-video"
                      />
                    </Carousel.Slide>
                  )
                })}
            </Carousel>

            <div className="w-full lg:text-left text-center">
              <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
                {headings?.intro1}
              </h1>

              <ul className="mt-3 text-lg font-medium text-[#5a5959] ">
                <li>{text?.intro2}</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="grid lg:grid-cols-[60%_auto] gap-4 mt-10">
              <Image
                record={images}
                index={6}
                className="w-full rounded-primary object-cover aspect-video"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
                  {headings?.info1}
                </h1>
                <div className="space-y-4 mt-3">
                  <div>
                    <p className="text-lg text-primary-500 font-semibold">{text?.info2}</p>
                    <p>{text?.info3}</p>
                  </div>
                  <div>
                    <p className="text-lg text-primary-500 font-semibold">{text?.info4}</p>
                    <p>{text?.info5}</p>
                  </div>
                  <div>
                    <p className="text-lg text-primary-500 font-semibold">{text?.info6}</p>
                    <p>{text?.info7}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-[60%_auto] mt-10 gap-4 rounded-primary overflow-hidden">
            <Image
              record={images}
              index={7}
              className="min-w-full rounded-primary object-cover aspect-video"
            />
            <div className="w-full lg:text-left text-center">
              <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
                {headings?.memo1}
              </h1>

              <ul className="mt-3 text-lg font-medium text-[#5a5959] ">
                <li>{text?.memo2}</li>
              </ul>
            </div>
          </section>


          <section className='mt-10 text-center'>
            <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
              {headings?.services1}
            </h1>
            <p className="text-xl font-medium mt-3">{headings?.services2}</p>
            {Array(12).fill(1).map((_, i) => {
              return <p className="mt-2 font-medium">{text?.[`services${i + 3}`]}</p>
            })}
          </section>

          <section className="grid lg:grid-cols-[60%_auto] mt-10 gap-4">
            <Image
              record={images}
              index={8}
              className="w-full lg mx-auto lg:mx-0 rounded-primary object-cover aspect-video"
            />

            <div className="w-full lg:text-left text-center">
              <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
                {headings?.fund1}
              </h1>

              <p className="text-xl font-medium mt-3">{headings?.fund2}</p>
              <p className="mt-2 text-lg font-medium">{text?.fund}</p>
            </div>
          </section>

          <section className="grid lg:grid-cols-[60%_auto] mt-10 gap-4">
            <Image
              record={images}
              index={9}
              className="w-full lg mx-auto lg:mx-0 rounded-primary object-cover aspect-video"
            />

            <div className="w-full lg:text-left text-center">
              <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
                {headings?.dick1}
              </h1>

              <p className="mt-3 text-lg font-medium">{text?.dick2}</p>
            </div>
          </section>

          <section className="grid lg:grid-cols-[60%_auto] mt-10 gap-4">
            <Image
              record={images}
              index={6}
              className="w-full lg mx-auto lg:mx-0 rounded-primary object-cover aspect-video"
            />

            <div className="w-full lg:text-left text-center">
              <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
                {headings?.q3}
              </h1>
              <h1 className="text-xl md:text-2xl font-bold font-head text-teal-500 mt-2">
                {headings?.q3}
              </h1>
              {Array(12).fill(1).map((_, i) => {
                return <p className="mt-2 font-medium">{text?.[`agent${i + 3}`]}</p>
              })}
            </div>
          </section>

          <section className="mt-10">
            <h1 className="font-bold text-4xl text-primary-500 text-center">Услуги</h1>
            <Accord data={types} />
          </section>

          <div className="flex justify-center mt-4">
            <Button onClick={() => handlers1.open()}>
              {kz ? 'Өтініш қалдыру' : `Оставить заявку`}
            </Button>
          </div>
        </div>
      </div>
      <Modal opened={opened1} onClose={() => handlers1.close()} centered title="Оставить заявку">
        <section className="max-w-md mx-auto border px-4 pb-4 shadow-lg bg-white">
          <TextInput
            label="Имя"
            placeholder="Ваше имя"
            className="mt-3"
            variant="filled"
            value={data?.name}
            onChange={(e) => setData({ ...data, name: e?.currentTarget?.value })}
          />
          <TextInput
            label="Контактный номер"
            placeholder="Ваш номер"
            className="mt-3"
            variant="filled"
            value={data?.phone}
            onChange={(e) => setData({ ...data, phone: e?.currentTarget?.value })}
          />
          <Select
            label="Вид услуги"
            placeholder="Выберите вид услуги"
            data={
              [
                ...types?.map((q) => {
                  return { label: q?.label, value: q?.label }
                }),
              ] ?? []
            }
            className="mt-3"
            variant="filled"
            onChange={(e) => setType(e)}
          />
          <div className="flex justify-center mt-6">
            <Button disabled={!data?.name || !data?.phone || !type} onClick={send}>
              Оставить заявку
            </Button>
          </div>
        </section>
      </Modal>
    </>
  )
}
