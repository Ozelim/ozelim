import React from 'react'
import { UserData } from 'entities/useData'
import dayjs from 'dayjs'
import { ReferalsList } from 'entities/referalsList'
import { pb } from 'shared/api'
import { clsx } from '@mantine/core'
import { BinaryTree } from 'entities/pyramid/BinaryTree'


async function getPyramid () {
  return (await pb.collection('pyramid').getFullList({expand: 'b1, b2, b4, b5, b6, b7, b8, b9, b10, b11, b12'}))[0]
}

export const Profile = () => {

  const binaryTree = new BinaryTree();

  const [pyramid, setPyramid] = React.useState([])

  React.useEffect(() => {
    getPyramid()
    .then(res => {
      setPyramid(res?.expand)
    })
  }, [])

  const array = Object.keys(pyramid).map((stage, i) => {
 
    return pyramid?.[stage]
    // ?.map((faggot, i) => {
    //   return <div>{stage} {faggot?.name}</div>
    // })
  })?.map((stage, i) => {
    return stage?.map(e => {
      return binaryTree.insert(e)
    })
  })

  console.log(binaryTree);

  return (
    <div className='w-full'>
      <div className="container">
        <div className='w-full bg-white shadow-md rounded-primary p-4'>
          <div className="grid grid-cols-[25%_auto] gap-6">
            <UserData/>
            <div className='relative overflow-hidden'>
              <ReferalsList/>
              <div>
  
                {/* <div className='overflow-scroll w-[9999px] h-screen'>
                  {array.map((faggots, i) => {
                    return (
                      <div
                        className='min-w-full flex justify-center text-center gap-4 mt-4'
                        // style={{
                        //   display: 'grid',
                        //   gridTemplateColumns: `repeat(${Math.pow(2, i + 1)}, minmax(0, 1fr))`,
                        // }}
                      >
                        {faggots?.map((faggot, index) => {
                          return (
                            <div>
                              <p>
                              {i + 1}  {faggot?.email}
                              </p>
                              <p>
                                {faggot?.id}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })} 
                </div> */}
              </div>
            </div>
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
