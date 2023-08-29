import React from 'react'
import { UserData } from 'entities/useData'
import dayjs from 'dayjs'
import { ReferalsList } from 'entities/referalsList'
import { pb } from 'shared/api'
import { clsx, Loader, Table } from '@mantine/core'
import { BinaryTree } from 'entities/pyramid/BinaryTree'
import { Avatar } from 'shared/ui'
import { useAuth } from 'shared/hooks'
import Draggable from 'react-draggable'
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
// async function getPyramid () {
//   return (await pb.collection('pyramid').getFullList({expand: 'sponsor, b1, b2, b4, b5, b6, b7, b8, b9, b10, b11, b12'}))[0]
// }

function CustomNode({ nodeData, toggleNode }) {

  const data = nodeData?.value

  return (
    <g stroke="grey" fill="grey" strokeWidth="0.7">
      <circle
        r={10}
        fill={nodeData.children ? 'Aquamarine' : '#ccc'}
        onClick={toggleNode}
      />

      <text
        stroke="green"
        x={-60}
        y={-18}
        style={{ fontSize: '12px' }}
        textAnchor="start"
      >
        {data?.name} {data?.surname}
      </text>

      <text
        stroke="green"
        x={-48}
        y={25}
        style={{ fontSize: '13px' }}
        textAnchor="start"
      >
        ID: {data?.id}
      </text>

      <text
        stroke="grey"
        x={-48}
        y={40}
        style={{ fontSize: '12px' }}
        textAnchor="start"
      >
        {dayjs(data?.created).format('YYYY-MM-DD hh:mm')}
      </text>
    </g>
  )
}

async function getPyramidByUser (userId) {

  if (userId) {
    const pyramid = (
      await pb
        .collection("pyramid")
        .getFullList({ expand: "1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12" })
    )[0];
    const pyramidsUser = await pb.collection("users").getOne(userId);
    let foundUser = null;
    let result = [];

    for (const stage in pyramid) {
      if (!isNaN(stage)) {
        const stageArrays = pyramid?.expand?.[stage];
        const stageUser = stageArrays?.find((e) => e?.id === userId);
        if (stageUser) {
          foundUser = userId;
          const properties = Object.keys(pyramid?.expand);
          // const pows = properties.length - Number(stage)

          properties.map((key, i) => {
            if (Number(key) > Number(stage)) {
              // console.log(pyramid?.expand?.[key], key, stage, 'stage')
              result.push(pyramid?.expand?.[key]);

              return;
            }
          });

          result = result?.map((arr, i) => {
            return arr.slice(0, Math.pow(2, i + 1));
          });
          result.unshift([pyramidsUser]);
        }
      }
    }

    if (foundUser) {
      return {
        pyramid: pyramid,
        result,
      };
    } else {
      return {
        pyramid: pyramid,
        result: null,
      };
    }
}

  const pyramid = (
    await pb
      .collection("pyramid")
      .getFullList({ expand: "sponsor, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12" })
  )[0];

  const sponsor = pyramid?.expand?.sponsor

  // const pyramidsUser = await pb.collection("users").getOne(userId);
  let result = [];

  for (const stage in pyramid) {
    if (!isNaN(stage)) {


      result.push(pyramid?.expand?.[stage]);
      // const stageUser = stageArrays?.find((e) => e?.id === sponsor);
    }
    result = result?.map((arr, i) => {
      return arr?.slice(0, Math.pow(2, i + 1));
    });
    
  }

  result?.unshift([sponsor]);

  if (sponsor) {
    return {
      pyramid: pyramid,
      result,
    };
  } else {
    return {
      pyramid: pyramid,
      result: null,
    };
  }
}

export const Profile = () => {

  const {user, loading} = useAuth()
  
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login')
        console.log('not logged');
      } 
    }
  }, [loading])

  const binaryTree = new BinaryTree(8);

  const [pyramid, setPyramid] = React.useState([])
  
  const [withdraws, setWithdraws] = React.useState([])
  const [transfers, setTransfers] = React.useState([])

  React.useEffect(() => {
    // getPyramid()
    // .then(res => {
    //   setPyramid(res?.expand)
    //   // binaryTree.insert(res?.expand?.sponsor)
    // })
    getWithdraws(user?.id)
    .then(res => {
      setWithdraws(res)
    })
    getTransfers(user?.id)
    .then(res => {
      setTransfers(res)
    })

    getPyramidByUser(user?.id !== '111111111111111' ? user?.id : false)
    .then(res => {
      setPyramid(res?.result)
    })
  }, [])

  const [tree, setTree] = React.useState({})
  const [level, setLevel] = React.useState(0)

  const [load, setLoad] = React.useState(true)

  React.useEffect(() => {
    pyramid?.flat(1)
    ?.map((stage, i) => {
      return binaryTree.insert(stage)
    })
    if (binaryTree.root) {
      setTree(binaryTree.root)
      setLoad(false)
    }
  }, [pyramid])

  React.useEffect(() => {
  }, [binaryTree])

  React.useEffect(() => {
    if (binaryTree.findMaxLevel()) {
      setLevel(binaryTree.findMaxLevel())
    }
  }, [binaryTree])

  if (!user?.verified) {
    return (
      <div className='flex justify-center items-center h-full'>
        Ваш профиль не верифицирован, ваш ID: {user?.id}
      </div>
    ) 
  }

  return (
    <div className="w-full">
      <div className="container">
        <div className="w-full bg-white shadow-md rounded-primary p-4">
          <div className="grid grid-cols-[25%_auto] gap-6">
            <UserData />
            <div className="relative overflow-hidden">
              <ReferalsList level={level} />
              <div className="mt-10 overflow-auto">
                <div className="h-[70vh] border-2 border-primary-400 p-4 ">
                  {tree?.value ? (
                    <>
                      <Tree
                        data={tree ?? {}}
                        orientation="vertical"
                        pathFunc="elbow"
                        nodeSvgShape={{
                          shape: 'circle',
                          shapeProps: { r: 10, fill: 'green' },
                        }}
                        renderCustomNodeElement={({
                          nodeDatum,
                          toggleNode,
                        }) => (
                          <CustomNode
                            nodeData={nodeDatum}
                            toggleNode={toggleNode}
                          />
                        )}
                      />
                    </>
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      Для отображения структуры пройдите условия партнерской
                      программы
                    </div>
                  )}
                </div>
                {withdraws?.length !== 0 && (
                  <div className="mt-12">
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
                              <td>
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
                  <div className="mt-12">
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
                              <td>
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
