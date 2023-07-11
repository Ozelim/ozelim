import React from 'react'
import img from 'shared/assets/photo.jpg'
import { AiFillCalendar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export const Card = ({ card }) => {
  return (
    <div className="bg-[#F7F7F5] shadow rounded-primary max-w-5xl mx-auto">
      <div className="p-4 flex flex-col">
        <div className="flex items-center">
          <Link to={'/'}>
            <img
              src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80"
              className="w-14 h-14 bg-slate-300 rounded-full object-cover"
            />
          </Link>
          <span className="ml-4 text-lg">Username</span>
        </div>

        <div className="flex justify-between">
          <h1 className="font-head font-bold my-4 text-4xl">
            Заголовок новости
          </h1>
          <div className="flex -mt-12">
            <AiFillCalendar fill="teal" />
            <span className="ml-1   text-slate-600 text-sm">10.1.2023</span>
          </div>
        </div>
        <img className="w-full max-h-[400px]  object-cover" src={img} />
        <p className="flex-grow font-body my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem et
          cumque hic vero obcaecati distinctio! Asperiores tenetur cumque
          aliquid, error vitae sed accusantium deserunt ex quos! Animi
          consectetur perferendis dolorem unde debitis nisi quis ut labore,
          incidunt quisquam, accusamus delectus a hic quos veniam tenetur
          nostrum aperiam quibusdam? Amet, incidunt. Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Excepturi molestias delectus saepe nobis
          doloremque repellendus, voluptatem eligendi recusandae obcaecati
          quisquam.
        </p>
      </div>
    </div>
  )
}
