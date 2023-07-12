import React from 'react'
import { pb } from 'shared/api';
import { useAuth } from 'shared/hooks'

export const Avatar = () => {

  const { user, onChange } = useAuth()

  console.log(pb.authStore);


  return (
    <div>
      
    </div>
  )
}
