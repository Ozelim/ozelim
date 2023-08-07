import dayjs from 'dayjs'
import React from 'react'
import { Avatar } from 'shared/ui';

export const Referal = ({referal}) => {

  return (
    <div className='flex shrink-0'>
      <Avatar
        src={referal?.avatar}
        className='aspect-square w-14 mx-auto'
        radius='xl'
        record={referal}
      />
      {/* <img 
        className=''
        src={'https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_640.jpg'} 
        alt="" 
      /> */}
      <div className='flex flex-col justify-center ml-2'>
        <p className='text-sm font-head'>
          {referal?.name}
        </p>
        <p className='mt-1 text-xs text'>
          {dayjs(referal?.created).format('DD.MM.YYYY, HH:mm')}
        </p>
      </div>
    </div>
  )
}
