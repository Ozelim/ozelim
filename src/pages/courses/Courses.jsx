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


export const Courses = () => {

  const {headings, text, images} = usePageData('course')

  const onSubmit = async (data) => {
    await pb.collection('bids').create({
      ...data,
      type: 'course'
    })
  }

  return (
    <main className="w-full">
      <CourseHeader 
        headings={headings} 
        text={text} 
        images={images}
      />
      <CourseCards 
        headings={headings}  
        text={text} 
      />
      <WhyOurCourse headings={headings} text={text} />
      <CourseUsefulFor />
      <TeachComfort headings={headings} text={text} />
      <CourseCurrator
        name="Ильясова Бахытжан Ильясовна"
        img={curratorCourse}
        desc="Предприниматель, психолог, бизнес-советник, директор Центра сертификации специалистов «САПА»"
      />
      <HealthLink onSubmit={onSubmit}  label={'Оставить заявку'} heading={'Узнать больше'}/>
    </main>
  )
}
