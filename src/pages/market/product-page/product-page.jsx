import { Button, Rating, Textarea } from '@mantine/core'
import dayjs from 'dayjs'
import React from 'react'
import { useParams } from 'react-router-dom'

export const ProductPage = () => {

  const {id} = useParams()

  return (
    <div className='container-market market'>
      <div className="grid grid-cols-2 gap-4">
        <div className='grid grid-cols-[15%_auto] gap-4 overflow-hidden h-[558px]'>
          <div className="flex flex-col gap-4 w-full overflow-y-auto">
            {Array(11).fill(1).map((q, i) => {
              return (
                <img 
                  src="https://people.com/thmb/NDasPbZOWfpi2vryTpDta_MJwIY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(602x285:604x287)/newjeans-111023-1-c7ed1acdd72e4f2eb527cc38144aa2d4.jpg" 
                  alt="" 
                  className='aspect-square object-cover'
                  key={i}
                />
              )
            })}
          </div>
          <img 
            src="https://people.com/thmb/NDasPbZOWfpi2vryTpDta_MJwIY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(602x285:604x287)/newjeans-111023-1-c7ed1acdd72e4f2eb527cc38144aa2d4.jpg" 
            alt="" 
            className='aspect-square object-cover '
          />

        </div>
        <div>
          <h1 className='text-3xl '>
            Lorem, ipsum dolor.
          </h1>

          <Rating className='mt-4' size='xl'/>

          <p className='mt-4 text-3xl'>
            10 000
          </p>

          <div className='mt-4'>
            <p className='text-xl'>
              Описание:
            </p>
            <p className='text-xl tracking-wide'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam animi placeat sunt, voluptate accusamus ipsam aspernatur laborum ducimus id quis nihil repudiandae in minus ratione suscipit quaerat veritatis nulla consectetur laudantium maiores voluptas quidem! Magnam ipsa expedita in ea molestiae sit quasi, at soluta! Dolorem quo aspernatur excepturi rem distinctio!
            </p>
            
            <div className='mt-4 flex gap-4 '>
              <Button size='lg'>
                В корзину
              </Button>

              <Button size='lg'>
                Купить
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-[860px] mx-auto mt-8'>
        <p className='text-2xl '>
          Отызы (123)
        </p>
        <div className='mt-4'>
          <div className='gap-4 items-center'>
            <Textarea
              label='Отзыв'
            />
            <div className='flex justify-end mt-4'>
              <Button>
                Оставить отзыв
              </Button>
            </div>
          </div>
          <div className='flex flex-col gap-6 mt-4'> 
            {Array(5).fill(1).map((q, i) => {
              return (
                <div 
                  key={i}
                  className='flex gap-4 border-t-2 first:border-none pt-6'
                >
                  <img 
                    alt="" 
                    src="https://people.com/thmb/NDasPbZOWfpi2vryTpDta_MJwIY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(602x285:604x287)/newjeans-111023-1-c7ed1acdd72e4f2eb527cc38144aa2d4.jpg" 
                    className='w-20 h-20 aspect-square object-cover'
                  />
                  <div>
                    <p>Lorem, ipsum.</p>
                    <div className='mt-1 flex gap-4'>
                      <Rating size='sm'/>
                      <p>{dayjs(new Date()).format('DD MMMM YYYY')}</p>
                    </div>

                    <p className='mt-2'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit delectus eius tempora corrupti nostrum modi id. Qui consequuntur asperiores laudantium. Eligendi numquam at corrupti nemo repellat quis adipisci optio cum!
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nulla libero perferendis minus suscipit ipsam quo id saepe maxime recusandae, animi asperiores esse, dolore vero quam optio molestiae illo inventore!
                    </p>

                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
