import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { useAuth } from 'shared/hooks'

import { useCategoriesStore } from 'pages/market/categoriesStore'

export const NewLayout = ({headerSlot, footerSlot}) => {

  const {user} = useAuth()

  const {pathname} = useLocation()

  const {getCategories} = useCategoriesStore()

  React.useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen market-scrollbar">
      {headerSlot}
      <Outlet/>
      {footerSlot}
    </div>
  )
}
