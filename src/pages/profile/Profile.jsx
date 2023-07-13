import { UserData } from 'entities/useData'
import React from 'react'

export const Profile = () => {
  return (
    <div className='w-full'>
      <div className="container">
        <div className='w-full bg-white shadow-md rounded-primary p-4'>
          <div className="grid grid-cols-[25%_auto]">
            <UserData/>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
