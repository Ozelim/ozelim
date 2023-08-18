import React from 'react'
import { pb } from 'shared/api'
import { TeamCard } from 'shared/ui/TeamCard'

export const OurTeam = () => {
  const [ourTeam, setOurTeam] = React.useState([])

  async function getOurTeam() {
    return await pb.collection('ourTeam').getList(1, 50)
  }

  React.useEffect(() => {
    getOurTeam().then((res) => {
      setOurTeam(res)
    })
  }, [])

  return (
    <div className="w-full">
      <div className="container">
        <div className="grid grid-cols-3 gap-6">
          {ourTeam?.items?.map((team) => (
            <TeamCard team={team} key={team.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
