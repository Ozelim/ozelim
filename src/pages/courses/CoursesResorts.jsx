import React from 'react'
import { CourseHeader } from './ui/CourseHeader'
import { CourseCards } from './ui/CourseCards'
import { WhyOurCourse } from './ui/WhyOurCourse'
import { TeachComfort } from './ui/TeachComfort'
import { usePageData } from 'shared/hooks'
import { Image } from 'shared/ui'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useLangContext } from 'app/langContext'

export const CoursesResorts = () => {

  const {kz} = useLangContext()

  const {headings, text, images} = usePageData('course_resorts')

  return (
    <main className="w-full">
      <CourseHeader headings={headings} text={text} images={images} />
      <CourseCards headings={headings} text={text} />
      <WhyOurCourse headings={headings} text={text} />
      <div className="w-full mt-10">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-4">
            {images?.[2] && (
              <Image
                record={images}
                index={2}
                className='rounded-primary w-full h-64 max-w-md mx-auto md:max-w-full bg-white'
              />
            )}
            {images?.[3] && (
              <Image
                record={images}
                index={3} 
                className='rounded-primary w-full h-64 max-w-md mx-auto md:max-w-full bg-white'
              />
            )}
            {images?.[4] && (
              <Image
                record={images}
                index={4} 
                className='rounded-primary w-full h-64 max-w-md mx-auto md:max-w-full bg-white'
              />
            )}
          </div>
        </div>
      </div>
      <TeachComfort headings={headings} text={text} />
      <div className="container mt-8">
        {/* <div className="grid lg:grid-cols-3 gap-4">
          {Array(3)
            .fill(1)
            .map((_, i) => {
              const index = i + 1
              return (
                <div
                  key={index}
                  className="border p-6 bg-white rounded-primary flex flex-col"
                >
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex flex-col">
                      <h2 className="text-xl text-primary-500">{text?.[`label${index}`]}</h2>
                      <p className="text-orange-500 font-semibold text-lg">
                        {text?.[`cost${index}`]}
                      </p>
                    </div>
                  </div>
                  <div
                    className="mt-4 grow"
                    // dangerouslySetInnerHTML={{
                    //   __html: text?.[`editor${index}`],
                    // }}
                  />

                  <a className='text-center' href="http://wa.me/77051769699" target="_blank" rel="noopener noreferrer">
                    <Button>
                      {kz ? 'Өтініш қалдыру' : `Оставить заявку`}
                    </Button>
                  </a>
                </div>
              )
            })}
        </div> */}
        <div className='flex justify-center w-full'>
          <a className='text-center' href="http://wa.me/77051769699" target="_blank" rel="noopener noreferrer">
            <Button size='lg'>
              {kz ? 'Өтініш қалдыру' : `Оставить заявку`}
            </Button>
          </a>
        </div>
      </div>
      <div className='text-center mt-10'>
        <Link to={'/price'} className='text-blue-500 underline'>
          {kz ? `Бағалар туралы көбірек біліңіз` : `Узнать подробнее о ценах`}
        </Link>
      </div>
    </main>
  )
}
