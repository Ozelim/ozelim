import React from 'react'
import { getImageUrl } from 'shared/lib'
import { Image } from 'shared/ui'

export const Card = ({ card, images, }) => {
  return (
    <div className="grid md:grid-cols-2 rounded-primary overflow-hidden shadow-md bg-white max-w-4xl w-full mx-auto">
      {card?.flow === 'left' ? (
        <>
        <Image
          record={images}
          index={card?.index}
          className="aspect-video h-full object-cover w-full"
        />
          {/* {getImageUrl(images, images?.[card.index]) ? (
            <img
              className="aspect-video h-60"
              src={getImageUrl(images, images?.[card.index])}
              loading="lazy"
              alt="travel"
            />
          ) : (
            <div className="w-[350px] m-auto bg-zinc-200" />
          )} */}
          <div className="p-4">
            <p className="text">{card.text}</p>
          </div>
        </>
      ) : (
        <>
          <div className="p-4">
            <p className="text">{card.text}</p>
          </div>
          <Image
            record={images}
            index={card?.index}
            className="aspect-video h-full object-cover w-full"
          />
          {/* {getImageUrl(images, images?.[card.index]) ? (
            <img
              className="aspect-video h-60"
              src={getImageUrl(images, images?.[card.index])}
              loading="lazy"
              alt="travel"
            />
          ) : (
            <div className="w-[350px] m-auto bg-zinc-200" />
          )} */}
        </>
      )}
    </div>
  )
}
