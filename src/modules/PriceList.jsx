import React from 'react'
import { pb } from 'shared/api'
import { formatNumber } from 'shared/lib'

async function getPrice (type) {
  return await pb.collection(type ? 'price_duplicate' : 'price').getFullList()
}

export const PriceList = ({type}) => {

  const [price, setPrice] = React.useState([])

  React.useEffect(() => {
    getPrice(type)
    .then(res => {
      setPrice(res)
    })
  }, [])

  return (
    <div className="w-full">
      <div className="container">
        <div className='mt-10'>
          <h2 className="text-2xl text-blue-500 font-bold ">
            Прайс-лист
          </h2>
          <div className='grid grid-cols-1 gap-4'>         
            {price?.map((p, i) => {
              return (
                <div key={i} className="flex flex-col md:flex-row justify-between shadow-md rounded-primary p-4 bg-white">
                  <p className="font-medium">
                    {p?.title}
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="text-blue-500 text-xl font-bold">{formatNumber(p?.cost)}</div>
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
