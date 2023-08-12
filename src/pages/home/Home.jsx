import React from 'react'
import { Franchise } from 'modules/Franchise'
import { Quiz } from 'modules/Quiz'
import { ResortCard } from 'entities/resort'
import { pb } from 'shared/api'
import { Button } from '@mantine/core'
import { Regions } from 'modules/Regions'
import { Resort, Resorts } from 'pages'

async function getResorts() {
  return (
    await pb.collection('resorts').getList(1, 20, {
      // filter: `status = 'good'`,
    })
  ).items
}

export const Home = () => {
  const [resorts, setResorts] = React.useState([])
  const [sliced, setSliced] = React.useState(4)

  function handleViewMode() {
    setSliced(999)
  }

  React.useEffect(() => {
    getResorts().then((res) => setResorts(res))
  }, [])

  return (
    <div className="space-y-20">
      {/* <Franchise /> */}
      <Quiz />
      {/* <Resorts /> */}
      {/* <div className="grid grid-cols-4 ">
        {resorts
          .map((resort) => <ResortCard resort={resort} key={resort.id} />)
          .slice(0, sliced)}
      </div> */}
      {/* {sliced === 4 && (
        <Button size="md" onClick={handleViewMode}>
          Еще
        </Button>
      )} */}
    </div>
  )
}
