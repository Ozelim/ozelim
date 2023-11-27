import React from 'react'
import { UserData } from 'entities/useData'
import dayjs from 'dayjs'
import { ReferalsList } from 'entities/referalsList'
import { pb } from 'shared/api'
import { Button, LoadingOverlay, Table } from '@mantine/core'
import { useAuth } from 'shared/hooks'

import Tree from 'react-d3-tree'
import { formatNumber } from 'shared/lib'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { sha512 } from 'js-sha512'


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

  const {user, loading} = useAuth()
  const navigate = useNavigate()

  const [count, setCount] = React.useState(0) 

  React.useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login')
      } 
    }
  }, [loading])
  
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
          level: `1`
        })
        return
      }
      if (user?.level == 1) {

        if (
              binary?.children?.[0]?.children?.[0]?.value && 
              binary?.children?.[0]?.children?.[1]?.value && 
              binary?.children?.[1]?.children?.[0]?.value && 
              binary?.children?.[2]?.children?.[1]?.value 
          ){
          pb.collection('users').update(user?.id, {
            level: `2-3`
          })
          return
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
        AMOUNT: 10,
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
      console.log(all, 'all');
      const sign = sha512(all).toString()
      console.log(sign, 'sign');

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

  async function verifyUser(userId) {

    setVerifyLoading(true)
    await pb.admins.authWithPassword('helper@mail.ru', import.meta.env.VITE_APP_PASSWORD)
    .then(async res => {
      await pb.collection("users").update(userId, {
        verified: true,
      })
      .then(async res => {
        const sponsor = await pb.collection('users').getOne(res?.sponsor)
        await pb.collection('users').update(sponsor?.id, {
          referals: [...sponsor?.referals, res?.id]
        })
      
        const referals = await pb.collection('users').getFullList({filter: `sponsor = '${sponsor?.id}' && verified = true`})
  
        if (referals?.length === 1) {
          await pb.collection('users').update(sponsor?.id, {
            balance: sponsor?.balance + 30000            
          })
          .finally(async () => {
            pb.authStore.clear()
            window.location.reload()
          })            
        }

        if (referals?.length >= 4) {
          await pb.collection('users').update(sponsor?.id, {
            balance: sponsor?.balance + 15000            
          })
          .finally(async () => {
            pb.authStore.clear()
            window.location.reload()
          })            
        }

        pb.authStore.clear()
        window.location.reload()
        // setLoading(false)
      })
      .catch(err => {
        // setLoading(false)
      })
      .finally(() => {
        setVerifyLoading(false)
      })
    })
    .finally(() => {
      setVerifyLoading(false)
    })
  }

  async function checkPaymentStatus () {
    const token = import.meta.env.VITE_APP_SHARED_SECRET
    const string = `${user?.pay?.ORDER};${user?.pay?.MERCHANT}`
    const sign = sha512(token + string).toString()
    if (user?.pay?.MERCHANT && user?.pay?.ORDER && !user?.verified) {
      await axios.post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/check`, {
        ORDER: user?.pay?.ORDER,
        MERCHANT: user?.pay?.MERCHANT,
        GETSTATUS: 1,
        P_SIGN: sign,
      })
      .then(async res => {
        console.log(res, 'response');
        console.log(res?.data?.includes('Обработано успешно'), 'res');
        if (res?.data?.includes('Обработано успешно')) {
          verifyUser(user?.id)
        }
      })
      .catch(err => {
        console.log(err);
      })

    }
  }

  React.useEffect(() => {
    checkPaymentStatus()
  }, [user])

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
    <div className="w-full">
      <div className="container">
        <div className="w-full bg-white shadow-md rounded-primary p-4">
          <div className="grid lg:grid-cols-[25%_auto] gap-6">
            <UserData count={count} setCount={setCount} />
            <div className="relative overflow-hidden">
              <ReferalsList level={level} setCount={setCount} />
              <div className="mt-10 overflow-auto">
              <div className='flex gap-4 items-center mb-4'>
                <p>
                  Бинарное дерево:
                </p>
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
              </div>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// async function getPyramidByUser (userId) {

//   if (userId) {
//     const pyramid = (
//       await pb
//         .collection("pyramid")
//         .getFullList({ expand: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12" })
//     )[0];
//     const pyramidsUser = await pb.collection("users").getOne(userId);
//     let foundUser = null;
//     let result = [];

//     for (const stage in pyramid) {
//       if (!isNaN(stage)) {
//         const stageArrays = pyramid?.expand?.[stage];
//         const stageUser = stageArrays?.find((e) => e?.id === userId);
//         if (stageUser) {
//           foundUser = userId;
//           const properties = Object.keys(pyramid?.expand);
//           // const pows = properties.length - Number(stage)

//           properties.map((key, i) => {
//             if (Number(key) > Number(stage)) {
//               // console.log(pyramid?.expand?.[key], key, stage, 'stage')
//               result.push(pyramid?.expand?.[key]);

//               return;
//             }
//           });

//           result = result?.map((arr, i) => {
//             return arr.slice(0, Math.pow(2, i + 1));
//           });
//           result.unshift([pyramidsUser]);
//         }
//       }
//     }

//     if (foundUser) {
//       return {
//         pyramid: pyramid,
//         result,
//       };
//     } else {
//       return {
//         pyramid: pyramid,
//         result: null,
//       };
//     }
// }

//   const pyramid = (
//     await pb
//       .collection("pyramid")
//       .getFullList({ expand: "sponsor, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12" })
//   )[0];

//   const sponsor = pyramid?.expand?.sponsor

//   // const pyramidsUser = await pb.collection("users").getOne(userId);
//   let result = [];

//   for (const stage in pyramid) {
//     if (!isNaN(stage)) {


//       result.push(pyramid?.expand?.[stage]);
//       // const stageUser = stageArrays?.find((e) => e?.id === sponsor);
//     }
//     result = result?.map((arr, i) => {
//       return arr?.slice(0, Math.pow(2, i + 1));
//     });
    
//   }

//   result?.unshift([sponsor]);

//   if (sponsor) {
//     return {
//       pyramid: pyramid,
//       result,
//     };
//   } else {
//     return {
//       pyramid: pyramid,
//       result: null,
//     };
//   }
// }
