import { Button, Select, TextInput } from '@mantine/core'
import React from 'react'
import { pb } from 'shared/api'
import { useAuth } from 'shared/hooks'
import { cities } from 'shared/lib'

async function getServices () {
  return await pb.collection('services').getFullList()
}

export const Services = () => {

  const {user, loading} = useAuth()

  const [services, setServices] = React.useState([])

  React.useEffect(() => {
    if (!loading) {
      if (!user.verified) {
        navigate('/')
      } 
    }
  }, [loading])

  React.useEffect(() => {
    getServices()
    .then(res => {
      setServices(res)
    })
  }, [])

  return (
    <div className='w-full'>
      <div className="container">
        <div className='grid grid-cols-[60%_auto] gap-4'>
          <div className='space-y-4'>
            {services.map((service, i) => {
              return (
                <div 
                  key={i}
                  className='flex justify-between gap-4'
                >
                  <div>
                    <p className='font-bold text-lg'>{service.title}</p>
                    <p>{service.description}</p>
                  </div>
                  <div>
                    <p className='font-bold text-lg'>{service.cost} тг</p>
                    <Button compact>
                      Приобрести
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
          <form>
            <TextInput
              label='ФИО'
            />
            <TextInput
              label='ИИН'
            />
            <TextInput
              label='Телефон'
            />
            <Select
              label='Город'
              data={cities}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
