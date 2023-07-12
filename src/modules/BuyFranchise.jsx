import React from 'react'
import { FcInfo } from 'react-icons/fc'

export const BuyFranchise = () => {
  return (
    <div className='w-full'>
      <div className="container">
        <div className="w-full">
          <h1 className="heading">
            Что вы получаете <br /> при покупке франшизы
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 md:mt-8">
            {Array(9).fill(1).map((_, i) => {
              return (
                <div key={i} className="md:max-w-sm bg-white shadow-md rounded-primary p-2 shadow-md-2 flex items-center pb-4">
                  <FcInfo className="mr-3 text-5xl flex-shrink-0" />
                  <p className='text'>
                    Возможность работать под известной торговой маркой «Поехали с нами»
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
