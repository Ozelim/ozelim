import React from 'react'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'

import { LiaCalendarAlt, LiaConciergeBellSolid } from 'react-icons/lia'
import { CiPlane } from 'react-icons/ci'

const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ASgww6U-3j7J9vAuSrrDJzQ47xMcGAEMRyvXCbzxJqTT3p_FaMhWVUstxMGfMTHmXzo&usqp=CAU'

export const Card = () => {
  return (
    <div className='flex flex-col shadow-md h-full rounded-primary overflow-hidden'>
      <img 
        src={url} 
        alt=""
        className='object-cover h-48 aspect-video' 
      />
      <div className='p-4'>
        <Link 
          to={'/'}
        >
          <span className='text-lg font-head text-primary-600'>
            Utopia World
          </span>
        </Link>
        <p className='mt-1'>
          Павлодар
        </p>
        <ul className='mt-4'>
          <li className='flex items-center gap-2'>
            <LiaCalendarAlt className='text-xl text-slate-400'/>
            <span className='text'>c 21.01 по 21.02</span>
          </li>
          <li className='flex items-center gap-2'>
            <CiPlane className='text-xl text-slate-400'/>
            <span className='text'>Выезд с алматы</span>
          </li>
          <li className='flex items-center gap-2'>
            <LiaConciergeBellSolid className='text-xl text-slate-400'/>
            <span className='text'>Все включено</span>
          </li>
        </ul>
        <div className='mt-4'>
          <span className='text-xl text-primary-600'>212 000 ₸</span>
        </div>
        <div className='mt-4'>
          <Button 
            fullWidth
          >
            Подробнее
          </Button>
        </div>
      </div>
    </div>
  )
}
