import React from 'react'
import { useLangContext } from 'app/langContext'
import { pb } from 'shared/api'
import { usePageData } from 'shared/hooks'
import { TeamCard } from 'shared/ui/TeamCard'
import { OurTeamHeader } from './our-team-header'
  
async function getOurTeam() {
  return await pb.collection('members').getFullList({filter: `kz = false`})
}

async function getOurTeamKz() {
  return await pb.collection('members').getFullList({filter: `kz = true`})
}

export const OurTeam = () => {

  const [ourTeam, setOurTeam] = React.useState([])

  const {images, text, headings} = usePageData('team')

  const {kz} = useLangContext()

  React.useEffect(() => {
    if (kz) {
      getOurTeamKz().then((res) => {
        setOurTeam(res)
      })
    } else {
      getOurTeam().then((res) => {
        setOurTeam(res)
      })
    }
  }, [kz])

  return (
    <div className="w-full">
      <div className="container">
        <OurTeamHeader
          headings={headings}
          text={text}
        />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mt-8 md:mt-20">
          {ourTeam?.map((team) => (
            <TeamCard team={team} key={team.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
