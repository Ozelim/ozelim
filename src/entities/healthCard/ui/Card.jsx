import React from 'react'

const url =
  'https://cdn.pixabay.com/photo/2018/08/21/23/29/forest-3622519_640.jpg'

export const Card = ({ card }) => {
  return (
    <div className="grid grid-cols-2 rounded-primary overflow-hidden shadow-md bg-white max-w-4xl w-full mx-auto">
      {card?.flow === 'left' ? (
        <>
          <img src={card.image} className="aspect-video h-60" />
          <div className="p-4">
            <p className="text">{card.text}</p>
          </div>
        </>
      ) : (
        <>
          <div className="p-4">
            <p className="text">{card.text}</p>
          </div>
          <img src={url} className="aspect-video w-full h-full " />
        </>
      )}
    </div>
  )
}
