import React from 'react'

import { CourseUsefulFor } from './ui/CourseUsefulFor'
import { CourseHeader } from './ui/CourseHeader'
import { CourseCards } from './ui/CourseCards'
import { WhyOurCourse } from './ui/WhyOurCourse'
import { TeachComfort } from './ui/TeachComfort'
import { Currator } from './ui/Currator'

export const Courses = () => {
  return (
    <main className="container">
      <CourseHeader />
      <CourseCards />
      <WhyOurCourse />
      <CourseUsefulFor />
      <TeachComfort />
      <Currator />
    </main>
  )
}
