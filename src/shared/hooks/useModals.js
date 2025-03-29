import React from 'react'
import { openContextModal } from '@mantine/modals'

export const useModals = () => {
  const openModal = {
    image: (props) => openContextModal({
      modal: 'image',
      padding: 0,
      // size: '50%',
      withCloseButton: false,
      centered: true,
      ...props
    }),
    customerSignup: (props) => openContextModal({
      modal: 'customerSignup',
      padding: 0,
      withCloseButton: false,
      centered: true,
      ...props
      })
  }

  return {
    openModal  
  }
}
