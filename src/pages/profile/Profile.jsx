import React from 'react'
import { UserData } from 'entities/useData'
import dayjs from 'dayjs'
import { ReferalsList } from 'entities/referalsList'
import { pb } from 'shared/api'
import { Button, Group, LoadingOverlay, Modal, NumberInput, Radio, Table, TextInput } from '@mantine/core'
import { useAuth } from 'shared/hooks'

import Tree from 'react-d3-tree'
import { formatNumber, getImageUrl, totalCost } from 'shared/lib'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { sha512 } from 'js-sha512'
import { Avatar } from 'shared/ui'
import { Referal } from 'entities/referalsList/ui/Referal'
import { openConfirmModal } from '@mantine/modals'

import { FaCircleXmark } from 'react-icons/fa6'

function getMonth(previous) {
  let month = dayjs().month() + 1

  if (previous) {
    if (month === 1) return 12
    if (month < 10) return `${0}${month - 1}`
    return month
  }

  if (month < 10) month = `${0}${month}`

  return month
}

function getYear(previous) {
  const year = dayjs().year()

  if (previous) {
    if (getMonth() === '01') return year - 1
  }
  return year
}

const currentYearAndMonth = `${getYear()}-${getMonth()}-01 00:00:00`

const currentMonthString = `created >= '${currentYearAndMonth}'`

async function getWithdraws (userId) {
  return await pb.collection('withdraws').getFullList({
    filter: `${currentMonthString} && user = '${userId}'`,
    sort: '-created'
  })
}

async function getTransfers (userId) {
  return await pb.collection('transfers').getFullList({
    filter: `${currentMonthString} && user = '${userId}'`,
  })
}

async function getServiceBids (id) {
  return await pb.collection('service_bids').getFullList({
    filter: `user = '${id}' && status != 'waiting'`,
    sort: `-created`,
  })
}

function CustomNode({ nodeDatum, onNodeClick, sponsor, node }) {

  const data = nodeDatum?.value;

  function click (data) {
    onNodeClick(data)
  }

  const isSponsor = data?.id && (data?.id === sponsor?.sponsor)

  const selected = node?.id === data?.id 

  return (
    <g stroke="grey" fill="grey" strokeWidth="0.7" >
      <circle
        r={isSponsor ? 30 : 20}
        fill={selected ? "lightgray" : "Aquamarine"}
        onClick={() => data?.id && click(nodeDatum)}
        // strokeWidth={selected ? 5 : 1}
        stroke={selected ? 'gray' : 'black'}
      />
      <text
        stroke="green"
        x={-60}
        y={-25}
        style={{ fontSize: "12px" }}
        textAnchor="start"
      >
        {data?.name} {data?.surname}
      </text>
      <text
        stroke="green"
        x={-48}
        y={35}
        style={{ fontSize: "13px" }}
        textAnchor="start"
      >
        {data?.id && (
          `ID: ${data?.id}`
        )}
      </text>

      <text
        stroke="grey"
        x={-48}
        y={50}
        style={{ fontSize: "12px" }}
        textAnchor="start"
      >
        {data?.created && (
          dayjs(data?.created).format("YYYY-MM-DD hh:mm")
        )}
      </text>
    </g>
  );
}

async function getBinaryById (id, bin) {
  if (bin === 2) {
    return await pb.collection('binary2').getFirstListItem(`sponsor = '${id}'`, {
      expand: 'sponsor, children'
    })
  }
  if (bin === 3) {
    return await pb.collection('binary3').getFirstListItem(`sponsor = '${id}'`, {
      expand: 'sponsor, children'
    })
  }
  return await pb.collection('binary').getFirstListItem(`sponsor = '${id}'`, {
    expand: 'sponsor, children'
  })
}

function findAndReplaceObjectById(obj, idToFind, replacementObject) {
  if (obj?.value?.id === idToFind) {
    return replacementObject;
  }

  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      const result = findAndReplaceObjectById(obj[key], idToFind, replacementObject);
      if (result !== null) {
        obj[key] = result;
      }
    }
  }
  return obj;
}

export const Profile = () => {

  const {user, setUser, loading} = useAuth()
  const navigate = useNavigate()

  const [count, setCount] = React.useState(0) 

  React.useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login')
      } 
    }
  }, [loading])

  const [bids, setBids] = React.useState([])

  React.useEffect(() => {
    getServiceBids(user?.id)
    .then(res => {
      setBids(res)
    })

    pb.collection('service_bids').subscribe('*', () => getServiceBids(user?.id)
    .then(res => {
      setBids(res)
    }))
    
    return () => {
      pb.collection('service_bids').unsubscribe('*')
    }
  }, [])

  const handleBeforeUnload = (event) => {
    const message = "Are you sure you want to leave? Your changes may not be saved.";
    event.returnValue = message; // Standard for most browsers
    return message; // For some older browsers
  };

  const [binary, setBinary] = React.useState({})
  const [node, setNode] = React.useState(null)
  const [withdraws, setWithdraws] = React.useState([])
  const [transfers, setTransfers] = React.useState([])

  const [currentBinary, setCurrentBinary] = React.useState(1)

  React.useEffect(() => {
    getBinaryById(user?.id)
    .then(res => {
      setBinary({
        value: res?.expand?.sponsor,
        children: [
          {
            value: res?.expand?.children?.[0],
            children: []
          },
          {
            value: res?.expand?.children?.[1],
            children: []
          },
        ]
      })
    }, [])
    getWithdraws(user?.id)
    .then(res => {
      setWithdraws(res)
    })
    getTransfers(user?.id)
    .then(res => {
      setTransfers(res)
    })
  }, [])

  React.useEffect(() => {
    if (currentBinary === 1) {
      getBinaryById(user?.id)
      .then(res => {
        setBinary({
          value: res?.expand?.sponsor,
          children: [
            {
              value: res?.expand?.children?.[0],
              children: []
            },
            {
              value: res?.expand?.children?.[1],
              children: []
            },
          ]
        })
      }, [])
    }
    if (currentBinary === 2) {
      getBinaryById(user?.id, currentBinary)
      .then(res => {
        setBinary({
          value: res?.expand?.sponsor,
          children: [
            {
              value: res?.expand?.children?.[0],
              children: []
            },
            {
              value: res?.expand?.children?.[1],
              children: []
            },
          ]
        })
      }, [])
    }
    if (currentBinary === 3) {
      getBinaryById(user?.id, currentBinary)
      .then(res => {
        setBinary({
          value: res?.expand?.sponsor,
          children: [
            {
              value: res?.expand?.children?.[0],
              children: []
            },
            {
              value: res?.expand?.children?.[1],
              children: []
            },
          ]
        })
      }, [])
    }
  }, [currentBinary])

  const [level, setLevel] = React.useState(0)

  function signout () {
    pb.authStore.clear()
    window.location.reload()
  }

  async function checkLevel () {
    if ((binary?.children?.[0]?.value && binary?.children?.[1]?.value)) { 
      if (user?.level == 0) {
        pb.collection('users').update(user?.id, {
          level: '1'
        })
      }

      if (user?.level == 1) {
        const child1 = await getBinaryById(binary?.children?.[0]?.value?.id)
        const child2 = await getBinaryById(binary?.children?.[1]?.value?.id)
        
        if (child1.children.length === 2 && child2.children.length === 2) {
          pb.collection('users').update(user?.id, {
            level: `2`
          })
        }
      }
    }
  } 

  React.useEffect(() => {
    checkLevel()
  }, [binary])

  React.useEffect(() => {
    setLevel((!user?.level || user?.level == '0') ? 0 : user?.level)
  }, [user])

  async function handleNodeClick (data) {
    if (currentBinary === 1) {
      getBinaryById(data?.value?.id)
      .then(async res => {
        const slot = await pb.collection(`binary`).getOne(data?.value?.id, {expand: 'sponsor, children'}) 
        setNode(slot)
        const obj = findAndReplaceObjectById(binary, data?.value?.id, {
          value: res?.expand?.sponsor,
          children: [
            {
              value: res?.expand?.children?.[0],
              children: []
            },
            {
              value: res?.expand?.children?.[1],
              children: []
            },
          ]
        })
        setBinary({...binary, ...obj})
      })
      .catch(err => {
        console.log(err, 'err');
      }) 
    } 
    if (currentBinary === 2) {
      getBinaryById(data?.value?.id, 2)
      .then(async res => {
        const slot = await pb.collection(`binary2`).getOne(data?.value?.id, {expand: 'sponsor, children'}) 
        setNode(slot)
        const obj = findAndReplaceObjectById(binary, data?.value?.id, {
          value: res?.expand?.sponsor,
          children: [
            {
              value: res?.expand?.children?.[0],
              children: []
            },
            {
              value: res?.expand?.children?.[1],
              children: []
            },
          ]
        })
        setBinary({...binary, ...obj})
      })
      .catch(err => {
        console.log(err, 'err');
      }) 
    } 
    if (currentBinary === 3) {
      getBinaryById(data?.value?.id, 3)
      .then(async res => {
        const slot = await pb.collection(`binary3`).getOne(data?.value?.id, {expand: 'sponsor, children'}) 
        setNode(slot)
        const obj = findAndReplaceObjectById(binary, data?.value?.id, {
          value: res?.expand?.sponsor,
          children: [
            {
              value: res?.expand?.children?.[0],
              children: []
            },
            {
              value: res?.expand?.children?.[1],
              children: []
            },
          ]
        })
        setBinary({...binary, ...obj})
      })
      .catch(err => {
        console.log(err, 'err');
      }) 
    } 
  } 

  const [paymentLoading, setPaymentLoading] = React.useState(false)
  const [verifyLoading, setVerifyLoading] = React.useState(false)

  async function submit (e) {
    try {
      setPaymentLoading(true)
      e.preventDefault()
      const randomNumber = Math.floor(Math.random() * 100000000)
      const token = import.meta.env.VITE_APP_SHARED_SECRET

      const data = {
        ORDER: randomNumber,
        AMOUNT: user?.email === `spinner_g@mail.ru` ? 5 : 30000,
        // AMOUNT: 30000,
        CURRENCY: 'KZT',
        MERCHANT:'110-R-113431490',
        TERMINAL: '11371491',
        NONCE: randomNumber + 107,
        DESC: 'Оплата',
        CLIENT_ID: user?.id,
        DESC_ORDER: 'Оплата верификация',
        EMAIL: user?.email,
        BACKREF: `https://oz-elim.kz/profile`,
        Ucaf_Flag: '',
        Ucaf_Authentication_Data: '',
      }

      const dataString = `${data?.ORDER};${data?.AMOUNT};${data?.CURRENCY};${data?.MERCHANT};${data?.TERMINAL};${data?.NONCE};${data?.CLIENT_ID};${data?.DESC};${data?.DESC_ORDER};${data?.EMAIL};${data?.BACKREF};${data?.Ucaf_Flag};${data?.Ucaf_Authentication_Data};`
      
      const all = token + dataString
      const sign = sha512(all).toString()

      await axios.post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/pay`, {
        ...data,
        P_SIGN: sign
      })
      .then(async res => {
        console.log(res, 'res');
        console.log(res?.data, 'res data');
        const searchParams = new URLSearchParams(JSON.parse(res?.config?.data));
        await pb.collection('users').update(user?.id, {
          pay: {
            ...JSON.parse(res?.config?.data),
            SHARED_KEY: token
          }
        })
        .then(() => {
          setPaymentLoading(false)
          window.location.href = `https://jpay.jysanbank.kz/ecom/api?${searchParams}`;
        })
      })
      .finally(() => {
        setPaymentLoading(false)
      })

    } catch (err) {
      setPaymentLoading(false)
      console.log(err, 'err');
    }
  }


  async function  verifyUser(userId) {
    setVerifyLoading(true)
    await axios.post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/verify`, {
      id: userId
    })
    .then(async res => {
      await pb.collection('users').getOne(user.id, {expand: 'sponsor'})
      .then(res => {
        setUser(res)
      })
      console.log(res, 'succ');
    })
    .finally(() => {
      setVerifyLoading(false)
    })

    // await pb.admins.authWithPassword('helper@mail.ru', import.meta.env.VITE_APP_PASSWORD)
    // .then(async res => {
    //   await pb.collection("users").update(userId, {
    //     verified: true,
    //   })
    //   .then(async res => {
    //     const sponsor = await pb.collection('users').getOne(res?.sponsor)
    //     await pb.collection('users').update(sponsor?.id, {
    //       referals: [...sponsor?.referals, res?.id]
    //     })
      
    //     const referals = await pb.collection('users').getFullList({filter: `sponsor = '${sponsor?.id}' && verified = true`})
  
    //     if (referals?.length === 1) {
    //       await pb.collection('users').update(sponsor?.id, {
    //         balance: sponsor?.balance + 30000            
    //       })
    //       .finally(async () => {
    //         pb.authStore.clear()
    //         window.location.reload()
    //       })            
    //     }

    //     if (referals?.length >= 4) {
    //       await pb.collection('users').update(sponsor?.id, {
    //         balance: sponsor?.balance + 15000            
    //       })
    //       .finally(async () => {
    //         pb.authStore.clear()
    //         window.location.reload()
    //       })            
    //     }

    //     pb.authStore.clear()
    //     window.location.reload()
    //     // setLoading(false)
    //   })
    //   .catch(err => {
    //     // setLoading(false)
    //   })
    //   .finally(() => {
    //     setVerifyLoading(false)
    //   })
    // })
    // .finally(() => {
    //   setVerifyLoading(false)
    // })
  }

  async function checkPaymentStatus () {
    const u = await pb.collection('users').getOne(user.id)

    const token = import.meta.env.VITE_APP_SHARED_SECRET
    const string = `${u?.pay?.ORDER};${u?.pay?.MERCHANT}`
    const sign = sha512(token + string).toString()
    if (u?.pay?.MERCHANT && u?.pay?.ORDER && !u?.verified) {
      await axios.post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/check`, {
        ORDER: u?.pay?.ORDER,
        MERCHANT: u?.pay?.MERCHANT,
        GETSTATUS: 1,
        P_SIGN: sign,
      })
      .then(async res => {
        console.log(res, 'response');
        console.log(res?.data?.includes('Обработано успешно'), 'res');
        if (res?.data?.includes('Обработано успешно')) {
          verifyUser(u?.id)
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  React.useEffect(() => {
    checkPaymentStatus()
  }, [])

  const [modal, setModal] = React.useState(false)

  function handleReferal () {
    setModal(true)
  }

  const [viewModal, setViewModal] = React.useState({
    modal: false,
    services: []
  })

  const confirm = (bid) => openConfirmModal({
    title: 'Отменить услугу',
    centered: true,
    labels: { confirm: 'Подтвердить', cancel: 'Отмена' },
    onConfirm: async () => pb.collection('service_bids').delete(bid?.id)
    .then(async res => {
      await pb.collection('users').update(user?.id, {
        'balance+': bid?.total_cost
      })
      .then(() => {
        window.location.reload()
      })
    }) 
  })

  const [card, setCard] = React.useState('')

  const handleCardDisplay = () => {
    const rawText = [...card?.split(' ').join('')] // Remove old space
    const creditCard = [] // Create card as array
    rawText.forEach((t, i) => {
      if (i % 4 === 0 && i !== 0) creditCard.push(' ') // Add space
      creditCard.push(t)
    })

    return creditCard.join('') // Transform card array to string
  }

  const [cancel, setCancel] = React.useState({
    modal: false,
    bid: {},
  }) 
  
  const [refund, setRefund] = React.useState({
    fio: '',
    iban: '',
    iin: '',
  })

  const confirmRefundBalance = (bid, onclose, com) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    children: 'Отменить услугу и вернуть средства на баланс?',
    labels: {confirm: 'Подтвердить', cancel: 'Назад'},
    onConfirm: async () => {
      await pb.collection('service_bids').update(bid?.id, {
        status: 'cancelled',
        total_cost2: (bid?.total_cost - (bid?.total_cost * 0.05)).toFixed(0),
        refunded: true,
        refunded_sum: com ? (bid?.total_cost - (bid?.total_cost * 0.05)).toFixed(0) : bid?.total_cost,
      })
      .then(async () => {
        await pb.collection('users').update(user?.id, {
          'balance+': com ? (bid?.total_cost - (bid?.total_cost * 0.05)).toFixed(0) : bid?.total_cost
        })
        .then(() => {
          window.location.reload()
        })
      })
    },
    onClose: onclose ? () => {setCancel({...cancel, modal: true})} : () => {}
  })

  const confirmRefundBonuses = (bid, onclose, com) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    children: 'Отменить услугу и вернуть бонусы?',
    labels: {confirm: 'Подтвердить', cancel: 'Назад'},
    onConfirm: async () => {
      await pb.collection('service_bids').update(bid?.id, {
        status: 'cancelled',
        total_cost2: (bid?.total_cost - (bid?.total_cost * 0.05)).toFixed(0),
        refunded: true,
        refunded_sum: com ? (bid?.total_cost - (bid?.total_cost * 0.05)).toFixed(0) : bid?.total_cost,
      })
      .then(async () => {
        await pb.collection('users').update(user?.id, {
          'bonuses+': com ? (bid?.total_cost - (bid?.total_cost * 0.05)).toFixed(0) : bid?.total_cost
        })
        .then(() => {
          window.location.reload()
        })
      })
    },
    onClose: onclose ? () => {setCancel({...cancel, modal: true})} : () => {}
  })

  const confirmRefundCard = () => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    children: 'Отменить услугу и вернуть средства на карту?',
    labels: {confirm: 'Подтвердить', cancel: 'Назад'},
    onConfirm: async () => {
      await pb.collection('service_bids').update(cancel?.bid?.id, {
        status: 'refunded',
        total_cost2: (cancel?.bid?.total_cost - (cancel?.bid?.total_cost * 0.05)).toFixed(0),
        refund_data: {...refund}
      })
      .then(() => {
        window.location.reload()
      })
    },
    onClose: () => {setCancel({...cancel, modal: true})}
  })

  function handleBalanceRefund (bid, onclose, com) {
    setCancel({...cancel, modal: false})
    confirmRefundBalance(bid, onclose, com)
  }

  function handleCardRefund () {
    setCancel({...cancel, modal: false})
    confirmRefundCard()
  }

  const [refundType, setRefundType] = React.useState('')

  if (loading) {
    return <></>
  }

  if (!user?.verified) {
    return (
      <>
        <LoadingOverlay visible={paymentLoading || verifyLoading} />
        <div className="container h-full">
          <div className='flex justify-center items-center h-full flex-col'>
            <div className='flex gap-4 items-end'>
              Ваш профиль не верифицирован, ваш ID: {user?.id}
                <Button
                  compact
                  variant='outline'
                  color='red'
                  onClick={signout}
                  className='mt-2'
                >
                  Выйти
                </Button>
            </div>
              <p className='text-center mt-4 mb-4 font-bold'>Пожалуйста обратитесь в службу поддержки или выберите способ оплаты</p>
              <div className='flex justify-between flex-col md:flex-row gap-4 mt-2'>
                <div className='p-4 border rounded-primary shadow-md bg-white max-w-xs w-full text-center'>
                  <p className='text'>Свяжитесь с менеджером для выставления счета на оплату</p>
                  <p className='text-xl font-bold mt-2'>
                    Kaspi Pay
                  </p>
                  <a href={`https://wa.me/77470512252?text=Здравствуйте! Хочу оплатить верификацию аккаунта с ID: ${user?.id}`} target="_blank" rel="noopener noreferrer">
                    <Button className='mt-4'>
                      Связаться
                    </Button>
                  </a>
                </div>
                <div className='p-4 border rounded-primary shadow-md bg-white max-w-xs w-full text-center'>
                  <p className='text'>Онлайн оплата с помощью банковской карты</p>
                  <p className='text-xl font-bold mt-2'>
                    Visa/MasterCard
                  </p>
                  <Button 
                    className='mt-4' 
                    onClick={submit}  
                  >
                    Оплатить
                  </Button>
                </div>
              </div>
          </div>
        </div>
      </>
    ) 
  }

  return (
    <>
      <div className="w-full">
        <div className="container">
          <div className="w-full bg-white shadow-md rounded-primary p-4">
            <div className="grid lg:grid-cols-[25%_auto] gap-6">
              <UserData count={count} setCount={setCount} />
              <div className="relative overflow-hidden">
                <ReferalsList level={level} setCount={setCount} />
                <div className="mt-10 overflow-auto">
                  {user?.sponsor && (
                    <div className='flex justify-between mb-4'>
                      <div>
                        <p>Спонсор:</p>
                        <div className='flex mt-2'>
                          <Referal
                            referal={user?.expand?.sponsor}
                            onReferalClick={() => {}}
                            sponsor
                          />
                        </div>
                      </div>
                      <div>
                        
                        <p>Бинар:</p>
                        <div className='flex gap-4 items-center mt-2 mr-4'>
                          {user?.binary === 2 && (
                            <>
                              <Button
                                compact
                                variant='outline'
                                onClick={() => setCurrentBinary(1)}
                              >
                                1
                              </Button>
                              <Button 
                                compact
                                variant='outline'
                                onClick={() => setCurrentBinary(2)}
                              >
                                2
                              </Button>
                            </>
                          )}
                          {user?.binary === 3 && (
                            <>
                            <Button
                              compact
                              variant='outline'
                              onClick={() => setCurrentBinary(1)}
                            >
                              1
                            </Button>
                            <Button 
                              compact
                              variant='outline'
                              onClick={() => setCurrentBinary(2)}
                            >
                              2
                            </Button>
                            <Button 
                              compact
                              variant='outline'
                              onClick={() => setCurrentBinary(3)}
                            >
                              3
                            </Button>
                            </>
                          )}
                          {(user?.binary === 0 || user?.binary === 1) && (
                            <Button
                              compact
                              variant='outline'
                            >
                              1
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="h-[70vh] border-2 border-primary-400 p-4 ">
                    <Tree 
                      data={binary ?? {}}
                      orientation="vertical" 
                      pathFunc="elbow"
                      nodeSvgShape={{
                        shape: "circle",
                        shapeProps: { r: 20, fill: "green " },
                      }}
                      renderCustomNodeElement={(props) => (
                        <CustomNode 
                          {...props}
                          onNodeClick={handleNodeClick}
                          // node={node}
                        />
                      )}
                    />
                  </div>
                  {withdraws?.length !== 0 && (
                    <div className="mt-12 overflow-scroll">
                      <h2 className="text-center text-xl font-head">Выводы</h2>
                      <Table className="border mt-4">
                        <thead>
                          <tr>
                            <th>Дата</th>
                            <th>Сумма</th>
                            <th>Карта</th>
                            <th>Владелец карты</th>
                            <th>Статус</th>
                          </tr>
                        </thead>
                        <tbody>
                          {withdraws?.map((withdraw, i) => {
                            return (
                              <tr key={i} className="text">
                                <td className='whitespace-nowrap'>
                                  {dayjs(withdraw?.created).format(
                                    'YY-MM-DD, hh:mm'
                                  )}
                                </td>
                                <td>{formatNumber(withdraw?.sum)}</td>
                                <td>{withdraw?.card}</td>
                                <td>{withdraw?.owner}</td>
                                <td>
                                  {withdraw?.status === 'created' &&
                                    'В обработке'}
                                  {withdraw?.status === 'paid' && 'Завершено'}
                                  {withdraw?.status === 'rejected' && 'Отклонено'}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                    </div>
                  )}
                  {transfers?.length !== 0 && (
                    <div className="mt-12 overflow-scroll">
                      <h2 className="text-center text-xl font-head">Переводы</h2>
                      <Table className="border mt-4">
                        <thead>
                          <tr>
                            <th>Дата</th>
                            <th>Сумма</th>
                            <th>Отправитель</th>
                            <th>Получатель</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transfers?.map((transfer, i) => {
                            return (
                              <tr key={i} className="text">
                                <td className='whitespace-nowrap'>
                                  {dayjs(transfer?.created).format(
                                    'YY-MM-DD, hh:mm'
                                  )}
                                </td>
                                <td>{formatNumber(transfer?.sum)}</td>
                                <td>{transfer?.user}</td>
                                <td>{transfer?.taker}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                    </div>
                  )}
                  {bids?.length !== 0 && (
                    <div className="mt-12 overflow-scroll">
                      <h2 className="text-center text-xl font-head">Услуги</h2>
                      <Table className="border mt-4">
                        <thead>
                          <tr>
                            <th>ФИО</th>
                            <th>Стоимость</th>
                            <th>Услуги</th>
                            <th>Статус</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {bids?.map((q, i) => {
                            return (
                              <tr key={i}>
                                <td>{q.name}</td>
                                <td>{q.total_cost} тг</td>
                                <td>
                                  <Button
                                    variant='outline'
                                    compact
                                    onClick={() => setViewModal({modal: true, services: q?.serv1ce})}
                                  >
                                    Услуги
                                  </Button>
                                </td>
                                <td>
                                  {(q.status === 'cancelled' || q.status === 'refunded') && `Отменена`}
                                  {q.status === 'rejected' && `Отклонена`}
                                  {q.status === 'created' && `Приобретена`}
                                  {q.status === 'succ' && `Одобрена`}
                                </td>
                                <td>
                                  <div className='cursor-pointer'>
                                    {(q?.status === 'created' && !q?.pay && !q?.bonuses) && <FaCircleXmark color="gray" size={20} onClick={() => confirmRefundBalance(q)}/>}
                                    {(q?.status === 'created' && q?.pay && !q?.bonuses) && <FaCircleXmark color="gray" size={20} onClick={() => setCancel({bid: q, modal: true})}/>}
                                    {(q?.status === 'created' && !q?.pay && q?.bonuses) && <FaCircleXmark color="gray" size={20} onClick={() => confirmRefundBonuses(q)}/>}
                                    {(q?.status === 'waiting') && <FaCircleXmark color="gray" size={20} onClick={() => setCancel({bid: q, modal: true})} />}
                                    {/* {(q?.status === 'created') && <FaCircleXmark color="gray" size={20} onClick={() => setCancel({bid: q, modal: true})} />} */}
                                  </div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        opened={viewModal.modal}
        onClose={() => setViewModal({services: [], modal: false})}
        centered
      >
        {viewModal.services?.map((service, i) => {
          return (
            <div 
              key={i}
              className='justify-between gap-6 border p-4 rounded-lg'
            >
              <div>
                <p className='text-lg'>{service.title}</p>
                <p className='text-sm'>{service.description}</p>
              </div>
              <div className='space-y-2'> 
                <p className='font-bold text-2xl'>{service.cost} тг</p>
              </div>
            </div>
          )
        })}
      </Modal>
      <Modal 
        opened={cancel.modal}
        onClose={() => setCancel({modal: false, bid: {}})}
        centered
        title='Отмена услуги'
      >
        <div>
          {cancel?.bid?.serv1ce?.map((service, i) => {
            return (
              <div 
                key={i}
                className='justify-between border p-4 rounded-lg mb-4'
              >
                <div>
                  <p className='text-lg'>{service.title}</p>
                </div>
                <div className='space-y-2'> 
                  <p className='font-bold text-2xl'>{service.cost} тг</p>
                </div>
              </div>
            )
          })}
          <p className='text text-sm'>
            При отмене услуги коммисия 5% от стоимости
          </p>
          {/* <p>
             {cancel?.bid?.total_cost}
          </p> */}
          <p className='flex gap-2 mt-4 text-lg'>
            <span>
              Сумма возврата:
            </span> 
            <span className='font-bold'>
              {(cancel?.bid?.total_cost - (cancel?.bid?.total_cost * 0.05)).toFixed(0)} тг
            </span>
          </p>
          <Radio.Group
            label="Выберите куда вернуть средства"
            withAsterisk
            value={refundType}
            onChange={e => setRefundType(e)}
            classNames={{
              label: '!text-base'
            }}
            className='mt-4'
          >
            <Group mt="xs">
              <Radio value="balance" label="Баланс" classNames={{label: `text-base`}} />
              <Radio value="card" label="Карта" classNames={{label: `text-base`}} />
            </Group>
          </Radio.Group>
          {refundType === 'card' && (
            <form className='mt-4'>
              <TextInput
                value={refund?.fio}
                placeholder="ФИО"
                label="Владелец счета"
                variant="filled"
                name="fio"
                onChange={q => setRefund({...refund, fio: q.currentTarget.value})}
              />
              <TextInput
                inputMode='numeric'
                value={refund?.iin ?? ''}
                onChange={q => setRefund({...refund, iin: q.currentTarget.value})}
                placeholder="030627129340"
                label="ИИН"
                variant="filled"
                name="iin"
                maxLength={12}
              /> 
              <TextInput
                value={refund?.iban}
                placeholder="KZ123456789123456789"
                label="Номер счета карты (IBAN)"
                variant="filled"
                name="iban"
                maxLength={20}
                onChange={q => setRefund({...refund, iban: q.currentTarget.value})}
              />
            </form>
          )}
          {refundType === 'balance' && (
            <div className='flex justify-center mt-4'>
              <Button 
                onClick={() => handleBalanceRefund(cancel?.bid, true, true)}
              >
                Подтвердить
              </Button>
            </div>
          )}
          {refundType === 'card' && (
            <div className='flex justify-center mt-4'>
              <Button 
                onClick={handleCardRefund}
                disabled={!((refund?.iban?.toString()?.length > 10) && (refund?.iin?.toString()?.length > 6))}
              >
                Подтвердить
              </Button>
            </div>
          )}
        </div>
      </Modal>
      {/* <Modal
        opened={modal}
        onClose={() => setModal(false)}
        centered
        size={'xs'}
        title='Данные партнера'
      >
        <img 
          src={getImageUrl(user?.expand?.sponsor, user?.expand?.sponsor?.avatar)} 
          alt="" 
          className='w-[150px] h-[150px] object-cover rounded-full mx-auto mb-5 bg-slate-300'
        />
        <ul className='space-y-2'>
          <li className='grid grid-cols-2'>
            <p>ID:</p>
            <p>{user?.expand?.sponsor?.id}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Имя:</p>
            <p>{user?.expand?.sponsor?.name}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Фамилия:</p>
            <p>{user?.expand?.sponsor?.surname}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Телефон:</p>
            <p>{user?.expand?.sponsor?.phone}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Область:</p>
            <p>{user?.expand?.sponsor?.region}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Партнеры:</p>
            <p>{user?.expand?.sponsor?.referals?.length}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Бинар:</p>
            <p>{user?.expand?.sponsor?.bin ? 'Да' : 'Нет'}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Уровень:</p>
            <p>{user?.expand?.sponsor?.level}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Дата рег:</p>
            <p>{dayjs(user?.expand?.sponsor?.created).format('DD.MM.YY')}</p>
          </li>
        </ul>
      </Modal> */}
    </>
  )
}
