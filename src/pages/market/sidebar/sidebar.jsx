import React from 'react'
import { Accordion, Button } from '@mantine/core'
import { useSearchParams } from 'react-router-dom'
import { pb } from 'shared/api'

async function getCategories () {
  return (await pb.collection('categories').getFullList())?.[0]
}


export const Sidebar = () => {

  const [params, setParams] = useSearchParams()

  const [categories, setCategories] = React.useState({})

  async function handleCategories () {
    await getCategories()
    .then(res => {
      setCategories(res)
    })
  }

  React.useEffect(() => {
    handleCategories()
  }, [])

  return (
    <div>
      <div className='flex flex-col border shadow-md'>
      {categories?.categories?.map((q, i) => {
        return (
          <div className='p-3 border-t-2' key={i}>
            <button>
              {q?.label}
            </button>
            <ul className='ml-2 space-y-2 mt-2'>
              {q?.subs?.map((q, i) => {
                return (
                  <li key={i}>
                    <button className='text-sm'>
                      {q?.label}
                    </button>
                  </li>
                ) 
              })}
            </ul>
          </div>
        )
      })}
      </div>
    </div>
  )
}
