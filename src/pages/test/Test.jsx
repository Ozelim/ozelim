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

  React.useEffect(() => {
    const usersData = [
      { id: 1, sponsor: 4 },
      { id: 2, sponsor: 3 },
      { id: 3, sponsor: 4 },
      { id: 4, sponsor: 5 },
      { id: 5, sponsor: null, verified: true },
      { id: 6, sponsor: 3 },
      { id: 7, sponsor: 1 },
    ];

    const generateBinaryTreeWithSponsors = (usersData) => {
      const users = [];

      const findVerifiedSponsor = (users, sponsor) => {
        for (const user of users) {
          if (user.id === sponsor && user.verified) {
            return user;
          }
          if (user.childrens.length < 2) {
            const verifiedSponsor = findVerifiedSponsor(users, user.sponsor);
            if (verifiedSponsor) {
              return verifiedSponsor;
            }
          }
        }
        return null;
      };

      const insertIntoChildrens = (user, sponsor) => {
        const verifiedSponsor = findVerifiedSponsor(users, sponsor);
        if (verifiedSponsor && verifiedSponsor.childrens.length < 2) {
          verifiedSponsor.childrens.push(user.id);
        }
      };

      for (const userData of usersData) {
        const { id, sponsor } = userData;
        const user = { id, sponsor, childrens: [], verified: false };

        if (sponsor) {
          insertIntoChildrens(user, sponsor);
        }

        users.push(user);
      }

      return users;
    };

    const users = generateBinaryTreeWithSponsors(usersData);

    console.log(users);
  }, []);

  return (
    <div>
      {/* <Results />
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
      <TourOperators/> */}
    </div>
  )
}
