import React from 'react'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { LiaCalendarAlt, LiaConciergeBellSolid } from 'react-icons/lia'
import { CiPlane } from 'react-icons/ci'
import { formatNumber, getImageUrl } from 'shared/lib'

// max-w-[300px]

export const Card = ({ resort }) => {
  return (
    <div className="flex flex-col bg-white shadow-md h-full rounded-primary overflow-hidden w-full">
      <img
        src={getImageUrl(resort, resort?.[1])}
        alt=""
        className="object-cover h-48 aspect-video"
      />
      <div className="p-4">
        <Link to={`/resort/${resort?.id}`}>
          <span className="text-lg font-head text-primary-600">
            {resort?.title}
          </span>
        </Link>
        <p className="mt-1">{resort?.region}</p>
        <ul className='flex flex-wrap gap-2 mt-4'>
          {resort?.diseas && resort?.diseas?.map((q, i) => {
            return (
              <p key={i} className='text'>{q}</p>
            )
          })}
        </ul>
        {/* <ul className="mt-4">
          <li className="flex items-center gap-2">
            <LiaCalendarAlt className="text-xl text-slate-400" />
            <span className="text">
              {resort?.duration}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <LiaConciergeBellSolid className="text-xl text-slate-400" />
            <span className="text">{resort?.diet}</span>
          </li>
          <li className="flex items-center gap-2">
            <CiPlane className="text-xl text-slate-400" />
            <span className="text">{resort?.from}</span>
          </li>
        </ul> */}
        <div className="mt-4">
          <span className="text-xl text-primary-600">
            {formatNumber(resort?.cost)} ₸
          </span>
        </div>
        <div className="mt-4 ">
          <Link to={`/resort/${resort?.id}`}>
            <Button fullWidth>Подробнее</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
