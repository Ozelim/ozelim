import React from 'react'

import { pb } from '../api/pocketbase'

export const useAuth = () => {

  const [user, setUser] = React.useState(pb.authStore.model)
  const [token, setToken] = React.useState(pb.authStore.token)

  // const user = pb.authStore.model 
  // const token = pb.authStore.token

  React.useEffect(() => {
    setUser(pb.authStore.model ?? {})
    setToken(pb.authStore.token ?? {})
  }, [pb.authStore])
  
  return {
    ...pb.authStore,
    user,
    token,
  }
}
