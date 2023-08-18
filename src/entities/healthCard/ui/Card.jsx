import React from 'react'
import { getImageUrl } from 'shared/lib'

export const Card = ({ card, health, images, text }) => {
  return (
    <div className="grid grid-cols-2 rounded-primary overflow-hidden shadow-md bg-white max-w-4xl w-full mx-auto">
      {card?.flow === 'left' ? (
        <>
          {getImageUrl(health?.images, images?.[card.index]) ? (
            <img
              className="aspect-video h-60"
              src={getImageUrl(health?.images, images?.[card.index])}
              loading="lazy"
              alt="travel"
            />
          ) : (
            <div className="w-[350px] m-auto bg-zinc-200" />
          )}
          <div className="p-4">
            <p className="text">{card.text}</p>
          </div>
        </>
      ) : (
        <>
          <div className="p-4">
            <p className="text">{card.text}</p>
          </div>
          {getImageUrl(health?.images, images?.[card.index]) ? (
            <img
              className="aspect-video h-60"
              src={getImageUrl(health?.images, images?.[card.index])}
              loading="lazy"
              alt="travel"
            />
          ) : (
            <div className="w-[350px] m-auto bg-zinc-200" />
          )}
        </>
      )}
    </div>
  )
}
