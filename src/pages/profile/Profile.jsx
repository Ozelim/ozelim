import React from 'react'
import { UserData } from 'entities/useData'
import dayjs from 'dayjs'
import { ReferalsList } from 'entities/referalsList'

export const Profile = () => {

  return (
    <div className='w-full'>
      <div className="container">
        <div className='w-full bg-white shadow-md rounded-primary p-4'>
          <div className="grid grid-cols-[25%_auto] gap-6">
            <UserData/>

            <div className='relative overflow-hidden'>
              <ReferalsList/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
