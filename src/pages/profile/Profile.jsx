import React from 'react'
import { UserData } from 'entities/useData'
import dayjs from 'dayjs'
import { ReferalsList } from 'entities/referalsList'
import { pb } from 'shared/api'
import { Button, clsx, Loader, Table } from '@mantine/core'
import { Avatar } from 'shared/ui'
import { useAuth } from 'shared/hooks'
import Test from 'entities/pyramid/Test'

import Tree from 'react-d3-tree'
import { formatNumber } from 'shared/lib'
import { useNavigate } from 'react-router-dom'


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

async function getBinaryById (id) {
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

  const [level, setLevel] = React.useState(0)

  function signout () {
    pb.authStore.clear()
    window.location.reload()
  }

  React.useEffect(() => {
    if ((binary?.children?.[0]?.value && binary?.children?.[1]?.value) && user?.level == 0) { 
      pb.collection('users').update(user?.id, {
        level: `1-3`
      })
    }
  }, [binary])

  React.useEffect(() => {
    setLevel((!user?.level || user?.level == '0') ? 0 : user?.level)
  }, [user])

  if (loading) {
    return <></>
  }



  async function handleNodeClick (data) {
    getBinaryById(data?.value?.id)
    .then(async res => {
      const slot = await pb.collection('binary').getOne(data?.value?.id, {expand: 'sponsor, children'}) 
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

  if (!user?.verified) {
    return (
      <div className='flex justify-center items-center h-full'>
        <div>
          Ваш профиль не верифицирован, ваш ID: {user?.id}
          <p className='text-center'>Пожалуйста обратитесь в службу поддержки</p>
          <div className='text-center'>
            <Button
              compact
              variant='outline'
              color='red'
              onClick={signout}
            >
              Выйти
            </Button>
          </div>
          <div className='flex justify-center gap-4 mt-4'>
            <Button>
              Конпка 1
            </Button>
            <Button>
              Конпка 2
            </Button>
          </div>
        </div>
      </div>
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
