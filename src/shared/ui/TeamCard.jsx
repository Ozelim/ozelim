import React from 'react'
import { getImageUrl } from 'shared/lib'

export const TeamCard = ({ team }) => {
  return (
    <div className="flex flex-col relative rounded-primary overflow-hidden space-y-2 pb-4 max-w-sm w-full mx-auto bg-white shadow-md">
      <img
        src={getImageUrl(team, team?.image)}
        alt=""
        className="w-64 h-64 object-cover rounded-full mx-auto mt-4"
      />
      <h2 className="text-center pt-2 font-head text-2xl px-6 ">{team?.name}</h2>
      <p className="px-4 text-center text line-clamp-5 grow">{team?.description}</p>
      <div className="text-center">
        <a href={team?.link} target="_blank" className="underline text-blue-300">
          Перейти по ссылке
        </a>
      </div>
    </div>
  )
}

export default function TeamCard2({ team }) {
  return (
    <div className="relative flex w-full flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <img
              src={getImageUrl(team, team?.image)}
              alt=""
              className="h-32 w-32 rounded-full object-cover shadow-lg ring-4 ring-white/20"
            />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 text-center">{team?.name}</h1>
          <p className="mt-2 text-center text-gray-500 line-clamp-5 grow">
            {team?.description}
          </p>
          <a
            className="shrink group mt-6 flex items-center justify-center gap-2 rounded-full bg-primary/10 px-6 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
            href="#"
          >
            <span>Перейти по ссылке</span>
          </a>
        </div>
      </div>
    </div>
  )
}
