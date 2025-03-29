import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { useAuth } from 'shared/hooks'

import { useCategoriesStore } from 'pages/market/categoriesStore'
import { useNotificationStore } from 'pages/market/profile/user/notificationStore'

export const NewLayout = ({headerSlot, footerSlot}) => {

  const {user} = useAuth()

  const {pathname} = useLocation()

  const {getCategories} = useCategoriesStore()
  const {nots, getNotifications, subsribeToNotifications} = useNotificationStore()


  React.useEffect(() => {
    getCategories()

    if (user?.collectionName === 'agents') {
      getNotifications(user?.id)
      subsribeToNotifications(user?.id)
    }
  }, [])

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen market-scrollbar">
      {headerSlot}
      <Outlet/>
      {footerSlot}
    </div>
  )
}
