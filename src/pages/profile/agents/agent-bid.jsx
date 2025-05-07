import React from 'react'
import agreement from 'shared/assets/images/agent-agreement.pdf'
import { Checkbox, Button, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useAuth } from 'shared/hooks'
import { pb } from 'shared/api'
import axios from 'axios'
import { sha512 } from 'js-sha512'
import { useSearchParams } from 'react-router-dom'

export const AgentBid = () => {

  const [_, setSearchParams] = useSearchParams()

  const { user } = useAuth()

  const [check, setCheck] = React.useState(false)

  const [opened, handlers] = useDisclosure(false)

  const [paymentLoading, setPaymentLoading] = React.useState(false)

  const [d, setD] = React.useState({
    fio: user?.fio ?? '',
    iin: user?.iin ?? '',
    phone: user?.phone ?? '',
  })

  if (opened) {
    return (
      <div className="container h-full">
        <div className="flex flex-col gap-4 max-w-sm mx-auto bg-white shadow-equal p-4 rounded-primary">
          <p className="text-center text-gray-500">Заявка на становление агентом</p>
          <TextInput
            label="ФИО"
            value={d?.fio}
            onChange={(e) => setD({ ...d, fio: e?.currentTarget?.value })}
            variant="filled"
          />
          <TextInput
            label="ИИН"
            value={d?.iin}
            onChange={(e) => setD({ ...d, iin: e?.currentTarget?.value })}
            variant="filled"
          />
          <TextInput
            label="Номер телефона"
            value={d?.phone}
            onChange={(e) => setD({ ...d, phone: e?.currentTarget?.value })}
            variant="filled"
            description="Укажите ваш номер из БМГ (База мобильных граждан)"
          />
          <p className="text-sm mt-3 text-gray-500">
            Сумма: <span className="text-black">45 000 ₸</span>
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" color="red" onClick={() => {
              setSearchParams({})
            }}>
              Нахад
            </Button>
            <Button
              loading={paymentLoading}
              color="teal.6"
              disabled={!d?.fio || !d?.iin || !d?.phone}
              onClick={async (e) => {
                try {
                  e.preventDefault()
                  const randomNumber = Math.floor(Math.random() * 100000000)
                  const token = import.meta.env.VITE_APP_SHARED_SECRET

                  const data = {
                    ORDER: randomNumber,
                    AMOUNT: user?.email === `kurama.zxc@mail.ru` ? 5 : 45000,
                    // AMOUNT: 30000,
                    CURRENCY: 'KZT',
                    MERCHANT: '110-R-113431490',
                    TERMINAL: '11371491',
                    NONCE: randomNumber + 107,
                    DESC: 'Агент по туризму',
                    CLIENT_ID: user?.id,
                    DESC_ORDER: 'Агент по туризму',
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

                      const bids = await pb.collection('agents_bids').getFullList({ fields: `inc` })

                      const num = crypto.randomUUID()

                      await pb.collection('agents_bids').create({
                        inc: bids?.length + 1,
                        agent_pay: {
                          ...JSON.parse(res?.config?.data),
                          SHARED_KEY: token,
                        },
                        status: 'waiting',
                        agent: user?.id,
                        ...d,
                        data: d,
                        bid_id: num,
                        max: true,
                      })
                      await pb
                        .collection('agents')
                        .update(user?.id, {
                          agents_pay: {
                            ...JSON.parse(res?.config?.data),
                            SHARED_KEY: token,
                          },
                          bid_id: num,
                        })
                        .then(() => {
                          showNotification({
                            title: 'Агент по туризму',
                            message: 'Переходим к оплате',
                            color: 'green',
                          })
                          window.location.href = `https://jpay.jysanbank.kz/ecom/api?${searchParams}`
                        })
                    })
                } catch (err) {
                  console.log(err, 'err')
                }
              }}
            >
              Оплатить
            </Button>
 
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container h-full">
      <div className="!hidden lg:!block">
        <iframe src={agreement} width="100%" height={700} />
      </div>
      <p className="!block lg:!hidden">
        Для подачи заявки на становление агентом, пожалуйста ознакомтесь с агентским договором.
        <a href="/agent-agreement.pdf" className="underline text-primary-400" target="_blank">
          Ознакомиться
        </a>
      </p>

      <Checkbox
        label="Ознакомлен(а)"
        checked={check}
        onChange={(e) => setCheck(e.currentTarget.checked)}
        className="mt-4"
      />
      <div className="mt-4 flex justify-center items-center gap-4">
        <Button variant="outline" color="red" onClick={() => {
          setSearchParams({})
        }}>
          Нахад
        </Button>
        <Button
          disabled={!check}
          onClick={() => {
            handlers.open() 
          }}
          color="teal.6"
        >
          Далее
        </Button>
      </div>
    </div>
  )
}
