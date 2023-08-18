import React from 'react'
import img from 'shared/assets/images/photo.jpg'
import { AiFillCalendar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Avatar } from 'shared/ui'
import { getImageUrl } from 'shared/lib'

export const Card = ({ headings, text, news, images }) => {
  return (
    <div className="bg-white shadow rounded-primary max-w-5xl w-full mx-auto">
      <div className="p-10 flex flex-col">
        <div className="flex items-center">
          <Link to={'/'}>
            {getImageUrl(news?.images, images?.[1]) ? (
              <img
                className="w-14 h-14 bg-slate-300 rounded-full object-cover"
                src={getImageUrl(news?.images, images?.[1])}
                loading="lazy"
                alt="travel"
              />
            ) : (
              <div className="w-14 h-14 bg-slate-300 rounded-full object-cover" />
            )}
          </Link>
          <span className="ml-4 text-lg">{headings?.name}</span>
        </div>

        <div className="flex justify-between">
          <h1 className="font-head font-bold my-4 text-4xl">
            {headings?.heading}
          </h1>
          <div className="flex -mt-12">
            <AiFillCalendar fill="teal" size={20} />
            <span className="ml-1 text-slate-600 ">{text?.date}</span>
          </div>
        </div>
        {getImageUrl(news?.images, images?.[2]) ? (
          <img
            className="w-full max-h-[400px]"
            src={getImageUrl(news?.images, images?.[2])}
            loading="lazy"
            alt="travel"
          />
        ) : (
          <div className="w-full max-h-[400px] bg-slate-300" />
        )}
        <p className="flex-grow font-body my-4 text">{text?.news}</p>

        <p className="text-zinc-400 text-sm uppercase">ozelim.kz</p>
      </div>
    </div>
  )
}
