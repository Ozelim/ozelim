import { BuyFranchise } from 'modules/BuyFranchise'
import { CourseAbout } from 'modules/CourseAbout'
import { CuratorCourse } from 'modules/CuratorCourse'
import { HaveQuestions } from 'modules/HaveQuestions'
import { JobTeachPractice } from 'modules/JobTeachPractice'
import { NewFormat } from 'modules/NewFormat'
import { OnlineCourseManager } from 'modules/OnlineCourseManager'
import { OurPartners } from 'modules/OurPartners'
import { PriceList } from 'modules/PriceList'
import { Regions } from 'modules/Regions'
import { Results } from 'modules/Results'
import { TeachPacks } from 'modules/TeachPacks'
import { TeachingProgram } from 'modules/TeachingProgram'
import { TourWeb } from 'modules/TourWeb'
import { TouristAgency } from 'modules/TouristAgency'
import { VacationPlan } from 'modules/VacationPlan'
import { Resort } from 'pages'
import { TeachComfort } from 'pages/courses/ui/TeachComfort'
import { WhyOurCourse } from 'pages/courses/ui/WhyOurCourse'
import React from 'react'
import { TourOperators } from 'modules/TourOperators'

export const Test = () => {
  return (
    <div>
      <Results />
      <NewFormat />
      <PriceList />
      <HaveQuestions />
      <OnlineCourseManager />
      <JobTeachPractice />
      <WhyOurCourse />
      <CourseAbout />
      <TeachingProgram />
      <TeachPacks />
      <TeachComfort />
      <OurPartners />
      <CuratorCourse />
      <TourWeb />
      <BuyFranchise />
      <TouristAgency />
      <VacationPlan />
      <Resort />
      <Regions />
      <TourOperators/>
    </div>
  )
}
