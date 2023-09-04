import React from 'react'
import { CourseUsefulFor } from './ui/CourseUsefulFor'
import { CourseHeader } from './ui/CourseHeader'
import { CourseCards } from './ui/CourseCards'
import { WhyOurCourse } from './ui/WhyOurCourse'
import { TeachComfort } from './ui/TeachComfort'
import { CourseCurrator } from './ui/CourseCurrator'
import curratorCourse from 'shared/assets/images/curratorCourse.jpg'
import { HealthLink } from 'shared/ui/HealthLink'
import { pb } from 'shared/api'
import { usePageData } from 'shared/hooks'
import { BsBag, BsFillBagHeartFill } from 'react-icons/bs'


export const Courses = () => {

  const {headings, text, images} = usePageData('course')

  const [label, setLabel] = React.useState(text?.[`label${1}`])

  const onSubmit = async (data) => {
    await pb.collection('bids').create({
      ...data,
      type: 'course'
    })
  }

  return (
    <main className="w-full">
      <CourseHeader headings={headings} text={text} images={images} />
      <CourseCards headings={headings} text={text} />
      <WhyOurCourse headings={headings} text={text} />
      <CourseUsefulFor />
      <TeachComfort headings={headings} text={text} />
      {/* <CourseCurrator
        name="Ильясова Бахытжан Ильясовна"
        img={curratorCourse}
        desc="Предприниматель, психолог, бизнес-советник, директор Центра сертификации специалистов «САПА»"
      /> */}
      <div className="container mt-14">
        <div className="grid grid-cols-3 gap-4">
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
                    <BsFillBagHeartFill color="teal" size={40} />
                    <div className="flex flex-col">
                      <h2 className="text-xl">{text?.[`label${index}`]}</h2>
                      <p className="text-orange-500 font-semibold text-lg">
                        {text?.[`cost${index}`]} тенге
                      </p>
                    </div>
                  </div>
                  <div
                    className="mt-4 grow"
                    dangerouslySetInnerHTML={{
                      __html: text?.[`editor${index}`],
                    }}
                  />
                  <HealthLink label={'Оставить заявку'} onSubmit={onSubmit} data={text?.[`label${index}`]} />
                </div>
              )
            })}
        </div>
      </div>
    </main>
  )
}
