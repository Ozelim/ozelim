import React from 'react'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { getImageUrl } from 'shared/lib'

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
        <div className="flex flex-wrap gap-2 mt-4">
          <p className="text text-">Направление: </p>
          {resort?.diseas && resort?.diseas?.map((q, i) => {
            return (
              <p key={i} className="text-blue-900">
                {q}
              </p>
            ) 
          })}
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
