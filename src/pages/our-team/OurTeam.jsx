import { HealthHeader } from 'pages/health/ui/HealthHeader'
import React from 'react'
import { pb } from 'shared/api'
import { TeamCard } from 'shared/ui/TeamCard'

async function getTeam() {
  const text = await pb
    .collection('text')
    .getFullList({ filter: `page = 'team'` })
  const images = await pb
    .collection('images')
    .getFullList({ filter: `page = 'team'` })
  const slider = await pb
    .collection('slider')
    .getFullList({ filter: `page = 'team'` })
  return {
    text: text[0],
    images: images[0],
    slider: slider[0],
  }
}

async function getOurTeam() {
  return await pb.collection('members').getFullList()
}


export const OurTeam = () => {

  const [ourTeam, setOurTeam] = React.useState([])
  const [team, setTeam] = React.useState({})

  React.useEffect(() => {
    getTeam()
    .then(res => {
      setTeam(res)
    })
    getOurTeam().then((res) => {
      setOurTeam(res)
    })
  }, [])

  const headings = team?.text?.headings
  const text = team?.text?.text
  const slider = team?.slider?.image
  const images = team?.images ?? {}

  return (
    <div className="w-full">
      <div className="container">
        <HealthHeader
          health={team}
          images={images}
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
