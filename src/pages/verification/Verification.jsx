import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { pb } from 'shared/api'

async function getUser (id) {
  return await pb.collection('users').getOne(id) 
}

export const Verification = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [foundUser, setFoundUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  
  React.useEffect(() => {
    if (loading) {
      getUser(id)
      .then(res => {
        setFoundUser(res)
      })
      .finally(() => {
        setLoading(false)
      })
    }
  }, [])

  React.useEffect(() => {
    if (!loading) {
      if (foundUser) {
        if (foundUser?.verified) {
          navigate('/')
        } else {
          console.log(foundUser);
        }
      } else {
        navigate('/')
      }
    }
  }, [foundUser])

  if (loading) return (
    <div className='flex h-full w-full items-center justify-center'>Загрузка...</div>
  )

  return (
    <div>
      
    </div>
  )
}
