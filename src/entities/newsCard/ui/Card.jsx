import { Button } from '@mantine/core'
import React from 'react'
import img from 'shared/assets/photo.jpg'
import { AiFillCalendar } from "react-icons/ai";

export const Card = ({card}) => {
  // if(card.type === 'row') {
    // return (
    //   <div className='flex bg-slate-200 rounded-primary max-w-lg mx-auto'>
    //     <img className='max-w-md rounded-l-primary' src={img} alt="" />
    //       <div className='p-4 flex flex-col'>
    //         <div className='flex  justify-between'>
    //           <h1 className='font-head font-bold text-4xl'>Header Title</h1>
    //           <div className='flex'>
    //             <AiFillCalendar fill='teal' />
    //             <span className='ml-1 -mt-0.5  text-slate-600 text-sm'>10.1.2023</span>
    //           </div>
    //         </div>
    //         <p className='flex-grow font-body my-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
    //           Quos quasi qui veritatis fugit eveniet, laboriosam iure nam ex perspiciatis delectus modi error quis culpa, autem unde maiores corporis aspernatur suscipit.</p>
    //       </div>
    //   </div>
    // )
  

  return (
    <div className=' bg-slate-100 shadow rounded-primary max-w-lg mx-auto'>
    <img className='w-full  object-cover rounded-t-primary' src={img} />
      <div className='p-4 flex flex-col'>
        <div className='flex  justify-between'>
          <h1 className='font-head font-bold text-4xl'>Header Title</h1>
          <div className='flex'>
            <AiFillCalendar fill='teal' />
            <span className='ml-1 -mt-0.5  text-slate-600 text-sm'>10.1.2023</span>
          </div>
        </div>
        <p className='flex-grow font-body my-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
          Quos quasi qui veritatis fugit eveniet, laboriosam iure nam ex perspiciatis delectus modi error quis culpa, autem unde maiores corporis aspernatur suscipit.</p>
      </div>
  </div>
  )
 
}
