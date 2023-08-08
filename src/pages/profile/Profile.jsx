import React from 'react'
import { UserData } from 'entities/useData'
import dayjs from 'dayjs'
import { ReferalsList } from 'entities/referalsList'
import { pb } from 'shared/api'
import { clsx } from '@mantine/core'
import { BinaryTree } from 'entities/pyramid/BinaryTree'
import { Avatar } from 'shared/ui'
import { useAuth } from 'shared/hooks'
import Draggable from 'react-draggable'
import Test from 'entities/pyramid/Test'

// async function getPyramid () {
//   return (await pb.collection('pyramid').getFullList({expand: 'sponsor, b1, b2, b4, b5, b6, b7, b8, b9, b10, b11, b12'}))[0]
// }

async function getPyramidByUser (userId) {

  const pyramid = (await pb.collection('pyramid').getFullList({expand: '1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12'}))[0]
  const pyramidsUser = await pb.collection('users').getOne(userId)
  let result = []

  for (const stage in pyramid) {
    if (!isNaN(stage)) {
      const stageArrays = pyramid?.expand?.[stage]
      if (stageArrays?.find(e => e?.id === userId)) {
        const properties = Object.keys(pyramid?.expand)
        // const pows = properties.length - Number(stage)

        properties.map((key, i) => {

          // if (Number(key) < Number(stage)) {
          //   binary = {
          //     ...binary, 
          //     // [key]: null,
          //     // [stage]: [pyramidsUser]
          //   }
          //   delete binary?.[key]
          //   delete [stage]
          //   return
          // }
          
          if (Number(key) > Number(stage)) {
            result.push(pyramid?.expand?.[key])
            // binary = {
            //   ...binary,
            //   [key]: pyramid?.expand?.[key]
            // }
            return 
          }

        })

        result = result?.map((arr, i) => {
          return arr.slice(0, Math.pow(2, i + 1));
        })

        result.unshift([pyramidsUser])
      }
    }
  }

  return {
    pyramid: pyramid,
    result
  }
}

const Binary = ({ root }) => {

  return <Node node={root} />;
};

const Node = ({ node }) => {
  if (!node) return null;

  return (
    <div className='my-4 text-center w-full'>
      
      {node?.value?.email && (
        <div className={clsx('relative bg-zinc-300 p-4 text-center inline-flex flex-col items-center rounded-primary')}>

          {/* <div className='absolute -top-[190px] left-1/2 -translate-x-1/2 h-[200px] w-1 bg-zinc-300'/> */}
          <Avatar
            record={node?.value}
            src={node?.value?.avatar}
            classNames={{
              placeholder: '!rounded-full !overflow-hidden'
            }}
          />
          <p className='text-sm mt-2'>
            {node?.value?.id}
          </p>
        </div>
      )}
      <div className='flex gap-8'>
        {node.left && <Node node={node.left} />}
        {node.right && <Node node={node.right} />}
      </div>
    </div>
  );
};

export const Profile = () => {

  const {user} = useAuth()

  const binaryTree = new BinaryTree(4);

  const [pyramid, setPyramid] = React.useState([])

  React.useEffect(() => {
    // getPyramid()
    // .then(res => {
    //   setPyramid(res?.expand)
    //   // binaryTree.insert(res?.expand?.sponsor)
    // })
    getPyramidByUser(user?.id)
    .then(res => {
      setPyramid(res.result)
    })
  }, [])


  const array = pyramid.flat(1)
  ?.map((stage, i) => {
      return binaryTree.insert(stage)
  })

  const tree = binaryTree.root

  // const contentRef = React.useRef(null);
  // const [isDragging, setIsDragging] = React.useState(false);
  // const [startX, setStartX] = React.useState(0);
  // const [startY, setStartY] = React.useState(0);

  // const handleMouseDown = (e) => {
  //   setIsDragging(true);
  //   setStartX(e.clientX);
  //   setStartY(e.clientY);
  // };

  // const handleMouseMove = (e) => {
  //   if (isDragging && contentRef.current) {
  //     const dx = e.clientX - startX;
  //     const dy = e.clientY - startY;
  //     contentRef.current.scrollTop -= dy;
  //     contentRef.current.scrollLeft -= dx;
  //     setStartX(e.clientX);
  //     setStartY(e.clientY);
  //   }
  // };

  // const handleMouseUp = () => {
  //   setIsDragging(false);
  // };

  return (
    <div className='w-full'>
      <div className="container">
        <div className='w-full bg-white shadow-md rounded-primary p-4'>
          <div className="grid grid-cols-[25%_auto] gap-6">
            <UserData/>
            <div className='relative overflow-hidden'>
              <ReferalsList/>
              <div 
                // className='overflow-scroll '
                // ref={contentRef}
                // onMouseDown={handleMouseDown}
                // onMouseMove={handleMouseMove}
                // onMouseUp={handleMouseUp}  
              >
                <div className='w-full overflow-auto'>
                  <Test treeData={tree} />
                </div>
                <div className='w-[2000px] h-full overflow-auto'>

                  <Draggable
                    handle='.handle'
                  >
                    <div className='handle'>
                      <Binary root={tree} />
                    </div>
                  </Draggable>

    
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
          </div>
          <div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
