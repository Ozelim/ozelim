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
      // filter: status = 'good',
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
      <Franchise />
      <Quiz />
      <div className="w-full">
        <div className="container">
          <div className="w-full">
            <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
              {resorts
                .map((resort) => {
                  return (
                    <div className="mx-auto">
                      <ResortCard resort={resort} key={resort.id} />
                    </div>
                  )
                })
                .slice(0, sliced)}
            </div>
          </div>
          {sliced === 4 && (
            <div className="flex justify-center mt-4">
              <Button onClick={handleViewMode} compact variant="subtle">
                Еще
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
