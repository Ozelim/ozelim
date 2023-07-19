import React from 'react'

export const PriceList = () => {
  return (
    <div className="w-full">
      <div className="container">
        <div>
          <h2 className="text-2xl text-blue-500 font-bold ">
            Lorem ipsum dolor sit amet consectetur.
          </h2>
          <div className='grid grid-cols-1 gap-4'>         
            {Array(6).fill(1).map((_, i) => {
              return (
                <div key={i} className="flex flex-col md:flex-row justify-between shadow-md rounded-primary p-4 bg-white">
                  <p className="font-medium">
                    Lorem ipsum dolor sit amet, consectetur adipisicing.
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="text-blue-500 text-xl font-bold">6590 тенге</div>
                    {/* <button className="ml-auto text-blue-500 border-blue-500 border-2 border-solid py-2 px-6 rounded-full">
                      В корзину
                    </button> */}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
