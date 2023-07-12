import React from 'react'
import { Results } from 'modules/Results'
import { HaveQuestions } from 'modules/HaveQuestions'
import { OnlineCourseManager } from 'modules/OnlineCourseManager'
import { JobTeachPractice } from 'modules/JobTeachPractice'
import { CourseUsefulFor } from 'modules/CourseUsefulFor'
import { WhyOurCourse } from 'modules/WhyOurCourse'
import { CourseAbout } from 'modules/CourseAbout'
import { TeachingProgram } from 'modules/TeachingProgram'
import { TeachPacks } from 'modules/TeachPacks'
import { TeachComfort } from 'modules/TeachComfort'
import { OurPartners } from 'modules/OurPartners'
import { CuratorCourse } from 'modules/CuratorCourse'
import { TourWeb } from 'modules/TourWeb'
import { NewFormat } from 'modules/NewFormat'
import { BuyFranchise } from 'modules/BuyFranchise'
import { Franchise } from 'modules/Franchise'
import { TouristAgency } from 'modules/TouristAgency'
import { TourOperators } from 'modules/TourOperators'
import { VacationPlan } from 'modules/VacationPlan'
import { Currort } from 'modules/Currort'
import { Quiz } from 'modules/Quiz'
import { PriceList } from 'modules/PriceList'
import { Regions } from 'modules/Regions'

export const Home = () => {
  return (
    <div className="space-y-20">
      <Results/>
      <NewFormat/>
      <HaveQuestions/>
      <OnlineCourseManager/>
      <JobTeachPractice/>
      <CourseUsefulFor/>
      <WhyOurCourse/>
      <CourseAbout/>
      <TeachingProgram/>
      <TeachPacks/>
      <TeachComfort/>
      <OurPartners/>
      <CuratorCourse/>
      
      <BuyFranchise/>
      <TourWeb/>
      <Franchise/>
      <TouristAgency/>
      <TourOperators/>
      <VacationPlan/>
      <Currort />
      <Quiz />
      <PriceList />
      <Regions />
    </div>
  )
}
