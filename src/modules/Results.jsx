import React from 'react'

export const Results = () => {
  return (
    <div className='w-full'>
      <div className="container">
        <div>
          <h1 className='heading'>Lorem ipsum dolor sit.</h1>
          <div className='grid grid-cols-3 gap-4 mt-12'>
            <div>
              <h2 className='text-6xl text-primary-500 border-b-4 border-black pb-4 font-bold'>
                1 000 000
              </h2>
              <p className='mt-6 text'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti commodi harum accusamus dolore repellat vitae impedit pariatur debitis dolorem illo.
              </p>
            </div>
            <div>
              <h2 className='text-6xl text-primary-500 border-b-4 border-black pb-4 font-bold'>
                x9
              </h2>
              <p className='mt-6 text'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia odio officiis aut quas necessitatibus?
              </p>
            </div>
            <div>
              <h2 className='text-6xl text-primary-500 border-b-4 border-black pb-4 font-bold'>
                12 мес.
              </h2>
              <p className='mt-6 text'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, odit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
