import React from 'react'

export const HealthCard = ({ card, images, }) => {
  return (
    <div className="grid lg:grid-cols-2 rounded-primary overflow-hidden shadow-md bg-white w-full max-w-4xl mx-auto">
      {card?.flow === 'left' ? (
        <>
        <img
          src={card?.index}
          className="aspect-video h-full object-cover max-w-full"
        />
          <div className="p-4">
            <p className="text">{card.text}</p>
          </div>
        </>
      ) : (
        <>
          <div className="p-4">
            <p className="text">{card.text}</p>
          </div>
          <img
          src={card?.index}
          className="aspect-video h-full object-cover max-w-full"
          />
        </>
      )}
    </div>
  )
}
