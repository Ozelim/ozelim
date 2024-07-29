import { Accordion, BackgroundImage, Button, Modal, Text, clsx } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import React from 'react'
import ReactPlayer from 'react-player'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { pb } from 'shared/api'
import { getImageUrl } from 'shared/lib'

import bussines from 'shared/assets/images/modal-business.png'
import { useAuth } from 'shared/hooks'

async function getCourses () {
  return await pb.collection('profile_courses').getFullList()
}

export const ProfileCourse = () => {

  const {user} = useAuth()

  React.useEffect(() => {
    if (!user.verified) navigate('/')
  }, [user])

  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()

  const [courses, setCourses] = React.useState([])

  const [modal, setModal] = React.useState(false)

  const [course, setCourse] = React.useState({})

  React.useEffect(() => {
    getCourses()
    .then(res => {
      setCourses(res)
    })
  }, [])

  const filteredCourses = courses.filter(c => {
    return c.id === searchParams.get('course')
  })

  React.useEffect(() => {
    setCourse(courses?.filter(c => {
      return c?.id === searchParams.get('course')
    })?.[0] ?? {})
  }, [searchParams, courses]) 

  const [lesson, setLesson] = React.useState({})

  React.useEffect(() => {
    setLesson({...course?.lessons?.[0], index: 0})
  }, [course])

  if (searchParams.get('show')) return (
    <div className='w-full'>
      <div className="container">
        <div className="w-full grid grid-cols-[30%_auto] bg-white shadow-lg rounded-md h-full border">
          <div>
            <h1 className='text-3xl font-head p-3 border-b border-r'>
              {course?.name}
            </h1>
            <div className='flex flex-col'>
              {course?.lessons?.map((l, i) => {
                return (
                  <div 
                    className={clsx('p-3 cursor-pointer', {
                      'bg-primary-500 text-white': lesson?.id === l?.id
                    })}
                    onClick={() => {
                      if (lesson !== l) setLesson({...l, index: i})
                    }}
                  >
                    <Text lineClamp={1}>
                      {l?.name}
                    </Text>
                  </div>
                )
              })}
            </div>
          </div>
          <div className='max-h-full'>
            <div className='aspect-video'>
              <ReactPlayer 
                url={lesson?.link}
                onProgress={() => console.log('logading')}
                width={'100%'}
                height={'100%'}
              />
            </div>
            <div className='flex justify-center my-4 gap-8'>
              <Button 
                className='max-w-fit mt-2'
                onClick={() => {
                  setLesson({...course?.lessons?.[lesson?.index - 1], index: lesson?.index - 1})
                }}
                disabled={lesson?.index === 0}
                color='gray'
              >
                Предыдущий урок
              </Button>
              {lesson?.index + 1 === course?.lessons?.length 
                ? (
                  <Button 
                    className='max-w-fit mt-2'
                    onClick={() => {
                      navigate('/test-1&7-results-nonrefv3noOdl3_swePVrule34b1qle5-1KSh4m5ter7397ndjk')
                      setSearchParams({
                        test: course?.test_id
                      })
                    }}
                    color='blue'
                  >
                    Перейти к тесту
                  </Button>
                ) : (
                  <Button 
                    className='max-w-fit mt-2'
                    onClick={() => {
                      setLesson({...course?.lessons?.[lesson?.index + 1], index: lesson?.index + 1})
                    }}
                    disabled={lesson?.index + 1 === course?.lessons?.length}
                  >
                    Следуйщий урок
                  </Button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className='w-full'>
        <div className="container">
          <div className="w-full">
            <h2 className='font-head text-4xl font-semibold'>Курсы и программы</h2>
            <div className='grid grid-cols-[300px_auto] mt-10 gap-6'>
              <div className='flex flex-col gap-y-4'>
                <Button 
                  variant={searchParams.get('course') == null ? 'gradient' : 'outline'}
                  onClick={() => {
                    setSearchParams({})
                  }}
                >
                  Все курсы
                </Button>
                {courses?.map(c => {
                  return (
                    <Button 
                      variant={searchParams.get('course') === c?.id ? 'gradient' : 'outline'}
                      onClick={() => {
                        setSearchParams({
                          course: c?.id
                        })
                      }}
                      key={c?.id}
                    >
                      {c?.name}
                    </Button>
                  )
                })}
              </div>
              <div className='grid grid-cols-3 gap-x-4 gap-y-10'>
                {(searchParams.get('course') ? filteredCourses : courses).map(c => {
                  return (
                    <div 
                      className='max-w-[278px] space-y-4 max-h-96' 
                      key={c?.id}
                      onClick={() => {
                        setSearchParams({
                          course: c?.id, 
                        })
                        setModal(true)
                        setCourse(c)
                      }}
                    >
                      <img 
                        src={getImageUrl(c, c?.img)} alt="" 
                        className='aspect-square object-cover max-w-[278px] max-h-[278px] h-full'
                      />
                      <p className='font-bold text-xl'>
                        {c.name}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        opened={modal}
        onClose={() => setModal(false)}
        centered
        classNames={{
          title: '!text-2xl',
        }}
        size='lg'
      >
        <img src={bussines} alt="" className='max-w-full h-64 object-cover blur-sm absolute -z-10 left-1/2 -translate-x-1/2' />
          <div className='flex flex-col justify-center items-center h-64'>
            <p className='text-3xl font-semibold bg-slate-700 bg-opacity-60 text-white p-3 rounded-lg '>{course?.name}</p>
            <Button
              onClick={() => {
                setSearchParams({
                  course: searchParams.get('course'),
                  show: true
                })
              }}
              className='mt-4'
            >
              Перейти к курсу
            </Button>
          </div>
        <p className='mt-8 text-center text-lg tracking-wider mb-6'>{course?.description}</p>
      </Modal>
    </>
  )
}
