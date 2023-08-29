import React from 'react'
import { pb } from '../api/pocketbase'

async function getUser (userId) {
  return await pb.collection('users').getOne(userId)
}

export const useAuth = () => {

  const [user, setUser] = React.useState(pb.authStore.model ?? null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (pb.authStore?.model?.id) {      
      getUser(pb.authStore?.model?.id)
      .then(res => {
        setUser(res)
      })
      .finally(() => {
        setLoading(false)
      })
    } else {
      setUser(null)
      setLoading(false)
    }
    pb.collection('users').subscribe(pb.authStore?.model?.id, function({action, record}) {
      setUser(record ?? user)
      setLoading(false)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  return {
    // ...pb.authStore,
    user,
    loading
  }
}
