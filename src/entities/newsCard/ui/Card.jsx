import React from 'react'
import { AiFillCalendar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Avatar } from 'shared/ui'
import { getImageUrl } from 'shared/lib'
import dayjs from 'dayjs'

export const Card = ({news}) => {
  return (
    <div className="bg-white shadow rounded-primary max-w-5xl w-full mx-auto">
      <div className="p-10 flex flex-col">
        <div className="flex items-center">
          <Link to={'/'}>
            {getImageUrl(news, news?.avatar) ? (
              <img
                className="w-14 h-14 bg-slate-300 rounded-full object-cover"
                src={getImageUrl(news, news?.avatar)}
                loading="lazy"
                alt="travel"
              />
            ) : (
              <div className="w-14 h-14 bg-slate-300 rounded-full object-cover" />
            )}
          </Link>
          <span className="ml-4 text-lg">{news?.name}</span>
        </div>

        <div className="flex justify-between">
          <h1 className="font-head font-bold my-4 text-4xl">
            {news?.title}
          </h1>
          <div className="flex -mt-12">
            <AiFillCalendar fill="teal" size={20} />
            <span className="ml-1 text-slate-600 ">{dayjs(news?.date).format('DD/MM/YY, HH:mm')}</span>
          </div>
        </div>
        {getImageUrl(news, news?.image) ? (
          <img
            className="w-full max-h-[400px] object-cover"
            src={getImageUrl(news, news?.image)}
            loading="lazy"
            alt="travel"
          />
        ) : (
          <div className="w-full max-h-[400px] bg-slate-300" />
        )}
        <p className="flex-grow font-body my-4 text">{news?.description}</p>

        <p className="text-zinc-400 text-sm uppercase">ozelim.kz</p>
      </div>
    </div>
  )
}
