import React from 'react'

import { pb } from '../api/pocketbase'

export const useAuth = () => {

  const user = pb.authStore.model 
  const token = pb.authStore.token

  return {
    ...pb.authStore,
    user,
    token,
  }
}
