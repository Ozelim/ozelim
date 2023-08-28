import React from 'react'
import { pb } from '../api/pocketbase'

async function getUser (userId) {
  return await pb.collection('users').getOne(userId)
}

export const useAuth = () => {

  const [user, setUser] = React.useState(pb.authStore.model)
  const [loading, setLoading] = React.useState(true)

  // const user = pb.authStore.model 
  // const token = pb.authStore.token

  React.useEffect(() => {
    getUser(pb.authStore?.model?.id)
    .then(res => {
      setUser(res)
    })
    .finally(() => {
      setLoading(false)
    })
    
    pb.collection('users').subscribe(user?.id, function({action, record}) {
      setUser(record)
      setLoading(false)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [pb])

  return {
    ...pb.authStore,
    user,
    loading
  }
}
