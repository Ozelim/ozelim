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
import { Button, TextInput } from '@mantine/core'
import { pb } from 'shared/api'
import axios from 'axios'

export const Test = () => {

  const [value, setValue] = React.useState({})

  async function submit (e) {
    e.preventDefault()
    await axios.post(`https://ecom.jysanbank.kz/ecom/api`)
    .then(res => {
      console.log(res, 'res');
    })
    .catch(err => {
      console.log(err, 'err');
    })
  }

  return (
    <div className='flex justify-center items-center h-full'>
      <form 
        className='max-w-sm w-full'
        onSubmit={submit}
      >
        <TextInput
          value={value.card}
        />
        <TextInput
          value={value.term}
        />
        <TextInput
          value={value.cvv}
        />
        <Button
          type='submit'
        >
          Оплатить
        </Button>
      </form>
    </div>
  )
}
