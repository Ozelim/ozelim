import React from 'react'
import { getImageUrl } from 'shared/lib'

export const TeamCard = ({ team }) => {
  return (
    <div className="relative rounded-primary overflow-hidden space-y-2 shadow-md pb-4 max-w-sm w-full mx-auto bg-white">
      <img
        src={getImageUrl(team, team?.image)}
        alt=""
        className="w-full max-h-72 object-cover aspect-square"
      />
      <h2 className="text-center pt-2 font-head text-2xl px-6 ">
        {team?.name}
      </h2>
      <p className="px-4 text-center text">{team?.description}</p>
      <div className='text-center'>
        <a href={team?.link} target="_blank" className="underline text-blue-300">
          Перейти по ссылке
        </a>
      </div>
    </div>
  )
}
 