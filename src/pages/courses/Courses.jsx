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

async function getCourses() {
  const text = await pb
    .collection('text')
    .getFullList({ filter: `page = 'course'` })
  const images = await pb
    .collection('images')
    .getFullList({ filter: `page = 'course'` })
  const slider = await pb
    .collection('slider')
    .getFullList({ filter: `page = 'course'` })
  return {
    text: text[0],
    images: images[0],
    slider: slider[0],
  }
}

export const Courses = () => {
  const onSubmit = async (data) => {
    await pb.collection('bids').create({
      ...data,
      type: 'course'
    })
  }

  const [course, setCourse] = React.useState({})

  const headings = course?.text?.headings
  const text = course?.text?.text
  const slider = course?.slider?.image



  React.useEffect(() => {
    getCourses().then((res) => {
      setCourse(res)
    })
  }, [])

  return (
    <main className="container">
      <CourseHeader headings={headings} course={course} text={text} />
      <CourseCards headings={headings} text={text} />
      <WhyOurCourse headings={headings} text={text} />
      <CourseUsefulFor />
      <TeachComfort headings={headings} text={text} />
      <CourseCurrator
        name="Ильясова Бахытжан Ильясовна"
        img={curratorCourse}
        desc="Предприниматель, психолог, бизнес-советник, директор Центра сертификации специалистов «САПА»"
      />
      <HealthLink onSubmit={onSubmit} />
    </main>
  )
}
