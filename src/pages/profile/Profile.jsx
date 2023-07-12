import { UserData } from 'entities/useData'
import React from 'react'

export const Profile = () => {
  return (
    <div className='w-full'>
      <div className="container">
        <div className='w-full'>
          <div className="grid grid-cols-[25%_auto]">
            <UserData/>
            <div>
              data
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
