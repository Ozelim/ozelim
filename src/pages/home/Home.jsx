import { BuyFranchise } from 'modules/BuyFranchise'
import { Franchise } from 'modules/Franchise'
import { TourOperators } from 'modules/TourOperators'
import { TouristAgency } from 'modules/TouristAgency'
import { VacationPlan } from 'modules/VacationPlan'
import React from 'react'

export const Home = () => {
  return (
    <div className="container">
      {/* <VacationPlan /> */}
      {/* <Franchise /> */}
      {/* <TourOperators /> */}
      {/* <TouristAgency /> */}
      <BuyFranchise />
    </div>
  )
}
