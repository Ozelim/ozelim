import React from 'react'
import clsx from 'clsx'
import { formatNumber } from 'shared/lib'
import { Button, FileButton, TextInput, UnstyledButton } from '@mantine/core'
import { useSearchParams } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'

const array = [
  {
    type: 'family',
    description:
      'Предназначен для покупки туров и путевок в курортные зоны для всей семьи, идеальный вариант для путешествий с семьей.',
    price: 30000,
    image: 'https://pbs.twimg.com/media/GV4Rqt2XEAAQotY?format=jpg&name=4096x4096',
    people: 5,
  },
  {
    type: 'agent',
    description:
      'Можете звать за собой людей и получать за них до 15% бонусов, и иметь все бонусы семейного пакета',
    price: 450000,
    image: 'https://pbs.twimg.com/media/GV4Rqt2XEAAQotY?format=jpg&name=4096x4096',
    people: 5,
  },
  {
    type: 'company',
    description:
      'Предназначен для покупки туров и путевок в курортные зоны для целой орзанизации, экономьте на каждой поездке и получайте лучший сервис.',
    price: 600000,
    image: 'https://pbs.twimg.com/media/GV4Rqt2XEAAQotY?format=jpg&name=4096x4096',
    people: 20,
  },
  {
    type: 'company+',
    description:
      'Предназначен для покупки туров и путевок в курортные зоны для целой орзанизации, экономьте на каждой поездке и получайте лучший сервис.',
    price: 1500000,
    image: 'https://pbs.twimg.com/media/GV4Rqt2XEAAQotY?format=jpg&name=4096x4096',
    people: 60,
  },
]

export const Packs = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const [loading, loading_h] = useDisclosure(false)

  async function handlePackClick(type) {
    if (type === 'family') {
      try {
        loading_h.open()
        const randomNumber = Math.floor(Math.random() * 100000000)
        const token = import.meta.env.VITE_APP_SHARED_SECRET

        const data = {
          ORDER: randomNumber,
          AMOUNT: user?.email === `kurama.zxc@mail.ru` ? 5 : 30000,
          // AMOUNT: 30000,
          CURRENCY: 'KZT',
          MERCHANT: '110-R-113431490',
          TERMINAL: '11371491',
          NONCE: randomNumber + 107,
          DESC: 'Семейный пакет',
          CLIENT_ID: user?.id,
          DESC_ORDER: 'Семейный пакет',
          EMAIL: user?.email,
          BACKREF: `https://oz-elim.kz/aprofile`,
          Ucaf_Flag: '',
          Ucaf_Authentication_Data: '',
        }

        const dataString = `${data?.ORDER};${data?.AMOUNT};${data?.CURRENCY};${data?.MERCHANT};${data?.TERMINAL};${data?.NONCE};${data?.CLIENT_ID};${data?.DESC};${data?.DESC_ORDER};${data?.EMAIL};${data?.BACKREF};${data?.Ucaf_Flag};${data?.Ucaf_Authentication_Data};`

        const all = token + dataString
        const sign = sha512(all).toString()

        await axios
          .post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/pay`, {
            ...data,
            P_SIGN: sign,
          })
          .then(async (res) => {
            const searchParams = new URLSearchParams(JSON.parse(res?.config?.data))
            await pb
              .collection('agents')
              .update(user?.id, {
                pay: {
                  ...JSON.parse(res?.config?.data),
                  SHARED_KEY: token,
                },
              })
              .then(() => {
                loading_h.close()
                window.location.href = `https://jpay.jysanbank.kz/ecom/api?${searchParams}`
              })
          })
          .finally(() => {
            loading_h.close()
          })
      } catch (err) {
        loading_h.close()
        console.log(err, 'err')
      }

      return
    }

    if (type === 'agent') {
      try {
        loading_h.open()
        const randomNumber = Math.floor(Math.random() * 100000000)
        const token = import.meta.env.VITE_APP_SHARED_SECRET

        const data = {
          ORDER: randomNumber,
          AMOUNT: user?.email === `kurama.zxc@mail.ru` ? 5 : 30000,
          // AMOUNT: 30000,
          CURRENCY: 'KZT',
          MERCHANT: '110-R-113431490',
          TERMINAL: '11371491',
          NONCE: randomNumber + 107,
          DESC: 'Агентский пакет',
          CLIENT_ID: user?.id,
          DESC_ORDER: 'Агентский пакет',
          EMAIL: user?.email,
          BACKREF: `https://oz-elim.kz/aprofile`,
          Ucaf_Flag: '',
          Ucaf_Authentication_Data: '',
        }

        const dataString = `${data?.ORDER};${data?.AMOUNT};${data?.CURRENCY};${data?.MERCHANT};${data?.TERMINAL};${data?.NONCE};${data?.CLIENT_ID};${data?.DESC};${data?.DESC_ORDER};${data?.EMAIL};${data?.BACKREF};${data?.Ucaf_Flag};${data?.Ucaf_Authentication_Data};`

        const all = token + dataString
        const sign = sha512(all).toString()

        await axios
          .post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/pay`, {
            ...data,
            P_SIGN: sign,
          })
          .then(async (res) => {
            const searchParams = new URLSearchParams(JSON.parse(res?.config?.data))
            await pb
              .collection('agents')
              .update(user?.id, {
                pay: {
                  ...JSON.parse(res?.config?.data),
                  SHARED_KEY: token,
                },
              })
              .then(() => {
                loading_h.close()
                window.location.href = `https://jpay.jysanbank.kz/ecom/api?${searchParams}`
              })
          })
          .finally(() => {
            loading_h.close()
          })
      } catch (err) {
        loading_h.close()
        console.log(err, 'err')
      }
      return
    }

    setSearchParams({ type })

  }

  const type = searchParams.get('type')

  if (type === 'company+') {
    return (
      <div className="container"> 
        <div className="">Корпоративный +</div>
      </div>
    )
  }

  if (type === 'company') {
    return (
      <div className="container"> 
        <form className="flex flex-col gap-2 max-w-sm mx-auto shadow-equal rounded-primary p-4">
          <p className="text-lg font-bold text-center">Заявка на корпоративный пакет</p>
          <TextInput required variant='filled' placeholder="Име довер. лица" label="Име довер. лица" />
          <TextInput required variant='filled' placeholder="Номер телефона" label="Номер телефона" />
          <TextInput required variant='filled' placeholder="Почта" label="Почта" />
          <TextInput color='pink.6' variant='filled' placeholder="WhatsApp" label="WhatsApp" />
          <div className='flex gap-2 items-center mt-2'>
            <p className='text-sm font-medium'>Документы организации</p>
            <FileButton accept="image/*">
              {(props) => <Button variant="outline" compact {...props}>Загрузить документы</Button>}
            </FileButton>
          </div>
          <Button className='mt-3' color="rose">Отправить заявку</Button>
        </form>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-4">
        {array.map((item) => (
          <Pack key={item.type} {...item} onClick={() => handlePackClick(item.type)} />
        ))}
      </div>
    </div>
  )
}

export const Pack = ({ type, description, price, image, people, onClick }) => {
  return (
    <UnstyledButton
      onClick={onClick}
      title={
        (type === 'family' && 'Приобрести пакет для семьи') ||
        (type === 'agent' && 'Приобрести пакет для агента') ||
        (type === 'company' && 'Приобрести пакет для компании') ||
        (type === 'company+' && 'Приобрести пакет для компании +')
      }
      className={clsx(
        'rounded-primary shadow-equal overflow-hidden flex flex-col !text-white cursor-pointer hover:scale-105 transition-all duration-200 focus:scale-105',
        {
          'bg-gradient-to-tr from-orange-300 to-orange-600 hover:shadow-orange-500/50':
            type === 'family',
          'bg-gradient-to-tl from-primary-300 to-primary-600 hover:shadow-primary-500/50':
            type === 'agent',
          'bg-gradient-to-tr from-rose-300 to-rose-600 hover:shadow-rose-500/50':
            type === 'company',
          'bg-gradient-to-tl from-blue-300 to-blue-600 hover:shadow-blue-500/50':
            type === 'company+',
        }
      )}
    >
      <img
        src={'https://pbs.twimg.com/media/GV4Rqt2XEAAQotY?format=jpg&name=4096x4096'}
        alt=""
        className="aspect-video object-cover border-b"
      />
      <div className="px-6 shrink h-full">
        <p className={clsx('text-center my-4 font-medium')}>1 год</p>
        <p className="text-2xl text-center leading-4 font-bold">
          {type === 'family' && 'Семейный'}
          {type === 'agent' && 'Агентский'}
          {type === 'company' && 'Корпоративный'}
          {type === 'company+' && 'Корпоративный +'}
        </p>
        <p className="text-center mt-3 tracking-wide font-medium">{description}</p>
      </div>
      <div
        className={clsx(
          'grid grid-cols-3 items-center justify-center text-white mt-6 font-semibold text-sm border-t',
          {
            'bg-orange-500': type === 'family',
            'bg-primary-500': type === 'agent',
            'bg-rose-500': type === 'company',
            'bg-blue-500': type === 'company+',
          }
        )}
      >
        <div className="grid place-items-center p-4 text-center border-r h-full">
          На {people}
          <br />
          человек
        </div>
        <div className="grid place-items-center p-4 text-center border-r whitespace-nowrap h-full">
          {formatNumber(price)} ₸
        </div>
        <div className="grid place-items-center p-4 text-center">Скидки до 40%</div>
      </div>
    </UnstyledButton>
  )
}