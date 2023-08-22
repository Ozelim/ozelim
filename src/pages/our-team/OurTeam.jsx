import React from 'react'
import { pb } from 'shared/api'
import { TeamCard } from 'shared/ui/TeamCard'


async function getOurTeam() {
  return await pb.collection('members').getFullList()
}


export const OurTeam = () => {
  const [ourTeam, setOurTeam] = React.useState([])


  React.useEffect(() => {
    getOurTeam().then((res) => {
      setOurTeam(res)
    })
  }, [])

  return (
    <div className="w-full">
      <div className="container">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {ourTeam?.map((team) => (
            <TeamCard team={team} key={team.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
