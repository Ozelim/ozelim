import React from 'react'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { LiaCalendarAlt, LiaConciergeBellSolid } from 'react-icons/lia'
import { CiPlane } from 'react-icons/ci'
import { formatNumber, getImageUrl } from 'shared/lib'

export const Card = ({ resort }) => {
  return (
    <div className="flex flex-col shadow-md h-full rounded-primary overflow-hidden w-[320px] w-full">
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
        <ul className="mt-4">
          <li className="flex items-center gap-2">
            <LiaCalendarAlt className="text-xl text-slate-400" />
            <span className="text">
              Длительность тура: {resort?.duration} д.
            </span>
          </li>
          <li className="flex items-center gap-2">
            <CiPlane className="text-xl text-slate-400" />
            <span className="text">Выезд с: {resort?.from}</span>
          </li>
          <li className="flex items-center gap-2">
            <LiaConciergeBellSolid className="text-xl text-slate-400" />
            <span className="text">Питание: {resort?.diet}</span>
          </li>
        </ul>
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
