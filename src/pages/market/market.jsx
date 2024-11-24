import React from 'react'
import { Button, MantineProvider } from '@mantine/core'
import { pb } from 'shared/api'

export const Market = () => {

  async function getAllUsers () {
    return await pb.collection('users').getFullList()
    .then(async res => {
      res.forEach(async q => {
        
        await pb.collection('users').update(q?.id, {
          avatar: null
        })
      })
    })
  }


  return (
      <Button
        onClick={getAllUsers}
      >
        Button
      </Button>
  )
}
